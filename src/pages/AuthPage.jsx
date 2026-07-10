import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaLock, FaUser, FaPhoneAlt, FaGoogle, FaPhone, FaCheck, FaMapMarkerAlt } from 'react-icons/fa';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi'; // or from react-icons/fi
import { useNavigate } from 'react-router-dom';
import * as api from '../utils/api';

const InputField = ({ icon: Icon, type, placeholder, value, onChange, showPassword, setShowPassword, isPassword }) => (
  <div className="relative w-full">
    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
      <Icon className="text-sm" />
    </div>
    <input
      type={isPassword ? (showPassword ? 'text' : 'password') : type}
      className="w-full bg-[#1A1A1A] border border-transparent text-white text-sm rounded-lg pl-10 pr-10 py-3.5 focus:outline-none focus:border-[#B68B39] transition-colors placeholder-gray-500 font-medium"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    {isPassword && (
      <button
        type="button"
        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-300"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <HiOutlineEyeOff className="text-lg" /> : <HiOutlineEye className="text-lg" />}
      </button>
    )}
  </div>
);

const AuthPage = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('login');
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '174296040933-351i015irg92nlvcmin6k3gum5vgftqc.apps.googleusercontent.com';
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState('');
  const [showGoogleRoleModal, setShowGoogleRoleModal] = useState(false);
  const [googleRoleSelection, setGoogleRoleSelection] = useState('tenant');
  const googleRoleSelectionRef = useRef('tenant');

  // Login State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Forgot Password State
  const [forgotEmail, setForgotEmail] = useState('');

  // Verify Account State
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  // Create New Password State
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  // Signup State
  const [signupName, setSignupName] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupAddress, setSignupAddress] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showSignupConfirmPassword, setShowSignupConfirmPassword] = useState(false);
  const [role, setRole] = useState('owner'); // 'owner' | 'tenant'
  const [incomeSource, setIncomeSource] = useState('Job'); // 'Job' | 'Business'

  useEffect(() => {
    const initializeGoogleSignIn = () => {
      if (window.google?.accounts?.id) {
        try {
          window.google.accounts.id.initialize({
            client_id: googleClientId,
            callback: handleGoogleCredentialResponse,
            auto_select: false,
            cancel_on_tap_outside: true,
            context: 'signin',
            ux_mode: 'popup',
            use_fedcm_for_prompt: true,
          });
        } catch (err) {
          console.error('Google sign-in initialization failed:', err);
          setError('Google sign-in is temporarily unavailable in this browser. Please try email/password or a normal browser tab.');
        }
      }
    };

    if (window.google?.accounts?.id) {
      initializeGoogleSignIn();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = initializeGoogleSignIn;
    script.onerror = () => setError('Google sign-in could not be loaded right now.');
    document.body.appendChild(script);

    return () => {
      script.onload = null;
      script.onerror = null;
    };
  }, [googleClientId]);

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value.slice(0, 1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    // Auto focus next input logic could be added here
  };

  const handleGoogleCredentialResponse = async (response) => {
    if (!response?.credential) {
      setError('Google sign-in was cancelled.');
      return;
    }

    const selectedRole = googleRoleSelectionRef.current || 'tenant';
    setError('');
    setLoading(true);
    try {
      const res = await api.googleLogin(response.credential, selectedRole);
      if (res.user) {
        if (!res.user.isEmailVerified) {
          setVerificationEmail(res.user.email || '');
          setCurrentView('verify-account');
        } else {
          if (res.user.role?.toLowerCase() === 'owner') {
            navigate('/owner');
          } else if (res.user.role?.toLowerCase() === 'tenant') {
            navigate('/tenant');
          } else {
            navigate('/');
          }
        }
      }
    } catch (err) {
      setError(err.message || 'Google login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRoleSelect = (role) => {
    setGoogleRoleSelection(role);
    googleRoleSelectionRef.current = role;
  };

  const handleGoogleLogin = () => {
    setError('');
    setShowGoogleRoleModal(true);
  };

  const handleGoogleRoleContinue = () => {
    if (!window.google?.accounts?.id) {
      setError('Google sign-in is unavailable right now.');
      setShowGoogleRoleModal(false);
      return;
    }

    setShowGoogleRoleModal(false);

    try {
      window.google.accounts.id.prompt((notification) => {
        if (notification?.getNotDisplayedReason?.()) {
          setError('Google sign-in is blocked in this browser session. Please allow third-party sign-in, use a normal browser tab, or continue with email/password.');
        } else if (notification?.getDismissedReason?.()) {
          setError('Google sign-in was dismissed. Please try again or continue with email/password.');
        } else if (notification?.getSkippedReason?.()) {
          setError('Google sign-in was skipped. Please try again.');
        }
      });
    } catch (err) {
      console.error('Google sign-in prompt failed:', err);
      setError('Google sign-in could not be opened in this browser. Please use a normal browser tab or continue with email/password.');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await api.login(loginEmail, loginPassword);
      if (res.user) {
        if (!res.user.isEmailVerified) {
          setVerificationEmail(loginEmail);
          setCurrentView('verify-account');
        } else {
          // Route based on role
          if (res.user.role.toLowerCase() === 'owner') {
            navigate('/owner');
          } else if (res.user.role.toLowerCase() === 'tenant') {
            navigate('/tenant');
          } else {
            navigate('/');
          }
        }
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!signupName || !signupEmail || !signupPhone || !signupPassword || !signupConfirmPassword) {
      setError('Please fill in all required fields.');
      return;
    }
    if (signupPassword !== signupConfirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const userData = {
        fullName: signupName,
        email: signupEmail,
        phoneNumber: signupPhone,
        address: signupAddress || 'Karachi, Pakistan',
        password: signupPassword,
        confirmPassword: signupConfirmPassword,
        role: role.toLowerCase(),
        ...(role === 'tenant' && { incomeSource })
      };
      await api.register(userData);
      setVerificationEmail(signupEmail);
      setCurrentView('verify-account');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const otpCode = otp.join('');
    if (otpCode.length < 6) {
      setError('Please enter a 6-digit OTP code.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await api.verifyOtp(verificationEmail || loginEmail, otpCode);
      if (res.user) {
        if (res.user.role.toLowerCase() === 'owner') {
          navigate('/owner');
        } else if (res.user.role.toLowerCase() === 'tenant') {
          navigate('/tenant');
        } else {
          navigate('/');
        }
      }
    } catch (err) {
      setError(err.message || 'OTP verification failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    const email = verificationEmail || loginEmail;
    if (!email) {
      setError('No email address found for resending OTP.');
      return;
    }
    setError('');
    try {
      const res = await api.resendOtp(email);
      alert(res.message || 'OTP code resent successfully!');
    } catch (err) {
      setError(err.message || 'Failed to resend OTP.');
    }
  };


  const Logo = () => (
    <div className="flex flex-col items-center justify-center gap-1 mb-6 mt-2 cursor-pointer" onClick={() => navigate('/')}>
      {/* Custom SVG Diamond House Logo - 3D Animated */}
      <motion.div
        className="relative w-10 h-10 flex items-center justify-center shrink-0 mb-1"
        style={{ perspective: 1000 }}
        whileHover={{ scale: 1.1 }}
      >
        {/* Diamond Shield Border */}
        <motion.div
          className="absolute inset-0 border-2 rounded-xl rotate-45 border-white"
          animate={{ rotateZ: [45, 405] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        {/* 3D Spinning Inner Shield */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ rotateY: [0, 360] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
          {/* House roof & gold tick checkmark */}
          <svg className="w-6 h-6 z-10 drop-shadow-md" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12l9-9 9 9" stroke="#4ADE80" />
            <path d="M9 21v-6a3 3 0 0 1 6 0v6" stroke="#4ADE80" />
            <path d="M8 12l3 3 5-5" stroke="#B68B39" strokeWidth="3" />
          </svg>
        </motion.div>
      </motion.div>
      <div className="flex flex-col items-center">
        <div className="flex items-baseline">
          <span className="font-extrabold text-xl tracking-tight text-white">paband</span>
          <span className="text-[#16A34A] font-extrabold text-xl">.pk</span>
        </div>
        <span className="text-[7px] font-bold tracking-[0.25em] -mt-1 opacity-70 text-gray-200">DIGITAL RENTAL SYSTEM</span>
      </div>
    </div>
  );

  const renderView = () => {
    switch (currentView) {
      case 'login':
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col w-full">
            <h2 className="text-white text-[28px] font-bold text-center mb-2">Welcome Back</h2>
            <p className="text-gray-400 text-xs text-center mb-8 px-4 leading-relaxed font-medium">
              Login to access your Paband dashboard and<br />manage your rental activities securely.
            </p>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg p-3.5 mb-4 text-center font-semibold">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <InputField icon={FaEnvelope} type="email" placeholder="Email" value={loginEmail} onChange={setLoginEmail} />
              <InputField icon={FaLock} type="password" placeholder="Password" value={loginPassword} onChange={setLoginPassword} isPassword showPassword={showLoginPassword} setShowPassword={setShowLoginPassword} />

              <div className="flex items-center justify-between mt-4 mb-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <div className={`w-4 h-4 rounded flex items-center justify-center border ${keepLoggedIn ? 'bg-[#B68B39] border-[#B68B39]' : 'border-gray-500 bg-transparent'}`} onClick={() => setKeepLoggedIn(!keepLoggedIn)}>
                    {keepLoggedIn && <FaCheck className="text-white text-[10px]" />}
                  </div>
                  <span className="text-white text-xs font-semibold" onClick={() => setKeepLoggedIn(!keepLoggedIn)}>Keep me log in</span>
                </label>
                <button type="button" onClick={() => setCurrentView('forgot-password')} className="text-gray-400 text-xs font-semibold hover:text-white transition-colors">
                  Forgot Password?
                </button>
              </div>

              <button type="submit" disabled={loading} className="w-full bg-[#B68B39] hover:bg-[#9B742E] text-white font-bold py-3.5 rounded-lg transition-colors mb-6 text-sm shadow-[0_4px_14px_rgba(182,139,57,0.25)] flex justify-center items-center">
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <div className="flex items-center gap-4 mb-6">
              <div className="h-px bg-gray-800 flex-1"></div>
              <span className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">OR</span>
              <div className="h-px bg-gray-800 flex-1"></div>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full bg-[#1A1A1A] hover:bg-gray-800 text-white font-semibold py-3.5 rounded-lg flex items-center justify-center gap-3 transition-colors text-xs border border-transparent hover:border-gray-700 disabled:opacity-60"
              >
                <FaGoogle className="text-[#EA4335] text-sm" />
                Login with Google
              </button>
              <button className="w-full bg-[#1A1A1A] hover:bg-gray-800 text-white font-semibold py-3.5 rounded-lg flex items-center justify-center gap-3 transition-colors text-xs border border-transparent hover:border-gray-700">
                <FaPhone className="text-gray-300 text-sm" />
                Continue with Phone Number
              </button>
            </div>

            <p className="text-center text-xs text-gray-400 mt-8 font-medium">
              Don't have an account? <button onClick={() => setCurrentView('signup')} className="text-[#B68B39] font-bold hover:underline">Create Account</button>
            </p>
          </motion.div>
        );

      case 'forgot-password':
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col w-full">
            <h2 className="text-white text-[28px] font-bold text-center mb-2">Forgot Password</h2>
            <p className="text-gray-400 text-xs text-center mb-8 px-4 leading-relaxed font-medium">
              Enter your registered email. We will send<br />you a reset code.
            </p>

            <div className="space-y-4 mb-8">
              <InputField icon={FaEnvelope} type="email" placeholder="Email" value={forgotEmail} onChange={setForgotEmail} />
            </div>

            <button onClick={() => setCurrentView('verify-account')} className="w-full bg-[#B68B39] hover:bg-[#9B742E] text-white font-bold py-3.5 rounded-lg transition-colors text-sm shadow-[0_4px_14px_rgba(182,139,57,0.25)] mb-12">
              Reset Password
            </button>
          </motion.div>
        );

      case 'verify-account':
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col w-full">
            <h2 className="text-white text-[28px] font-bold text-center mb-2">Verify Your Account</h2>
            <p className="text-gray-400 text-xs text-center mb-8 px-4 font-medium">
              Enter the 6-digit code sent to {verificationEmail || 'your email'}
            </p>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg p-3.5 mb-4 text-center font-semibold">
                {error}
              </div>
            )}

            <form onSubmit={handleVerifyOtp}>
              <div className="flex justify-center gap-2 sm:gap-3 mb-6">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    className="w-12 h-14 bg-[#333333] border border-gray-600 focus:border-[#B68B39] text-white text-xl font-bold text-center rounded-lg focus:outline-none transition-colors"
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                  />
                ))}
              </div>

              <div className="flex items-center justify-between mb-8 px-1">
                <span className="text-gray-400 text-xs font-semibold">Didn't receive the code?</span>
                <button type="button" onClick={handleResendOtp} className="text-[#B68B39] text-xs font-semibold hover:underline">Resend Code</button>
              </div>

              <button type="submit" disabled={loading} className="w-full bg-[#B68B39] hover:bg-[#9B742E] text-white font-bold py-3.5 rounded-lg transition-colors mb-8 text-sm shadow-[0_4px_14px_rgba(182,139,57,0.25)] flex justify-center items-center">
                {loading ? 'Verifying...' : 'Verify'}
              </button>
            </form>
          </motion.div>
        );

      case 'create-new-password':
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col w-full">
            <h2 className="text-white text-[28px] font-bold text-center mb-2">Create New Password</h2>
            <p className="text-gray-400 text-xs text-center mb-8 px-4 leading-relaxed font-medium">
              Enter your Confirm password that you want<br />to keep
            </p>

            <div className="space-y-4 mb-8">
              <InputField icon={FaLock} type="password" placeholder="Password" value={newPassword} onChange={setNewPassword} isPassword showPassword={showNewPassword} setShowPassword={setShowNewPassword} />
              <InputField icon={FaLock} type="password" placeholder="Confirm Password" value={confirmNewPassword} onChange={setConfirmNewPassword} isPassword showPassword={showConfirmNewPassword} setShowPassword={setShowConfirmNewPassword} />
            </div>

            <button onClick={() => setCurrentView('login')} className="w-full bg-[#B68B39] hover:bg-[#9B742E] text-white font-bold py-3.5 rounded-lg transition-colors text-sm shadow-[0_4px_14px_rgba(182,139,57,0.25)] mb-12">
              Continue
            </button>
          </motion.div>
        );

      case 'signup':
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col w-full">
            <h2 className="text-white text-[28px] font-bold text-center mb-2">Create Your Account</h2>
            <p className="text-gray-400 text-xs text-center mb-6 px-4 leading-relaxed font-medium">
              Please enter your basic details and set a secure<br />password to continue.
            </p>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg p-3.5 mb-4 text-center font-semibold">
                {error}
              </div>
            )}

            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-3 mb-4">
                <InputField icon={FaUser} type="text" placeholder="Full Name*" value={signupName} onChange={setSignupName} />
                <div className="flex gap-3">
                  <InputField icon={FaPhoneAlt} type="tel" placeholder="Phone Number*" value={signupPhone} onChange={setSignupPhone} />
                  <InputField icon={FaEnvelope} type="email" placeholder="Email Address*" value={signupEmail} onChange={setSignupEmail} />
                </div>
                <InputField icon={FaMapMarkerAlt} type="text" placeholder="Address (e.g. 123 Street, Karachi)" value={signupAddress} onChange={setSignupAddress} />
                <div className="flex gap-3">
                  <InputField icon={FaLock} type="password" placeholder="Password*" value={signupPassword} onChange={setSignupPassword} isPassword showPassword={showSignupPassword} setShowPassword={setShowSignupPassword} />
                  <InputField icon={FaLock} type="password" placeholder="Confirm Password*" value={signupConfirmPassword} onChange={setSignupConfirmPassword} isPassword showPassword={showSignupConfirmPassword} setShowPassword={setShowSignupConfirmPassword} />
                </div>
              </div>

              {/* Password Requirements */}
              <div className="bg-[#1A1A1A] rounded-lg p-4 mb-4">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-2">PASSWORD REQUIREMENTS</p>
                <div className="grid grid-cols-2 gap-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#B68B39]"></div>
                    <span className="text-[10px] text-gray-400 font-semibold">Minimum 8 characters</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#B68B39]"></div>
                    <span className="text-[10px] text-gray-400 font-semibold">At least one uppercase</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#B68B39]"></div>
                    <span className="text-[10px] text-gray-400 font-semibold">At least one number</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#B68B39]"></div>
                    <span className="text-[10px] text-gray-400 font-semibold">At least one special char</span>
                  </div>
                </div>
              </div>

              {/* Role Selection */}
              <p className="text-xs text-white font-bold mb-2">Continue As</p>
              <div className="flex gap-3 mb-4">
                <div
                  onClick={() => setRole('owner')}
                  className={`flex-1 flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${role === 'owner' ? 'border-[#B68B39] bg-[#B68B39]/10' : 'border-transparent bg-[#1A1A1A] hover:bg-gray-800'}`}
                >
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 3L2 12H5V21H19V12H22L12 3Z" /></svg>
                  </div>
                  <div>
                    <h4 className="text-white text-xs font-bold mb-0.5">Property Owner</h4>
                    <p className="text-gray-400 text-[9px] leading-tight font-medium">Manage properties, tenant requests, agreements.</p>
                  </div>
                </div>
                <div
                  onClick={() => setRole('tenant')}
                  className={`flex-1 flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${role === 'tenant' ? 'border-[#B68B39] bg-[#B68B39]/10' : 'border-transparent bg-[#1A1A1A] hover:bg-gray-800'}`}
                >
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <FaUser className="text-white text-sm" />
                  </div>
                  <div>
                    <h4 className="text-white text-xs font-bold mb-0.5">Tenant</h4>
                    <p className="text-gray-400 text-[9px] leading-tight font-medium">Access rental info, agreements, and updates.</p>
                  </div>
                </div>
              </div>

              {/* Income Source for Tenants */}
              {role === 'tenant' && (
                <div className="mb-6">
                  <p className="text-xs text-white font-bold mb-2">Income Source*</p>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setIncomeSource('Job')}
                      className={`flex-1 py-2.5 rounded-lg text-xs font-bold border transition-all ${incomeSource === 'Job' ? 'bg-[#B68B39] border-[#B68B39] text-white' : 'bg-[#1A1A1A] border-transparent text-gray-400 hover:bg-gray-800'}`}
                    >
                      Job
                    </button>
                    <button
                      type="button"
                      onClick={() => setIncomeSource('Business')}
                      className={`flex-1 py-2.5 rounded-lg text-xs font-bold border transition-all ${incomeSource === 'Business' ? 'bg-[#B68B39] border-[#B68B39] text-white' : 'bg-[#1A1A1A] border-transparent text-gray-400 hover:bg-gray-800'}`}
                    >
                      Business
                    </button>
                  </div>
                </div>
              )}

              <button type="submit" disabled={loading} className="w-full bg-[#B68B39] hover:bg-[#9B742E] text-white font-bold py-3.5 rounded-lg transition-colors text-sm shadow-[0_4px_14px_rgba(182,139,57,0.25)] mb-6 flex justify-center items-center">
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            <div className="flex items-center gap-4 mb-6">
              <div className="h-px bg-gray-800 flex-1"></div>
              <span className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">OR</span>
              <div className="h-px bg-gray-800 flex-1"></div>
            </div>

            <div className="space-y-3">
              <button className="w-full bg-[#1A1A1A] hover:bg-gray-800 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-3 transition-colors text-xs border border-transparent hover:border-gray-700">
                <FaGoogle className="text-blue-500 text-sm" />
                Continue with Google
              </button>
              <button className="w-full bg-[#1A1A1A] hover:bg-gray-800 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-3 transition-colors text-xs border border-transparent hover:border-gray-700">
                <FaPhone className="text-gray-300 text-sm" />
                Continue with Phone Number
              </button>
            </div>

            <p className="text-center text-xs text-gray-400 mt-6 font-medium">
              Already an owner? <button onClick={() => setCurrentView('login')} className="text-[#B68B39] font-bold hover:underline">Log in</button>
            </p>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center px-4 py-8">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop')` }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
      </div>

      <AnimatePresence>
        {showGoogleRoleModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4"
          >
            <motion.div
              initial={{ y: 20, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 10, opacity: 0, scale: 0.98 }}
              className="w-full max-w-md rounded-[24px] border border-white/10 bg-[#121212] p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-white text-lg font-bold">Continue with Google</h3>
                  <p className="text-gray-400 text-xs mt-1">Choose how you want to continue. Only one role can be selected.</p>
                </div>
                <button type="button" onClick={() => setShowGoogleRoleModal(false)} className="text-gray-400 hover:text-white text-sm">✕</button>
              </div>

              <div className="space-y-3 mt-5">
                <button
                  type="button"
                  onClick={() => handleGoogleRoleSelect('owner')}
                  className={`w-full rounded-xl border p-4 text-left transition-all ${googleRoleSelection === 'owner' ? 'border-[#B68B39] bg-[#B68B39]/10' : 'border-white/10 bg-[#1A1A1A] hover:bg-gray-800'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 3L2 12H5V21H19V12H22L12 3Z" /></svg>
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">Property Owner</div>
                      <div className="text-gray-400 text-[11px]">Manage properties, visits, agreements, and payments.</div>
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleGoogleRoleSelect('tenant')}
                  className={`w-full rounded-xl border p-4 text-left transition-all ${googleRoleSelection === 'tenant' ? 'border-[#B68B39] bg-[#B68B39]/10' : 'border-white/10 bg-[#1A1A1A] hover:bg-gray-800'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                      <FaUser className="text-white text-sm" />
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">Tenant</div>
                      <div className="text-gray-400 text-[11px]">Browse rentals, request visits, and manage agreements.</div>
                    </div>
                  </div>
                </button>
              </div>

              <div className="flex gap-3 mt-6">
                <button type="button" onClick={() => setShowGoogleRoleModal(false)} className="flex-1 rounded-lg border border-white/10 bg-[#1A1A1A] px-4 py-3 text-sm font-semibold text-gray-300 hover:bg-gray-800">
                  Cancel
                </button>
                <button type="button" onClick={handleGoogleRoleContinue} disabled={loading} className="flex-1 rounded-lg bg-[#B68B39] px-4 py-3 text-sm font-semibold text-white hover:bg-[#9B742E] disabled:opacity-60">
                  {loading ? 'Please wait...' : 'Continue'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Modal */}
      <div className={`relative z-10 bg-[#0B0B0B] w-full max-w-[480px] rounded-[24px] p-8 shadow-2xl transition-all duration-300 border border-white/5`}>
        <Logo />
        <AnimatePresence mode="wait">
          {renderView()}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AuthPage;
