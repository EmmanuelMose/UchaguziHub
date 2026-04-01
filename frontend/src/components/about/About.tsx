import { Users, Target, Eye, Shield, Vote, Smartphone, Award, Heart } from 'lucide-react';
import './About.css';
import logo from "../../assets/logo.png"

const aboutFeatures = [
  {
    icon: <Eye className="about-icon" />,
    title: "Our Vision",
    description: "To revolutionize campus democracy by creating a transparent, secure, and accessible online voting platform that empowers every student to have a voice in university governance.",
  },
  {
    icon: <Target className="about-icon" />,
    title: "Our Mission",
    description: "To provide a reliable, user-friendly, and verifiable online voting system for universities, ensuring fair student elections with real-time results and complete transparency.",
  },
  {
    icon: <Shield className="about-icon" />,
    title: "Security First",
    description: "Bank-grade encryption, multi-factor authentication, and blockchain-verified votes ensure that every ballot is secure and tamper-proof.",
  },
  {
    icon: <Vote className="about-icon" />,
    title: "Easy Voting",
    description: "Intuitive interface designed specifically for students, making the voting process simple, fast, and accessible from any device.",
  },
  {
    icon: <Smartphone className="about-icon" />,
    title: "Mobile Ready",
    description: "Fully responsive design that works seamlessly on smartphones, tablets, and desktop computers for voting on the go.",
  },
  {
    icon: <Award className="about-icon" />,
    title: "Trusted Results",
    description: "Real-time vote counting with audit trails and instant result generation that all stakeholders can verify.",
  },
];

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div className="about-header">
          <div className="about-badge">University Voting System</div>
          <h2 className="about-title">Empowering Student Democracy</h2>
          <p className="about-subtitle">
            Built specifically for universities to ensure fair, transparent, and accessible student elections
          </p>
        </div>

        <div className="about-grid">
          <div className="about-text">
            <div className="about-intro">
              <h3>Why Choose Our Platform?</h3>
              <p>
                Our university voting system combines cutting-edge technology with student-focused design to deliver 
                the most secure and accessible election platform for campus communities. We understand the unique 
                challenges of student elections and have built solutions that ensure every vote counts.
              </p>
            </div>
            <div className="about-features">
              {aboutFeatures.map((feature, index) => (
                <div key={index} className="about-feature">
                  <div className="about-feature-icon">{feature.icon}</div>
                  <div>
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="about-image-wrapper">
            <div className="about-image-card">
              <div className="about-image-container">
                <img
                  src={logo}
                  alt="University Voting System"
                  className="about-image"
                />
                <div className="about-gradient"></div>
              </div>
              <div className="about-stats">
                <div className="about-stat">
                  <span className="about-stat-number">10K+</span>
                  <span className="about-stat-label">Students Served</span>
                </div>
                <div className="about-stat">
                  <span className="about-stat-number">50+</span>
                  <span className="about-stat-label">Universities</span>
                </div>
                <div className="about-stat">
                  <span className="about-stat-number">98%</span>
                  <span className="about-stat-label">Satisfaction Rate</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="about-quote">
          <div className="about-quote-content">
            <Heart className="about-quote-icon" />
            <p>"Making student elections accessible, secure, and transparent for every university campus"</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;