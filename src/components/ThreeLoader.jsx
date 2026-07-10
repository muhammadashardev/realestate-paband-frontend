import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

/* ─────────────────────────────────────────────────────────────────────────────
   PABAND — CINEMATIC WIREFRAME BUILDING LOADER v4.0

   FLOW:
   1. 3D wireframe building constructs floor-by-floor from ground up
   2. Particle dust swirls around during construction
   3. Building fully formed → camera holds 1.5s
   4. Camera zooms in
   5. Camera sweeps left-to-right
   6. Hyper-warp exit
───────────────────────────────────────────────────────────────────────────── */

const lerp = (a, b, t) => a + (b - a) * t;

const STATUS_MSGS = [
  { at: 0,  text: 'INITIATING CONSTRUCTION…'       },
  { at: 10, text: 'LAYING FOUNDATION…'              },
  { at: 25, text: 'RAISING STRUCTURE…'              },
  { at: 45, text: 'ASSEMBLING FLOORS…'              },
  { at: 60, text: 'STRUCTURE COMPLETE ✓'            },
  { at: 70, text: 'INSPECTING BUILDING…'            },
  { at: 82, text: 'SCANNING PERIMETER…'             },
  { at: 95, text: 'ENTERING PABAND HQ…'             },
  { at: 99, text: 'WELCOME ✦'                       },
];

