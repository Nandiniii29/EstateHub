import { Link } from 'react-router-dom';
import { IconShield, IconAgents, IconLocation, IconScale } from '../components/icons.jsx';
import './About.css';

const stats = [
  { value: '1,200+', label: 'Verified Properties' },
  { value: '340+', label: 'Trusted Agents' },
  { value: '15,000+', label: 'Happy Customers' },
  { value: '4', label: 'Cities Covered' },
];

const values = [
  { icon: IconShield, title: 'Transparency', description: 'Every listing is verified before it goes live, so you always know what you\'re looking at.' },
  { icon: IconAgents, title: 'Expertise', description: 'Our agent network brings deep, local knowledge of every neighbourhood we cover.' },
  { icon: IconLocation, title: 'Local Focus', description: 'We specialise in the tricity region, so our recommendations are always relevant.' },
  { icon: IconScale, title: 'Fair Deals', description: 'From pricing tools to honest listings, we help you make confident decisions.' },
];

export default function About() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="container">
          <h1>About EstateHub</h1>
          <p>
            EstateHub connects buyers, tenants and sellers with verified properties across the tricity region,
            backed by a network of trusted local agents.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container about-mission">
          <div>
            <h2>Our Mission</h2>
            <p>
              We believe finding a home shouldn&apos;t mean sifting through outdated listings or unverified claims.
              EstateHub was built to bring clarity, trust and speed to real estate — helping people find a place
              that genuinely feels like home.
            </p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=900&auto=format&fit=crop"
            alt="Modern living room interior"
          />
        </div>
      </section>

      <section className="section stats-section">
        <div className="container stats-grid">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-card">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>What We Stand For</h2>
            <p>The values that shape every listing, every recommendation and every conversation.</p>
          </div>
          <div className="why-grid">
            {values.map(({ icon: Icon, title, description }) => (
              <div key={title} className="why-card">
                <span className="why-icon"><Icon /></span>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <div className="container cta-banner-inner">
          <div>
            <h2>Let&apos;s find your next property together.</h2>
            <p>Browse verified listings or get in touch with our team today.</p>
          </div>
          <div className="cta-banner-actions">
            <Link to="/properties" className="btn btn-primary">Explore Properties</Link>
            <Link to="/contact" className="btn btn-outline">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
