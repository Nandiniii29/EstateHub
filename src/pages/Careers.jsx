import { Link } from 'react-router-dom';
import './SimplePage.css';
import './Careers.css';

const openings = [
  {
    title: 'Property Advisor',
    type: 'Full-time',
    location: 'Chandigarh',
    description:
      'Help customers discover properties that match their requirements and guide them through the property search process.',
  },
  {
    title: 'Sales Executive',
    type: 'Full-time',
    location: 'Chandigarh',
    description:
      'Connect with prospective customers, understand their requirements and help them explore suitable property options.',
  },
  {
    title: 'Customer Experience Associate',
    type: 'Full-time',
    location: 'Chandigarh',
    description:
      'Support customers with enquiries, property information and a smooth EstateHub experience.',
  },
];

export default function Careers() {
  return (
    <div className="simple-page careers-page">
      <section className="careers-hero">
        <div className="container">
          <span className="careers-eyebrow">CAREERS AT ESTATEHUB</span>
          <h1>Build the future of better property discovery.</h1>
          <p>
            Join a team focused on making property search simpler, more
            transparent and more useful for buyers, tenants and property
            professionals.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header careers-section-header">
            <div>
              <h2>Open Positions</h2>
              <p>
                Explore current opportunities and find a role where you can
                contribute to the EstateHub experience.
              </p>
            </div>
          </div>

          <div className="careers-grid">
            {openings.map((job) => (
              <article className="card career-card" key={job.title}>
                <div className="career-card-top">
                  <span className="career-badge">{job.type}</span>
                  <span className="career-location">{job.location}</span>
                </div>

                <h3>{job.title}</h3>

                <p>{job.description}</p>

                <Link
                  to="/contact?intent=careers"
                  className="career-apply"
                >
                  Apply Now
                  <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section careers-values-section">
        <div className="container">
          <div className="careers-values">
            <div>
              <span className="careers-eyebrow">WHY ESTATEHUB</span>
              <h2>Work on something people use every day.</h2>
              <p>
                Real estate can feel complicated. We are building a more
                organized experience where people can discover properties,
                compare options and make informed decisions.
              </p>
            </div>

            <div className="careers-value-list">
              <div>
                <strong>Customer focused</strong>
                <span>Build experiences around real customer needs.</span>
              </div>

              <div>
                <strong>Collaborative</strong>
                <span>Work together across technology, property and support.</span>
              </div>

              <div>
                <strong>Always learning</strong>
                <span>Grow your skills while helping improve the platform.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="careers-cta">
        <div className="container">
          <div className="careers-cta-inner">
            <div>
              <h2>Don't see the right role?</h2>
              <p>
                Send us a message and tell us how you would like to contribute
                to EstateHub.
              </p>
            </div>

            <Link
              to="/contact?intent=careers"
              className="btn btn-primary"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}