const ThreeLoader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const canvasRef    = useRef(null);

  const [progress,   setProgress]   = useState(0);
  const [statusText, setStatusText] = useState(STATUS_MSGS[0].text);
  const [isDone,     setIsDone]     = useState(false);
  const [exitAnim,   setExitAnim]   = useState(false);

  const progressRef       = useRef(0);
  const targetProgressRef = useRef(0);
  const isExitingRef      = useRef(false);
  const phaseRef          = useRef('build'); // 'build' | 'hold' | 'zoom' | 'sweep' | 'exit'

  /* ── glitch ── */
  const [glitch, setGlitch] = useState(false);
  useEffect(() => {
    const id = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 90);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  /* ── progress ── */
  useEffect(() => {
    const TOTAL = 7000;
    const TICK  = 20;
    const STEPS = TOTAL / TICK;
    let step = 0;

    const id = setInterval(() => {
      step++;
      const t = step / STEPS;
      const p = Math.min(t < 0.5 ? 2*t*t : -1+(4-2*t)*t, 1) * 100;
      targetProgressRef.current = p;
      setProgress(Math.round(p));

      const r = Math.round(p);
      if (r < 58)       phaseRef.current = 'build';
      else if (r < 68)  phaseRef.current = 'hold';
      else if (r < 80)  phaseRef.current = 'zoom';
      else if (r < 100) phaseRef.current = 'sweep';

      const found = [...STATUS_MSGS].reverse().find(s => r >= s.at);
      if (found) setStatusText(found.text);

      if (p >= 100) {
        clearInterval(id);
        phaseRef.current = 'exit';
        setTimeout(() => {
          isExitingRef.current = true;
          setExitAnim(true);
          setTimeout(() => { setIsDone(true); onComplete?.(); }, 1200);
        }, 500);
      }
    }, TICK);
    return () => clearInterval(id);
  }, [onComplete]);

  /* ── THREE.JS ── */
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const W = containerRef.current.clientWidth;
    const H = containerRef.current.clientHeight;

    /* ── scene ── */
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000610, 0.008);

    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 2000);
    camera.position.set(35, 30, 50);
    camera.lookAt(0, 15, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current, antialias: true, alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    /* ══════════════════════════════════════════════════════════════════
       BUILDING — Real 3D wireframe geometry, floor by floor
    ══════════════════════════════════════════════════════════════════ */

    const TOTAL_FLOORS = 30;
    const FLOOR_H      = 1.2;
    const BASE_W       = 8;
    const BASE_D       = 8;

    const buildingGroup = new THREE.Group();
    scene.add(buildingGroup);

    const floorMeshes  = [];
    const floorTargetY = [];

    const goldMat = new THREE.LineBasicMaterial({ color: 0xffc64d, transparent: true, opacity: 0 });
    const cyanMat = new THREE.LineBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0 });

    for (let f = 0; f < TOTAL_FLOORS; f++) {
      const taper = 1 - (f / TOTAL_FLOORS) * 0.35; // building tapers upward
      const w = BASE_W * taper;
      const d = BASE_D * taper;
      const h = FLOOR_H;

      const boxGeo  = new THREE.BoxGeometry(w, h, d);
      const edges   = new THREE.EdgesGeometry(boxGeo);
      const mat     = (f % 2 === 0 ? goldMat : cyanMat).clone();
      const line    = new THREE.LineSegments(edges, mat);

      const targetY = f * FLOOR_H;
      line.position.y = targetY + 60; // start above, will animate down
      floorTargetY.push(targetY);

      // Window glow planes on two faces
      if (f % 3 === 0 && f > 2) {
        const windowGeo = new THREE.PlaneGeometry(w * 0.85, h * 0.6);
        const windowMat = new THREE.MeshBasicMaterial({
          color: 0x00e5ff, transparent: true, opacity: 0, side: THREE.DoubleSide,
        });
        const win1 = new THREE.Mesh(windowGeo, windowMat);
        win1.position.z = d / 2 + 0.01;
        line.add(win1);

        const win2 = new THREE.Mesh(windowGeo, windowMat);
        win2.position.z = -(d / 2 + 0.01);
        line.add(win2);

        const windowGeo2 = new THREE.PlaneGeometry(d * 0.85, h * 0.6);
        const win3 = new THREE.Mesh(windowGeo2, windowMat.clone());
        win3.rotation.y = Math.PI / 2;
        win3.position.x = w / 2 + 0.01;
        line.add(win3);

        const win4 = new THREE.Mesh(windowGeo2, windowMat.clone());
        win4.rotation.y = Math.PI / 2;
        win4.position.x = -(w / 2 + 0.01);
        line.add(win4);
      }

      buildingGroup.add(line);
      floorMeshes.push(line);

      boxGeo.dispose();
    }

    /* ── antenna on top ── */
    const antennaGeo = new THREE.CylinderGeometry(0.08, 0.15, 8, 6);
    const antennaEdges = new THREE.EdgesGeometry(antennaGeo);
    const antennaMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0 });
    const antenna = new THREE.LineSegments(antennaEdges, antennaMat);
    antenna.position.y = TOTAL_FLOORS * FLOOR_H + 4 + 50; // start above
    buildingGroup.add(antenna);
    antennaGeo.dispose();

    /* ── top beacon light ── */
    const beaconGeo = new THREE.SphereGeometry(0.4, 8, 8);
    const beaconMat = new THREE.MeshBasicMaterial({ color: 0xff3333, transparent: true, opacity: 0 });
    const beacon = new THREE.Mesh(beaconGeo, beaconMat);
    beacon.position.y = TOTAL_FLOORS * FLOOR_H + 8 + 50;
    buildingGroup.add(beacon);

    /* ── ground platform ── */
    const platformGeo = new THREE.BoxGeometry(16, 0.3, 16);
    const platformEdges = new THREE.EdgesGeometry(platformGeo);
    const platformMat = new THREE.LineBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0 });
    const platform = new THREE.LineSegments(platformEdges, platformMat);
    platform.position.y = -0.15;
    buildingGroup.add(platform);
    platformGeo.dispose();

    /* ── surrounding smaller buildings ── */
    const surroundBuildings = [];
    const sPositions = [
      { x: -16, z: 0, h: 12, w: 4, d: 4 },
      { x: 16, z: 3, h: 9, w: 3.5, d: 3.5 },
      { x: -12, z: -15, h: 15, w: 5, d: 4 },
      { x: 14, z: -12, h: 8, w: 3, d: 3 },
      { x: -8, z: 16, h: 10, w: 3.5, d: 3 },
      { x: 10, z: 15, h: 7, w: 3, d: 3.5 },
      { x: 0, z: -18, h: 11, w: 4, d: 3 },
      { x: -20, z: 10, h: 6, w: 3, d: 3 },
    ];
    sPositions.forEach(sp => {
      const sg = new THREE.BoxGeometry(sp.w, sp.h, sp.d);
      const se = new THREE.EdgesGeometry(sg);
      const sm = new THREE.LineBasicMaterial({ color: 0x1a6688, transparent: true, opacity: 0 });
      const sl = new THREE.LineSegments(se, sm);
      sl.position.set(sp.x, sp.h / 2 - 0.15, sp.z);
      scene.add(sl);
      surroundBuildings.push({ mesh: sl, targetOpacity: 0.4 });
      sg.dispose();
    });

    /* ── dust particles ── */
    const dustCount = 5000;
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);
    const dustCol = new Float32Array(dustCount * 3);
    const dustSz  = new Float32Array(dustCount);

    const cGold = new THREE.Color(0xffc64d);
    const cCyan = new THREE.Color(0x00e5ff);

    for (let i = 0; i < dustCount; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 5 + Math.random() * 50;
      dustPos[i*3]   = Math.cos(a) * r;
      dustPos[i*3+1] = Math.random() * 60;
      dustPos[i*3+2] = Math.sin(a) * r;
      const c = Math.random() > 0.5 ? cGold : cCyan;
      dustCol[i*3]   = c.r;
      dustCol[i*3+1] = c.g;
      dustCol[i*3+2] = c.b;
      dustSz[i] = 0.5 + Math.random() * 1.5;
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
    dustGeo.setAttribute('color',    new THREE.BufferAttribute(dustCol, 3));
    dustGeo.setAttribute('size',     new THREE.BufferAttribute(dustSz, 1));

    const dustMakeTex = () => {
      const c = document.createElement('canvas'); c.width = 64; c.height = 64;
      const ctx = c.getContext('2d');
      const g = ctx.createRadialGradient(32,32,0,32,32,32);
      g.addColorStop(0,'rgba(255,255,255,1)');
      g.addColorStop(0.3,'rgba(255,255,255,0.4)');
      g.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle = g; ctx.fillRect(0,0,64,64);
      return new THREE.CanvasTexture(c);
    };

    const dustMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 }, uTex: { value: dustMakeTex() } },
      vertexShader: `
        attribute vec3 color;
        attribute float size;
        uniform float uTime;
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          vColor = color;
          vec3 p = position;
          float a = uTime * 0.15 + p.x * 0.1;
          float r = length(p.xz);
          p.x = cos(a) * r;
          p.z = sin(a) * r;
          p.y += sin(uTime * 0.8 + p.x) * 1.5;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = size * (200.0 / -mv.z);
          vAlpha = 0.3 + sin(uTime * 3.0 + p.y) * 0.2;
        }
      `,
      fragmentShader: `
        uniform sampler2D uTex;
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          gl_FragColor = vec4(vColor, vAlpha) * texture2D(uTex, gl_PointCoord);
        }
      `,
      transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const dustPoints = new THREE.Points(dustGeo, dustMat);
    scene.add(dustPoints);

    /* ── ground grid ── */
    const grid = new THREE.GridHelper(120, 60, 0x005577, 0x001122);
    grid.position.y = -0.3;
    grid.material.opacity = 0.2;
    grid.material.transparent = true;
    scene.add(grid);

    /* ── holographic ring at building mid ── */
    const ringGeo = new THREE.TorusGeometry(7, 0.03, 8, 100);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 18;
    scene.add(ring);

    /* ══════════════════════════════════════════════════════════
       ANIMATION
    ══════════════════════════════════════════════════════════ */
    const clock = new THREE.Clock();
    let frameId;
    let camAngle = -0.3; // start slightly to the side

    const tick = () => {
      const delta = clock.getDelta();
      const time  = clock.getElapsedTime();

      // smooth progress
      progressRef.current = lerp(progressRef.current, targetProgressRef.current / 100, 0.05);
      const prog = progressRef.current;
      const phase = phaseRef.current;

      dustMat.uniforms.uTime.value = time;

      /* ── FLOOR-BY-FLOOR CONSTRUCTION ── */
      const buildProgress = Math.min(prog / 0.58, 1); // 0→1 over build phase (0-58%)
      const floorsToShow  = Math.floor(buildProgress * TOTAL_FLOORS);

      for (let f = 0; f < TOTAL_FLOORS; f++) {
        const mesh = floorMeshes[f];
        const mat  = mesh.material;

        if (f <= floorsToShow) {
          // This floor should be visible — animate it dropping into place
          const dropSpeed = 0.12;
          mesh.position.y = lerp(mesh.position.y, floorTargetY[f], dropSpeed);
          mat.opacity = lerp(mat.opacity, 0.9, 0.08);

          // Animate window glow
          mesh.children.forEach(child => {
            if (child.material) {
              child.material.opacity = lerp(child.material.opacity, 0.12, 0.05);
            }
          });

          // Flash effect when floor just arrives
          const distToTarget = Math.abs(mesh.position.y - floorTargetY[f]);
          if (distToTarget < 2 && distToTarget > 0.1) {
            mat.opacity = 1.0; // bright flash on landing
          }
        } else {
          // Not yet built — keep invisible and above
          mat.opacity = lerp(mat.opacity, 0, 0.05);
        }
      }

      // Antenna and beacon — appear when building is almost done
      if (buildProgress > 0.9) {
        const aP = (buildProgress - 0.9) / 0.1;
        antenna.position.y = lerp(antenna.position.y, TOTAL_FLOORS * FLOOR_H + 4, 0.08);
        antennaMat.opacity = lerp(antennaMat.opacity, 0.8, 0.06);
        beacon.position.y = lerp(beacon.position.y, TOTAL_FLOORS * FLOOR_H + 8, 0.08);
        beaconMat.opacity = 0.4 + Math.sin(time * 4) * 0.4; // blinking red
      }

      // Platform
      if (buildProgress > 0.05) {
        platformMat.opacity = lerp(platformMat.opacity, 0.5, 0.04);
      }

      // Surrounding buildings — fade in gradually
      surroundBuildings.forEach((sb, i) => {
        const delay = 0.2 + i * 0.08;
        if (buildProgress > delay) {
          sb.mesh.material.opacity = lerp(sb.mesh.material.opacity, sb.targetOpacity, 0.03);
        }
      });

      // Ring — appears once building is half-built
      if (buildProgress > 0.5) {
        ringMat.opacity = lerp(ringMat.opacity, 0.3, 0.03);
        ring.rotation.z += delta * 0.3;
      }

      /* ── CAMERA ── */
      if (phase === 'exit' || isExitingRef.current) {
        camera.position.lerp(new THREE.Vector3(0, 20, -5), 0.05);
        camera.lookAt(0, 20, -500);
        camera.fov = lerp(camera.fov, 150, 0.07);
        camera.updateProjectionMatrix();

      } else if (phase === 'sweep') {
        // LEFT-TO-RIGHT sweep
        camAngle += delta * 0.55;
        const sR = 30;
        camera.position.x = lerp(camera.position.x, Math.sin(camAngle) * sR, 0.05);
        camera.position.z = lerp(camera.position.z, Math.cos(camAngle) * sR, 0.05);
        camera.position.y = lerp(camera.position.y, 22, 0.03);
        camera.lookAt(0, 16, 0);

      } else if (phase === 'zoom') {
        camera.position.lerp(new THREE.Vector3(6, 22, 20), 0.03);
        camera.lookAt(0, 18, 0);

      } else if (phase === 'hold') {
        // Hold still — admire the building
        camera.position.lerp(new THREE.Vector3(0, 24, 32), 0.035);
        camera.lookAt(0, 16, 0);

      } else {
        // BUILD phase — orbit slowly, pull in
        camAngle += delta * 0.12;
        const pullR = 55 - buildProgress * 22;
        camera.position.x = Math.cos(camAngle) * pullR;
        camera.position.z = Math.sin(camAngle) * pullR;
        camera.position.y = 30 - buildProgress * 8;
        camera.lookAt(0, buildProgress * 18, 0);
      }

      // Grid scroll
      grid.position.z = (time * 1.5) % 2;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(tick);
    };
    tick();

    const onResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', onResize);
      floorMeshes.forEach(m => { m.geometry.dispose(); m.material.dispose(); });
      surroundBuildings.forEach(s => { s.mesh.geometry.dispose(); s.mesh.material.dispose(); });
      dustGeo.dispose(); dustMat.dispose();
      renderer.dispose();
    };
  }, []);

  if (isDone) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position:'fixed', inset:0, zIndex:99999,
        background:'radial-gradient(ellipse at 50% 70%, #000c1a 0%, #000204 100%)',
        display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
        overflow:'hidden',
        transition:'opacity 1s ease, transform 1s ease, filter 1s ease',
        opacity: exitAnim ? 0 : 1,
        transform: exitAnim ? 'scale(3)' : 'scale(1)',
        filter: exitAnim ? 'blur(30px) brightness(2.5)' : 'blur(0) brightness(1)',
      }}
    >
      <canvas ref={canvasRef}
        style={{ position:'absolute', inset:0, width:'100%', height:'100%', display:'block' }} />

      {/* scanlines */}
      <div style={{
        position:'absolute', inset:0, pointerEvents:'none', zIndex:1,
        backgroundImage:'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,229,255,0.01) 2px,rgba(0,229,255,0.01) 3px)',
      }}/>

      {/* vignette */}
      <div style={{
        position:'absolute', inset:0, pointerEvents:'none', zIndex:1,
        background:'radial-gradient(ellipse at center,transparent 30%,rgba(0,0,0,0.85) 100%)',
      }}/>

      {/* UI */}
      <div style={{
        position:'relative', zIndex:10,
        display:'flex', flexDirection:'column', alignItems:'center',
        marginTop:'42vh',
        transition:'opacity 800ms, transform 800ms',
        opacity: exitAnim ? 0 : 1,
        transform: exitAnim ? 'scale(0.5) translateY(40px)' : 'scale(1)',
        userSelect:'none', pointerEvents:'none', textAlign:'center', padding:'0 16px',
      }}>

        {/* Logo */}
        <div style={{ perspective:'800px', marginBottom:'6px' }}>
          <div style={{
            width:'48px', height:'48px', border:'2px solid #ffc64d', borderRadius:'50%',
            display:'flex', alignItems:'center', justifyContent:'center',
            background:'rgba(0,0,0,0.5)', backdropFilter:'blur(10px)',
            boxShadow:'0 0 35px rgba(255,198,77,0.5), 0 0 70px rgba(0,229,255,0.15)',
            animation:'lSpin 8s linear infinite', transformStyle:'preserve-3d',
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="#ffc64d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
              style={{ transform:'translateZ(10px) rotate(-45deg)' }}>
              <path d="M3 12l9-9 9 9M9 21v-6a3 3 0 0 1 6 0v6"/>
            </svg>
          </div>
        </div>

        {/* Brand */}
        <div style={{ position:'relative', marginBottom:'10px' }}>
          <span style={{
            fontSize:'2.2rem', fontWeight:900, letterSpacing:'0.4em', color:'#fff',
            textShadow: glitch
              ? '3px 0 #00e5ff,-3px 0 #ff0088,0 0 30px #fff'
              : '0 0 20px rgba(255,255,255,0.3)',
            fontFamily:'system-ui,sans-serif', transition:'text-shadow 60ms',
          }}>PABAND</span>
          {glitch && <>
            <span style={{
              position:'absolute',top:0,left:'3px',fontSize:'2.2rem',fontWeight:900,
              letterSpacing:'0.4em',color:'#00e5ff',opacity:0.5,mixBlendMode:'screen',
              fontFamily:'system-ui',clipPath:'inset(25% 0 45% 0)',
            }}>PABAND</span>
            <span style={{
              position:'absolute',top:0,left:'-3px',fontSize:'2.2rem',fontWeight:900,
              letterSpacing:'0.4em',color:'#ff0088',opacity:0.35,mixBlendMode:'screen',
              fontFamily:'system-ui',clipPath:'inset(55% 0 10% 0)',
            }}>PABAND</span>
          </>}
        </div>

        {/* Percentage */}
        <div style={{ display:'flex', alignItems:'baseline', gap:'3px', marginBottom:'4px' }}>
          <span style={{
            fontSize:'3.8rem', fontWeight:900, color:'#fff', lineHeight:1,
            fontFamily:'system-ui,monospace',
            textShadow:'0 0 30px rgba(255,255,255,0.5)',
            letterSpacing:'-2px',
          }}>{progress}</span>
          <span style={{
            fontSize:'1.4rem', fontWeight:700, color:'#ffc64d',
            textShadow:'0 0 12px #ffc64d',
          }}>%</span>
        </div>

        {/* Status */}
        <p style={{
          fontSize:'9px', fontWeight:700, letterSpacing:'0.2em',
          color:'#00e5ff', textTransform:'uppercase',
          textShadow:'0 0 10px #00e5ff',
          marginBottom:'14px', minHeight:'12px',
          animation:'lPulse 1.6s ease-in-out infinite',
          fontFamily:'system-ui,monospace',
        }}>{statusText}</p>

        {/* Progress bar */}
        <div style={{
          width:'min(300px,82vw)', height:'5px',
          background:'rgba(255,255,255,0.04)', borderRadius:'99px',
          overflow:'hidden', border:'1px solid rgba(255,255,255,0.08)',
          boxShadow:'0 0 18px rgba(0,229,255,0.1)', padding:'1px',
        }}>
          <div style={{
            height:'100%', borderRadius:'99px', width:`${progress}%`,
            background:'linear-gradient(90deg,#00e5ff 0%,#ffc64d 55%,#fff 100%)',
            boxShadow:'0 0 12px 2px rgba(255,198,77,0.6),0 0 30px rgba(0,229,255,0.3)',
            transition:'width 50ms linear', position:'relative',
          }}>
            <div style={{
              position:'absolute',right:'-1px',top:'50%',transform:'translateY(-50%)',
              width:'6px',height:'6px',borderRadius:'50%',background:'#fff',
              boxShadow:'0 0 8px 3px #fff,0 0 16px 5px #ffc64d',
            }}/>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes lSpin{from{transform:rotateY(0) rotateX(12deg)}to{transform:rotateY(360deg) rotateX(12deg)}}
        @keyframes lPulse{0%,100%{opacity:1}50%{opacity:.4}}
      `}</style>
    </div>
  );
};

export default ThreeLoader;
