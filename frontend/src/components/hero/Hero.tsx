import './Hero.css';
import logo from "../../assets/logo.png";

const Hero = () => {
  const handleStartVoting = () => {
    console.log("Start voting clicked");
  };

  const handleLearnMore = () => {
    console.log("Learn more clicked");
  };

  return (
    <section className="hero">
      <div className="hero-bg">
        <img
          src={logo}
          alt="University Online Voting Hero"
        />
      </div>
      <div className="hero-content">
        <div className="hero-inner">
          <div className="hero-text">
            <h1>
              University Based Online Voting System
            </h1>
            
            <h2>
              Secure, Fast, and Transparent Student Elections
            </h2>

            <p>
              Welcome to the official University Online Voting Platform. Our system provides a secure, 
              efficient, and transparent way for students to participate in university elections from 
              anywhere on campus or remotely. Built with cutting-edge technology to ensure every vote 
              counts and every voice is heard.
            </p>

            <p>
              Experience hassle-free student government elections, faculty representative voting, 
              and campus organization polls. Our platform is designed specifically for university 
              environments, ensuring accessibility for all students while maintaining the highest 
              standards of security and integrity.
            </p>

            <p>
              Join thousands of students who have already participated in making their university 
              better through democratic participation. Your vote matters in shaping the future of 
              our academic community.
            </p>

            <div className="hero-buttons">
              <button onClick={handleStartVoting}>Start Voting Now</button>
              <button onClick={handleLearnMore}>Learn More</button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;