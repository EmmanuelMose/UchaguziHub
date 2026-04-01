import './CTA.css';

const CTA = () => {
  return (
    <section className="cta">
      <div className="cta-container">
        <div className="cta-box">
          <div className="cta-badge">University Elections 2025</div>
          <h2>Cast Your Vote. Shape Your Campus Future.</h2>
          <p>
            Join thousands of students participating in secure, transparent, and accessible university elections. 
            Your voice matters - register now and make a difference in your student government.
          </p>
          <div className="cta-buttons">
            <button className="cta-primary-btn">Register to Vote</button>
            <button className="cta-secondary-btn">Learn More</button>
          </div>
          <div className="cta-features">
            <div className="cta-feature">
              <span className="cta-feature-icon">✓</span>
              <span>Secure & Encrypted</span>
            </div>
            <div className="cta-feature">
              <span className="cta-feature-icon">✓</span>
              <span>Mobile Friendly</span>
            </div>
            <div className="cta-feature">
              <span className="cta-feature-icon">✓</span>
              <span>Real-time Results</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;