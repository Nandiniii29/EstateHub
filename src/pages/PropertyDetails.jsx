import { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProperties } from '../hooks/useProperties.js';
import { useApp } from '../context/AppContext.jsx';
import Loading from '../components/Loading.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import AmenityIcon from '../components/AmenityIcon.jsx';
import Modal from '../components/Modal.jsx';
import PropertyList from '../components/PropertyList.jsx';
import { formatCurrency, formatArea } from '../utils/format.js';
import { IconBed, IconBath, IconArea, IconType, IconHeart, IconPhone, IconScale, IconCheck } from '../components/icons.jsx';
import './PropertyDetails.css';

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { properties, loading, error } = useProperties();
  const { favorites, toggleFavorite, addRecentlyViewed, compareIds, toggleCompare } = useApp();
  const [activeImage, setActiveImage] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState(false);

  const property = useMemo(() => properties.find((p) => p.id === id), [properties, id]);

  // useEffect: record this property in "recently viewed" once it loads.
  useEffect(() => {
    if (property) addRecentlyViewed(property.id);
  }, [property, addRecentlyViewed]);

  const similarProperties = useMemo(() => {
    if (!property) return [];
    return properties
      .filter((p) => p.id !== property.id && p.city === property.city && p.type === property.type)
      .slice(0, 3);
  }, [properties, property]);

  if (loading) return <div className="container"><Loading label="Loading property…" /></div>;
  if (error && !property) return <div className="container"><ErrorMessage message="Could not load this property." /></div>;
  if (!property) {
    return (
      <div className="container property-not-found">
        <h2>Property not found</h2>
        <p>This listing may have been removed.</p>
        <Link to="/properties" className="btn btn-navy">Browse Properties</Link>
      </div>
    );
  }

  const isFavorite = favorites.includes(property.id);

  return (
    <div className="property-details-page">
      <div className="container">
        <div className="pd-gallery">
          <div className="pd-gallery-main">
            <img src={property.images[activeImage]} alt={property.title} />
          </div>
          <div className="pd-gallery-thumbs">
            {property.images.slice(0, 3).map((image, index) => (
              <button
                key={image}
                type="button"
                className={`pd-thumb ${activeImage === index ? 'active' : ''}`}
                onClick={() => setActiveImage(index)}
              >
                <img src={image} alt={`${property.title} thumbnail ${index + 1}`} />
              </button>
            ))}
            <button type="button" className="pd-thumb pd-view-all" onClick={() => setGalleryOpen(true)}>
              View All Photos
            </button>
          </div>
        </div>

        <div className="pd-layout">
          <div className="pd-main">
            <div className="pd-heading-row">
              <div>
                <p className="property-purpose">{property.purpose === 'Rent' ? 'For Rent' : 'For Sale'} · {property.type}</p>
                <h1>{property.title}</h1>
                <p className="pd-location">{property.address}</p>
              </div>
              <div className="pd-heading-actions">
                <button type="button" className={`btn btn-ghost btn-sm ${compareIds.includes(property.id) ? 'compare-active' : ''}`} onClick={() => { toggleCompare(property.id); navigate('/compare'); }}>{compareIds.includes(property.id) ? 'Compared' : 'Compare'}</button>
                <button
                type="button"
                className={`favorite-btn favorite-btn-lg ${isFavorite ? 'active' : ''}`}
                onClick={() => toggleFavorite(property.id)}
                aria-pressed={isFavorite}
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <IconHeart filled={isFavorite} />
                </button>
              </div>
            </div>

            <p className="pd-price">{formatCurrency(property.price)}{property.purpose === 'Rent' && <span> / month</span>}</p>

            <div className="pd-specs">
              {property.beds > 0 && <span><IconBed /> {property.beds} Beds</span>}
              {property.baths > 0 && <span><IconBath /> {property.baths} Baths</span>}
              <span><IconArea /> {formatArea(property.area)}</span>
              <span><IconType /> {property.type}</span>
            </div>

            <section className="pd-section">
              <h2>About This Property</h2>
              <p>{property.description}</p>
            </section>

            <section className="pd-section pd-details-highlights">
              <div>
                <h2>Property Details</h2>
                <dl className="pd-detail-list">
                  <div><dt>Property Type</dt><dd>{property.type}</dd></div>
                  <div><dt>Bedrooms</dt><dd>{property.beds || 'N/A'}</dd></div>
                  <div><dt>Bathrooms</dt><dd>{property.baths || 'N/A'}</dd></div>
                  <div><dt>Area</dt><dd>{formatArea(property.area)}</dd></div>
                  <div><dt>Floor</dt><dd>{property.floor}</dd></div>
                  <div><dt>Furnishing</dt><dd>{property.furnishing}</dd></div>
                  <div><dt>Possession</dt><dd>{property.possession}</dd></div>
                </dl>
              </div>
              <div>
                <h2>Highlights</h2>
                <ul className="pd-highlight-list">
                  {property.highlights.map((highlight) => (
                    <li key={highlight}><IconCheck /> {highlight}</li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="pd-section">
              <h2>Amenities</h2>
              <div className="amenity-grid">
                {property.amenities.map((amenity) => (
                  <AmenityIcon key={amenity} name={amenity} />
                ))}
              </div>
            </section>
          </div>

          <aside className="pd-sidebar" id="contact">
            <div className="card pd-contact-card">
              <h3>Interested in this property?</h3>
              <p>Speak with a property expert.</p>
              <a href="tel:+919876543210" className="btn btn-navy btn-block">
                <IconPhone /> +91 98765 43210
              </a>

              <hr />

              <h3>Need financing?</h3>
              <p>Calculate your estimated monthly payment.</p>
              <button type="button" className="btn btn-ghost btn-block" onClick={() => navigate(`/emi-calculator?price=${property.price}`)}>
                <IconScale /> EMI Calculator
              </button>
            </div>
          </aside>
        </div>

        {similarProperties.length > 0 && (
          <section className="pd-section">
            <h2>Similar Properties</h2>
            <PropertyList
              properties={similarProperties}
              favorites={favorites}
              onFavorite={toggleFavorite}
              compareIds={compareIds}
              onCompare={toggleCompare}
            />
          </section>
        )}
      </div>

      {galleryOpen && (
        <Modal title={property.title} onClose={() => setGalleryOpen(false)} wide>
          <div className="pd-full-gallery">
            {property.images.map((image, index) => (
              <img key={image} src={image} alt={`${property.title} photo ${index + 1}`} />
            ))}
          </div>
        </Modal>
      )}

    </div>
  );
}
