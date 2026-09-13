import { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';

export default function ProfileSettings() {
  const { user, updateProfile } = useApp();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        city: user.city || '',
      });
    }
  }, [user]);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setMessage('');
    setError('');
  }

  function handleSubmit(e) {
    e.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();
    const phone = form.phone.trim();
    const city = form.city.trim();

    if (!name) {
      setError('Please enter your full name.');
      return;
    }

    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!phone) {
      setError('Please enter your phone number.');
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }

    if (!city) {
      setError('Please enter your city.');
      return;
    }

    updateProfile({
      name,
      email,
      phone,
      city,
    });

    setMessage('Your profile has been updated successfully.');
    setError('');
  }

  function handleReset() {
    if (!user) return;

    setForm({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      city: user.city || '',
    });

    setMessage('');
    setError('');
  }

  if (!user) {
    return null;
  }

  return (
    <div className="profile-settings">

      <div className="profile-settings-header">
        <div>
          <span className="profile-eyebrow">
            Account Settings
          </span>

          <h2>Edit Profile</h2>

          <p>
            Keep your EstateHub account information up to date.
          </p>
        </div>
      </div>

      <form
        className="card profile-settings-form"
        onSubmit={handleSubmit}
      >

        {message && (
          <div className="profile-success-message">
            {message}
          </div>
        )}

        {error && (
          <div className="profile-error-message">
            {error}
          </div>
        )}

        <div className="profile-form-grid">

          <div className="form-group">
            <label htmlFor="profile-name">
              Full Name
            </label>

            <input
              id="profile-name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="profile-email">
              Email Address
            </label>

            <input
              id="profile-email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="profile-phone">
              Phone Number
            </label>

            <input
              id="profile-phone"
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="10-digit phone number"
              maxLength="10"
            />
          </div>

          <div className="form-group">
            <label htmlFor="profile-city">
              City
            </label>

            <input
              id="profile-city"
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="Enter your city"
            />
          </div>

        </div>

        <div className="profile-form-divider" />

        <div className="profile-form-actions">

          <button
            type="button"
            className="btn btn-outline"
            onClick={handleReset}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="btn btn-primary"
          >
            Save Changes
          </button>

        </div>

      </form>

      <div className="card profile-account-note">
        <strong>Account information</strong>

        <p>
          Your profile information is stored with your EstateHub
          account and is used to personalize your experience.
        </p>
      </div>

    </div>
  );
}