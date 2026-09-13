import PropertyCard from './PropertyCard.jsx';
import './PropertyList.css';

// Renders a grid of PropertyCards. All shared state (favorites, EMI modal)
// is lifted to the parent page and passed down through here — a simple,
// explainable example of prop drilling for two levels.
export default function PropertyList({ properties, favorites, onFavorite, compareIds, onCompare, emptyMessage }) {
  if (properties.length === 0) {
    return (
      <div className="property-list-empty">
        <p>{emptyMessage || 'No properties match your search right now.'}</p>
      </div>
    );
  }

  return (
    <div className="property-grid">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          isFavorite={favorites.includes(property.id)}
          onFavorite={onFavorite}
          compareIds={compareIds}
          onCompare={onCompare}
        />
      ))}
    </div>
  );
}
