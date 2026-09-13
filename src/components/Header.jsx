import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import {
  IconHome,
  IconHeart,
  IconUser,
  IconLogout,
} from './icons.jsx';
import './Header.css';

const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/properties', label: 'Properties' },
  { to: '/compare', label: 'Compare' },
  { to: '/emi-calculator', label: 'EMI Calculator' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const { user, logout, favorites } = useApp();
  const navigate = useNavigate();

  function closeMenus() {
    setMenuOpen(false);
    setAccountOpen(false);
  }

  function handleLogout() {
    logout();
    closeMenus();
    navigate('/', { replace: true });
  }

  function handleAccountClick() {
    if (user?.role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/profile');
    }

    closeMenus();
  }

  return (
    <header className="site-header">
      <div className="container header-inner">

        {/* BRAND */}
        <NavLink
          to="/"
          className="brand"
          onClick={closeMenus}
        >
          <IconHome />

          <span>
            Estate<em>Hub</em>
          </span>
        </NavLink>

        {/* MAIN NAVIGATION */}
        <nav
          className={`main-nav ${menuOpen ? 'open' : ''}`}
          aria-label="Primary navigation"
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
              onClick={closeMenus}
            >
              {link.label}
            </NavLink>
          ))}

          {/* MOBILE ACCOUNT LINKS */}
          <div className="nav-actions-mobile">

            <NavLink
              to="/favorites"
              className="nav-link"
              onClick={closeMenus}
            >
              Favorites
              {favorites.length > 0 &&
                ` (${favorites.length})`}
            </NavLink>

            {user ? (
              <>
                <button
                  type="button"
                  className="nav-link nav-button"
                  onClick={handleAccountClick}
                >
                  {user.role === 'admin'
                    ? 'Admin Dashboard'
                    : 'My Profile'}
                </button>

                <button
                  type="button"
                  className="nav-link nav-button"
                  onClick={handleLogout}
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="nav-link"
                  onClick={closeMenus}
                >
                  Sign In
                </NavLink>

                <NavLink
                  to="/signup"
                  className="nav-link"
                  onClick={closeMenus}
                >
                  Create Account
                </NavLink>
              </>
            )}

          </div>
        </nav>

        {/* DESKTOP ACTIONS */}
        <div className="header-actions">

          {/* FAVORITES */}
          <NavLink
            to="/favorites"
            className="icon-link"
            aria-label="View favorite properties"
            onClick={() => setAccountOpen(false)}
          >
            <IconHeart />

            {favorites.length > 0 && (
              <span className="icon-badge">
                {favorites.length}
              </span>
            )}
          </NavLink>

          {user ? (
            /* LOGGED-IN ACCOUNT */
            <div className="account-wrapper">

              <button
                type="button"
                className="account-button"
                onClick={() =>
                  setAccountOpen((open) => !open)
                }
                aria-expanded={accountOpen}
                aria-haspopup="true"
              >
                <span className="account-avatar">
                  {user.name?.charAt(0).toUpperCase()}
                </span>

                <span className="account-info">
                  <strong>
                    {user.name?.split(' ')[0]}
                  </strong>

                  <small>
                    {user.role === 'admin'
                      ? 'Administrator'
                      : 'My Account'}
                  </small>
                </span>

                <span
                  className={`account-arrow ${
                    accountOpen ? 'open' : ''
                  }`}
                >
                  ▾
                </span>
              </button>

              {accountOpen && (
                <div className="account-dropdown">

                  <div className="account-dropdown-header">
                    <span className="account-avatar large">
                      {user.name
                        ?.charAt(0)
                        .toUpperCase()}
                    </span>

                    <div>
                      <strong>{user.name}</strong>
                      <small>{user.email}</small>
                    </div>
                  </div>

                  <div className="account-dropdown-divider" />

                  {user.role === 'admin' ? (
                    <button
                      type="button"
                      className="account-dropdown-item"
                      onClick={() =>
                        navigate('/admin')
                      }
                    >
                      <IconUser />
                      <span>Admin Dashboard</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="account-dropdown-item"
                      onClick={() =>
                        navigate('/profile')
                      }
                    >
                      <IconUser />
                      <span>My Profile</span>
                    </button>
                  )}

                  <button
                    type="button"
                    className="account-dropdown-item"
                    onClick={() =>
                      navigate('/favorites')
                    }
                  >
                    <IconHeart />
                    <span>
                      Favorite Properties
                      {favorites.length > 0 &&
                        ` (${favorites.length})`}
                    </span>
                  </button>

                  <div className="account-dropdown-divider" />

                  <button
                    type="button"
                    className="account-dropdown-item logout-item"
                    onClick={handleLogout}
                  >
                    <IconLogout />
                    <span>Log Out</span>
                  </button>

                </div>
              )}
            </div>
          ) : (
            /* LOGGED-OUT ACTIONS */
            <div className="auth-header-actions">

              <NavLink
                to="/login"
                className="header-signin"
              >
                Sign In
              </NavLink>

              <NavLink
                to="/signup"
                className="btn btn-navy btn-sm"
              >
                Create Account
              </NavLink>

            </div>
          )}

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            className="menu-toggle"
            onClick={() => {
              setMenuOpen((open) => !open);
              setAccountOpen(false);
            }}
            aria-expanded={menuOpen}
            aria-label="Toggle navigation menu"
          >
            <span />
            <span />
            <span />
          </button>

        </div>
      </div>
    </header>
  );
}