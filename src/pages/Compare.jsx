import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useProperties } from '../hooks/useProperties.js';
import { useApp } from '../context/AppContext.jsx';
import { formatCurrency, formatArea } from '../utils/format.js';
import { IconClose, IconScale } from '../components/icons.jsx';
import Loading from '../components/Loading.jsx';
import './Compare.css';

const rows = [
  { label: 'Price', get: (p) => formatCurrency(p.price) + (p.purpose === 'Rent' ? ' / month' : '') },
  { label: 'Type', get: (p) => p.type },
  { label: 'Bedrooms', get: (p) => p.beds || 'N/A' },
  { label: 'Bathrooms', get: (p) => p.baths || 'N/A' },
  { label: 'Area', get: (p) => formatArea(p.area) },
  { label: 'Floor', get: (p) => p.floor },
  { label: 'Furnishing', get: (p) => p.furnishing },
  { label: 'Possession', get: (p) => p.possession },
  { label: 'Amenities', get: (p) => p.amenities.join(', ') },
];

export default function Compare() {
  const { properties, loading } = useProperties();
  const { compareIds, toggleCompare, clearCompare } = useApp();

  const selectedProperties = useMemo(
    () => compareIds.map((id) => properties.find((p) => p.id === id)).filter(Boolean),
    [compareIds, properties],
  );

  return (
    <div className="simple-page compare-page">
      <div className="container">
        <div className="compare-heading">
          <div>
            <p className="eyebrow"><IconScale /> Side-by-side comparison</p>
            <h1>Compare Properties</h1>
            <p>Choose <strong>Compare</strong> on any property card to add it here. You can compare up to 4 properties.</p>
          </div>
          {selectedProperties.length > 0 && (
            <button type="button" className="btn btn-ghost btn-sm" onClick={clearCompare}>Clear comparison</button>
          )}
        </div>

        {loading && <Loading />}

        {!loading && selectedProperties.length === 0 && (
          <div className="empty-state compare-empty">
            <IconScale width="36" height="36" />
            <h3>No properties selected</h3>
            <p>Go to Properties and click the Compare button beside View Details on the listings you want to evaluate.</p>
            <Link to="/properties" className="btn btn-navy">Browse Properties</Link>
          </div>
        )}

        {!loading && selectedProperties.length > 0 && (
          <div className="compare-table-wrap">
            <table className="compare-table">
              <thead>
                <tr>
                  <th className="compare-label-cell">Property</th>
                  {selectedProperties.map((property) => (
                    <th key={property.id}>
                      <div className="compare-card-head">
                        <div className="compare-image-wrap">
                          <img src={property.images[0]} alt={property.title} />
                          <button type="button" className="compare-remove" onClick={() => toggleCompare(property.id)} aria-label={`Remove ${property.title}`}>
                            <IconClose />
                          </button>
                        </div>
                        <strong>{property.title}</strong>
                        <span>{property.locality}, {property.city}</span>
                        <Link to={`/property/${property.id}`} className="compare-view-link">View Details</Link>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    {selectedProperties.map((property) => <td key={property.id}>{row.get(property)}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
