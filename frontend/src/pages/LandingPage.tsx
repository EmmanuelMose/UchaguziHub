import Hero from '../components/hero/Hero.tsx';
import About from '../components/about/About.tsx';
import CTA from '../components/cta/CTA.tsx';
import Footer from '../components/footer/Footer.tsx';
import Navbar from "../components/navbar/Navbar.tsx";
import Info from '../components/infofeatures/InfoFeatures.tsx';


const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Info />
      <CTA />
      <Footer />
    </div>
  );
};

export default LandingPage;
