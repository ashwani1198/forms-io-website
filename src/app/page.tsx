import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Templates from "@/components/sections/Templates";
import Features from "@/components/sections/Features";
import QuestionTypes from "@/components/sections/QuestionTypes";
import HowItWorks from "@/components/sections/HowItWorks";
import BlogSection from "@/components/sections/BlogSection";
import CTASection from "@/components/sections/CTASection";
import DoodleBanner from "@/components/sections/DoodleBanner";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <DoodleBanner />
        <Features />
        <HowItWorks />
        <QuestionTypes />
        <Templates />
        <BlogSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
