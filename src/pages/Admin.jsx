import { NavLink, Outlet } from 'react-router-dom';
import './Admin.css';

export default function Admin() {
  return (
    <div className="simple-page admin-page">
      <div className="container">

        <h1>Admin Dashboard</h1>

        <p>
          Monitor EstateHub properties, user activity and platform
          engagement.
        </p>

        <div className="admin-layout">

          <nav className="admin-nav card">

            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                isActive ? 'active' : ''
              }
            >
              Overview
            </NavLink>

            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                isActive ? 'active' : ''
              }
            >
              Users
            </NavLink>

          </nav>

          <div className="admin-content">
            <Outlet />
          </div>

        </div>

      </div>
    </div>
  );
}