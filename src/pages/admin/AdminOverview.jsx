import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAdminProperties } from '../../hooks/useAdminProperties.js';
import { useApp } from '../../context/AppContext.jsx';
import { formatCompactPrice } from '../../utils/format.js';

const SAMPLE_USERS = [
  {
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    joined: 'Jan 2026',
  },
  {
    name: 'Priya Nair',
    email: 'priya.nair@example.com',
    joined: 'Feb 2026',
  },
  {
    name: 'Rohit Malhotra',
    email: 'rohit.malhotra@example.com',
    joined: 'Mar 2026',
  },
  {
    name: 'Simran Kaur',
    email: 'simran.kaur@example.com',
    joined: 'Apr 2026',
  },
  {
    name: 'Kabir Mehta',
    email: 'kabir.mehta@example.com',
    joined: 'May 2026',
  },
];

const FAVORITE_COUNTS = [42, 35, 29, 24, 18, 14, 11];

export default function AdminOverview() {
  const { properties, loading } = useAdminProperties();
  const { favorites } = useApp();

  const mostFavorited = useMemo(() => {
    return properties
      .map((property, index) => ({
        ...property,
        favoriteCount:
          FAVORITE_COUNTS[index % FAVORITE_COUNTS.length] +
          (favorites.includes(property.id) ? 1 : 0),
      }))
      .sort((a, b) => b.favoriteCount - a.favoriteCount)
      .slice(0, 5);
  }, [properties, favorites]);

  const totalFavorites = useMemo(() => {
    if (loading) return 0;

    return (
      properties.reduce(
        (total, property, index) =>
          total +
          FAVORITE_COUNTS[index % FAVORITE_COUNTS.length],
        0
      ) + favorites.length
    );
  }, [properties, favorites, loading]);

  return (
    <div className="admin-overview">

      {/* Summary */}
      <div className="admin-summary-grid">

        <div className="card admin-summary-card">
          <span>Total Properties</span>
          <strong>{loading ? '—' : properties.length}</strong>
        </div>

        <div className="card admin-summary-card">
          <span>Registered Users</span>
          <strong>{SAMPLE_USERS.length}</strong>
        </div>

        <div className="card admin-summary-card">
          <span>Total Favorites</span>
          <strong>{loading ? '—' : totalFavorites}</strong>
        </div>

      </div>

      {/* Main Dashboard */}
      <div className="admin-dashboard-grid">

        {/* Most Favorited Properties */}
        <section className="card admin-dashboard-card">

          <div className="admin-card-heading">
            <div>
              <h2>Most Favorited Properties</h2>
              <p>
                Properties receiving the highest number of saved favorites.
              </p>
            </div>

            <Link to="/properties">
              View Listings
            </Link>
          </div>

          {loading ? (
            <p>Loading property activity...</p>
          ) : mostFavorited.length === 0 ? (
            <p>No properties available.</p>
          ) : (
            <div className="admin-favorite-list">

              {mostFavorited.map((property, index) => (
                <div
                  className="admin-favorite-item"
                  key={property.id}
                >
                  <span className="admin-rank">
                    {index + 1}
                  </span>

                  <img
                    src={property.images?.[0]}
                    alt={property.title}
                  />

                  <div>
                    <strong>{property.title}</strong>

                    <span>
                      {property.locality}, {property.city}
                    </span>

                    <span>
                      {formatCompactPrice(property.price)}
                    </span>
                  </div>

                  <b>
                    {property.favoriteCount}
                    <small> saves</small>
                  </b>
                </div>
              ))}

            </div>
          )}

        </section>

        {/* Recent Users */}
        <section className="card admin-dashboard-card">

          <div className="admin-card-heading">
            <div>
              <h2>Recent Users</h2>
              <p>
                Recently registered EstateHub accounts.
              </p>
            </div>

            <Link to="/admin/users">
              View All
            </Link>
          </div>

          <div className="admin-user-list">

            {SAMPLE_USERS.slice(0, 4).map((entry) => (
              <div
                className="admin-user-item"
                key={entry.email}
              >
                <span className="admin-user-avatar">
                  {entry.name.charAt(0)}
                </span>

                <div>
                  <strong>{entry.name}</strong>
                  <span>{entry.email}</span>
                </div>

                <small>{entry.joined}</small>
              </div>
            ))}

          </div>

        </section>

      </div>

      {/* Platform Insights */}
      <section className="card admin-dashboard-card admin-quick-actions">

        <div className="admin-card-heading">
          <div>
            <h2>Platform Insights</h2>
            <p>
              Quickly access EstateHub activity and public information.
            </p>
          </div>
        </div>

        <div className="admin-action-grid">

          <Link
            to="/properties"
            className="admin-action-card"
          >
            <strong>Property Listings</strong>
            <span>
              View all properties currently displayed on EstateHub.
            </span>
          </Link>

          <Link
            to="/admin/users"
            className="admin-action-card"
          >
            <strong>User Activity</strong>
            <span>
              Review registered user information and activity.
            </span>
          </Link>

          <Link
            to="/favorites"
            className="admin-action-card"
          >
            <strong>Favorite Properties</strong>
            <span>
              View the favorites available in the current account.
            </span>
          </Link>

        </div>

      </section>

    </div>
  );
}