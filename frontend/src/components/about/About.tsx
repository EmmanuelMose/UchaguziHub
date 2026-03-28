import { Users, Target, Eye } from 'lucide-react';
import './About.css';
import logo from "../../assets/logo.png"

const aboutFeatures = [
  {
    icon: <Eye className="about-icon" />,
    title: "Our Vision",
    description: "To create a transparent, secure, and accessible online voting platform that empowers every citizen to have a voice.",
  },
  {
    icon: <Target className="about-icon" />,
    title: "Our Mission",
    description: "To provide a reliable and easy-to-use online voting system, ensuring fair elections with verifiable results for all communities.",
  },
  {
    icon: <Users className="about-icon" />,
    title: "Our Community",
    description: "Join a network of engaged citizens and election administrators committed to safe, inclusive, and trustworthy online voting.",
  },
];

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div className="about-grid">
          <div className="about-text">
            <div className="about-intro">
              <h2>About Our Online Voting System</h2>
              <p>
                Our Online Voting System is designed to make elections secure, accessible, and transparent for everyone. We leverage modern technology to ensure every vote counts, while maintaining privacy and trust.
              </p>
            </div>
            <div className="about-features">
              {aboutFeatures.map((feature, index) => (
                <div key={index} className="about-feature">
                  <div className="about-feature-icon">{feature.icon}</div>
                  <div>
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="about-image-wrapper">
            <div className="about-image-container">
              <img
                src={logo}
                alt="Voting System"
                className="about-image"
              />
              <div className="about-gradient"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
