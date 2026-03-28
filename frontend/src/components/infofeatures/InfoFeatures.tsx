import { MessageSquare, BookOpen, BarChart2, ShieldCheck } from 'lucide-react';
import './Info.css';

const infoFeatures = [
  {
    icon: <MessageSquare className="info-icon" />,
    title: 'Live Voting Assistance',
    description: 'Get real-time guidance on how to vote securely and efficiently with our smart assistant.',
  },
  {
    icon: <BookOpen className="info-icon" />,
    title: 'Candidate Information Hub',
    description: 'Access detailed profiles, policies, and track records of all candidates before casting your vote.',
  },
  {
    icon: <BarChart2 className="info-icon" />,
    title: 'Election Statistics',
    description: 'Monitor voter turnout, results, and election trends with transparent and reliable data.',
  },
  {
    icon: <ShieldCheck className="info-icon" />,
    title: 'Secure & Verified Voting',
    description: 'Ensure every vote is secure, verified, and counted accurately with our encrypted voting system.',
  },
];

const Info = () => {
  return (
    <section id="features" className="info-section">
      <div className="info-container">
        <div className="info-header">
          <h2>Core Features of Our Online Voting System</h2>
          <p>Explore the tools designed to make voting safe, transparent, and accessible for everyone.</p>
        </div>
        <div className="info-grid">
          {infoFeatures.map((feature, index) => (
            <div key={index} className="info-card">
              <div className="info-icon-wrapper">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Info;
