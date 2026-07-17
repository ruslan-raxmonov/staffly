import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { EmployeeTypes } from "@/components/sections/EmployeeTypes";
import { EnterpriseSecurity } from "@/components/sections/EnterpriseSecurity";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Integrations } from "@/components/sections/Integrations";
import { OperationsPreview } from "@/components/sections/OperationsPreview";
import { RequestAccess } from "@/components/sections/RequestAccess";
import { SocialProof } from "@/components/sections/SocialProof";
import { WhoIsItFor } from "@/components/sections/WhoIsItFor";
import { WhyStaffly } from "@/components/sections/WhyStaffly";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <WhyStaffly />
        <HowItWorks />
        <OperationsPreview />
        <EmployeeTypes />
        <EnterpriseSecurity />
        <Integrations />
        <WhoIsItFor />
        <RequestAccess />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
