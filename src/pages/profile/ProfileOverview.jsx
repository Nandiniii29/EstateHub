import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext.jsx';
import { IconHeart, IconUser } from '../../components/icons.jsx';

export default function ProfileOverview() {
  const { user, favorites, recentlyViewed } = useApp();

  if (!user) {
    return null;
  }

  const firstLetter = user.name?.charAt(0).toUpperCase() || 'U';

  return (
    <div className="profile-overview">

      {/* PROFILE HEADER */}
      <section className="card profile-welcome-card">
        <div className="profile-avatar">
          {firstLetter}
        </div>

        <div className="profile-welcome-content">
          <span className="profile-eyebrow">
            My Account
          </span>

          <h2>
            Welcome, {user.name?.split(' ')[0]}
          </h2>

          <p>
            Manage your EstateHub account and keep track
            of your property activity.
          </p>
        </div>

        <Link
          to="/profile/settings"
          className="btn btn-primary"
        >
          Edit Profile
        </Link>
      </section>

      {/* ACCOUNT INFORMATION */}
      <section className="card profile-section-card">
        <div className="profile-section-heading">
          <div>
            <span className="profile-eyebrow">
              Personal Information
            </span>

            <h3>Account Details</h3>
          </div>

          <IconUser />
        </div>

        <div className="profile-details-grid">

          <div className="profile-detail">
            <span>Full Name</span>
            <strong>{user.name || 'Not provided'}</strong>
          </div>

          <div className="profile-detail">
            <span>Email Address</span>
            <strong>{user.email || 'Not provided'}</strong>
          </div>

          <div className="profile-detail">
            <span>Phone Number</span>
            <strong>
              {user.phone || 'Not provided'}
            </strong>
          </div>

          <div className="profile-detail">
            <span>City</span>
            <strong>
              {user.city || 'Not provided'}
            </strong>
          </div>

          <div className="profile-detail">
            <span>Account Type</span>
            <strong className="profile-role">
              {user.role === 'admin'
                ? 'Administrator'
                : 'Property Seeker'}
            </strong>
          </div>

          <div className="profile-detail">
            <span>Member Since</span>
            <strong>
              {user.joined || 'Recently joined'}
            </strong>
          </div>

        </div>
      </section>

      {/* ACTIVITY */}
      <section className="profile-stats-grid">

        <Link
          to="/favorites"
          className="card profile-stat-card"
        >
          <div className="profile-stat-icon">
            <IconHeart />
          </div>

          <div>
            <span>Saved Properties</span>
            <strong>{favorites.length}</strong>
            <small>
              View your favorite listings
            </small>
          </div>
        </Link>

        <div className="card profile-stat-card">
          <div className="profile-stat-icon">
            <IconUser />
          </div>

          <div>
            <span>Recently Viewed</span>
            <strong>{recentlyViewed.length}</strong>
            <small>
              Properties you viewed recently
            </small>
          </div>
        </div>

      </section>

      {/* ACCOUNT ACTIONS */}
      <section className="card profile-section-card">
        <div className="profile-section-heading">
          <div>
            <span className="profile-eyebrow">
              Account
            </span>

            <h3>Manage Your Account</h3>
          </div>
        </div>

        <div className="profile-action-grid">

          <Link
            to="/profile/settings"
            className="profile-action-card"
          >
            <strong>Edit Profile</strong>
            <span>
              Update your name, phone number and city.
            </span>
          </Link>

          <Link
            to="/favorites"
            className="profile-action-card"
          >
            <strong>Favorite Properties</strong>
            <span>
              View the properties you have saved.
            </span>
          </Link>

          <Link
            to="/properties"
            className="profile-action-card"
          >
            <strong>Explore Properties</strong>
            <span>
              Browse available properties on EstateHub.
            </span>
          </Link>

        </div>
      </section>

    </div>
  );
}