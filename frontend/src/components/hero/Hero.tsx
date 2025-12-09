import './Hero.css';
import logo from "../../assets/logo.png"

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-bg">
        <img
          src={logo}
          alt="Online Voting Hero"
        />
      </div>
      <div className="hero-content">
        <div className="hero-inner">
          <div className="hero-text">
            <h1>
              Secure, Fast, and Transparent Online Voting
            </h1>
            <p>
              Our Online Voting System ensures safe and reliable elections with easy access for all voters. Experience modern, AI-powered voting technology.
            </p>
            <div className="hero-buttons">
              <button>Start Voting Now</button>
              <button>Learn More</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
