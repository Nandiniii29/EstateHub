import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useProperties } from '../../hooks/useProperties.js';
import { useApp } from '../../context/AppContext.jsx';
import PropertyList from '../../components/PropertyList.jsx';

export default function ProfileFavoritesTab() {
  const { properties } = useProperties();
  const { favorites, toggleFavorite, compareIds, toggleCompare } = useApp();

  const favoriteProperties = useMemo(
    () => properties.filter((property) => favorites.includes(property.id)),
    [properties, favorites],
  );

  return (
    <div className="card profile-section-card">
      <h2>Your Favorites</h2>
      {favoriteProperties.length === 0 ? (
        <p>
          No favorites saved yet. <Link to="/properties">Browse properties</Link> and tap the heart icon to save
          one here.
        </p>
      ) : (
        <PropertyList
          properties={favoriteProperties}
          favorites={favorites}
          onFavorite={toggleFavorite}
          compareIds={compareIds}
          onCompare={toggleCompare}
        />
      )}

    </div>
  );
}
