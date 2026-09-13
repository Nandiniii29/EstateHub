import { Link } from 'react-router-dom';
import { IconHome, IconPhone, IconMail, IconLocation } from './icons.jsx';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="brand" style={{ color: 'var(--white)' }}>
            <IconHome />
            <span>
              Estate<em>Hub</em>
            </span>
          </div>
          <p>Find a place that feels like home.</p>
          <p className="footer-copy">
            Discover verified properties in prime locations with trusted real estate experts across the tricity
            region.
          </p>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/properties">Properties</Link></li>
            <li><Link to="/properties?purpose=Buy">Buy</Link></li>
            <li><Link to="/properties?purpose=Rent">Rent</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li><Link to="/about">About</Link></li>
         <li><Link to="/careers">Careers</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms &amp; Conditions</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact Us</h4>
          <ul className="footer-contact">
            <li><IconPhone /> +91 98765 43210</li>
            <li><IconMail /> hello@estatehub.com</li>
            <li><IconLocation /> SCO 123, Sector 17, Chandigarh, India</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>© {new Date().getFullYear()} EstateHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
