import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import LoginPrompt from './LoginPrompt.jsx';
import { formatCompactPrice, formatArea } from '../utils/format.js';
import { IconHeart, IconBed, IconBath, IconArea, IconScale } from './icons.jsx';
import './PropertyCard.css';

// Displays one property. onFavorite is passed down from PropertiesPage/Home
// (via PropertyList) so the favorite toggle can update shared state without
// PropertyCard needing to know about localStorage or Context directly.
export default function PropertyCard({ property, isFavorite, onFavorite, compareIds = [], onCompare }) {
  const navigate = useNavigate();
  const { user } = useApp();
const [loginPromptOpen, setLoginPromptOpen] = useState(false);
  const {
    id,
    title,
    locality,
    city,
    price,
    purpose,
    beds,
    baths,
    area,
    type,
    images,
    featured,
  } = property;

  return (
    <article className="property-card">
      <div className="property-card-media">
        <Link to={`/property/${id}`} aria-label={`View details for ${title}`}>
          <img src={images[0]} alt={title} loading="lazy" />
        </Link>
        {featured && <span className="badge badge-gold property-badge">Featured</span>}
        <button
          type="button"
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
         onClick={() => {
  if (!user) {
    setLoginPromptOpen(true);
    return;
  }

  onFavorite(id);
}}
          aria-pressed={isFavorite}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <IconHeart filled={isFavorite} />
        </button>
      </div>

      <div className="property-card-body">
        <p className="property-purpose">{purpose === 'Rent' ? 'For Rent' : 'For Sale'} · {type}</p>
        <h3>
          <Link to={`/property/${id}`}>{title}</Link>
        </h3>
        <p className="property-location">{locality}, {city}</p>
        <p className="property-price">{formatCompactPrice(price)}{purpose === 'Rent' && <span> / month</span>}</p>

        <div className="property-specs">
          {beds > 0 && <span><IconBed /> {beds} Beds</span>}
          {baths > 0 && <span><IconBath /> {baths} Baths</span>}
          <span><IconArea /> {formatArea(area)}</span>
        </div>

        <div className="property-actions">
          <Link to={`/property/${id}`} className="btn btn-navy btn-sm">
            View Details
          </Link>
          <button
            type="button"
            className={`btn btn-ghost btn-sm ${compareIds.includes(id) ? 'compare-active' : ''}`}
            onClick={() => {
              onCompare?.(id);
              navigate('/compare');
            }}
          >
            <IconScale /> {compareIds.includes(id) ? 'Compared' : 'Compare'}
          </button>
        </div>
      </div>
      <LoginPrompt
  isOpen={loginPromptOpen}
  onClose={() => setLoginPromptOpen(false)}
  feature="Favorite Properties"
/>
    </article>
  );
}
