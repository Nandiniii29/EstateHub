import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="not-found-page">
      <div className="container not-found-content">
        <span className="not-found-code">404</span>
        <h1>This address doesn&apos;t exist.</h1>
        <p>The page you&apos;re looking for may have been moved or the listing is no longer available.</p>
        <div className="not-found-actions">
          <Link to="/" className="btn btn-primary">Back to Home</Link>
          <Link to="/properties" className="btn btn-ghost">Browse Properties</Link>
        </div>
      </div>
    </div>
  );
}
