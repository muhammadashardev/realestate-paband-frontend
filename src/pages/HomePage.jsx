import React, { memo } from 'react';
import HeroSection from '../components/HeroSection';
import FeaturesBar from '../components/FeaturesBar';
import TenantBenefitsSection from '../components/TenantBenefitsSection';
import OwnerBenefitsSection from '../components/OwnerBenefitsSection';
import PaymentFlowSection from '../components/PaymentFlowSection';
import CTASection from '../components/CTASection';

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <FeaturesBar />
      <TenantBenefitsSection />
      <OwnerBenefitsSection />
      <PaymentFlowSection />
      <CTASection />
    </>
  );
};

export default memo(HomePage);
