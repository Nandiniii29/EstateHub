import { NavLink, Outlet } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { IconUser } from '../components/icons.jsx';
import './Profile.css';

// Layout route for /profile, /profile/settings and /profile/favorites.
// The matched child route renders inside <Outlet />.
export default function Profile() {
  const { user } = useApp();

  return (
    <div className="simple-page">
      <div className="container profile-layout">
        <aside className="profile-sidebar card">
          <div className="profile-avatar">
            <IconUser width="28" height="28" />
          </div>
          <h3>{user?.name}</h3>
          <p>{user?.email}</p>
          {user?.role === 'admin' && <span className="badge badge-navy">Admin</span>}

          <nav className="profile-nav">
            <NavLink to="/profile" end className={({ isActive }) => (isActive ? 'active' : '')}>
              Overview
            </NavLink>
            <NavLink to="/profile/favorites" className={({ isActive }) => (isActive ? 'active' : '')}>
              Favorites
            </NavLink>
            <NavLink to="/profile/settings" className={({ isActive }) => (isActive ? 'active' : '')}>
              Settings
            </NavLink>
          </nav>
        </aside>

        <div className="profile-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
