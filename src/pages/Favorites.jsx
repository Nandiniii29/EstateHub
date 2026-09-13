import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useProperties } from '../hooks/useProperties.js';
import { useApp } from '../context/AppContext.jsx';
import PropertyList from '../components/PropertyList.jsx';
import Loading from '../components/Loading.jsx';
import { IconHeart } from '../components/icons.jsx';
import './SimplePage.css';

export default function Favorites() {
  const { properties, loading } = useProperties();
  const { favorites, toggleFavorite, compareIds, toggleCompare } = useApp();

  const favoriteProperties = useMemo(
    () => properties.filter((property) => favorites.includes(property.id)),
    [properties, favorites],
  );

  return (
    <div className="simple-page">
      <div className="container">
        <h1>Your Favorites</h1>
        <p>Properties you&apos;ve saved for later.</p>

        {loading && <Loading />}

        {!loading && favoriteProperties.length === 0 && (
          <div className="empty-state">
            <IconHeart width="32" height="32" />
            <h3>No favorites yet</h3>
            <p>Tap the heart icon on any property to save it here for quick access later.</p>
            <Link to="/properties" className="btn btn-navy">Browse Properties</Link>
          </div>
        )}

        {!loading && favoriteProperties.length > 0 && (
          <PropertyList
            properties={favoriteProperties}
            favorites={favorites}
            onFavorite={toggleFavorite}
            compareIds={compareIds}
            onCompare={toggleCompare}
          />
        )}
      </div>

    </div>
  );
}
