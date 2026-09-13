import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import {
  IconMail,
  IconUser,
  IconPhone,
  IconEye,
} from '../components/icons.jsx';
import './Auth.css';

export default function Signup() {
  const { register } = useApp();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    password: '',
    confirmPassword: '',
    agreed: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Remove the error for the field while the user corrects it.
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  }

  function validate() {
    const nextErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = 'Full name is required';
    } else if (form.name.trim().length < 2) {
      nextErrors.name = 'Enter your full name';
    }

    if (!form.email.trim()) {
      nextErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      nextErrors.email = 'Enter a valid email address';
    }

    const phone = form.phone.replace(/\D/g, '');

    if (!phone) {
      nextErrors.phone = 'Phone number is required';
    } else if (phone.length !== 10) {
      nextErrors.phone = 'Enter a valid 10-digit phone number';
    }

    if (!form.city.trim()) {
      nextErrors.city = 'City is required';
    }

    if (!form.password) {
      nextErrors.password = 'Password is required';
    } else if (form.password.length < 6) {
      nextErrors.password =
        'Password must be at least 6 characters';
    }

    if (!form.confirmPassword) {
      nextErrors.confirmPassword =
        'Please confirm your password';
    } else if (form.confirmPassword !== form.password) {
      nextErrors.confirmPassword =
        'Passwords do not match';
    }

    if (!form.agreed) {
      nextErrors.agreed =
        'Please accept the Terms & Conditions';
    }

    return nextErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const result = register({
      name: form.name,
      email: form.email,
      phone: form.phone.replace(/\D/g, ''),
      city: form.city,
      password: form.password,
    });

    if (!result.success) {
      setErrors({
        email: result.message || 'Unable to create account',
      });
      return;
    }

    // New users always enter their normal profile.
    navigate('/profile', { replace: true });
  }

  return (
    <div className="auth-page">
      <div className="auth-split auth-split-reverse">

        {/* FORM */}
        <div className="auth-form-panel">
          <h1>Create Account</h1>

          <p>
            Join EstateHub and make your property search
            easier.
          </p>

          <form onSubmit={handleSubmit} noValidate>

            {/* NAME */}
            <div className="field">
              <label htmlFor="signup-name">
                Full Name
              </label>

              <div className="field-with-icon">
                <IconUser width="16" height="16" />

                <input
                  id="signup-name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.name)}
                  autoComplete="name"
                />
              </div>

              {errors.name && (
                <span className="field-error">
                  {errors.name}
                </span>
              )}
            </div>

            {/* EMAIL */}
            <div className="field">
              <label htmlFor="signup-email">
                Email Address
              </label>

              <div className="field-with-icon">
                <IconMail />

                <input
                  id="signup-email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.email)}
                  autoComplete="email"
                />
              </div>

              {errors.email && (
                <span className="field-error">
                  {errors.email}
                </span>
              )}
            </div>

            {/* PHONE */}
            <div className="field">
              <label htmlFor="signup-phone">
                Phone Number
              </label>

              <div className="field-with-icon">
                <IconPhone />

                <input
                  id="signup-phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter your 10-digit phone number"
                  value={form.phone}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.phone)}
                  autoComplete="tel"
                  inputMode="numeric"
                  maxLength="10"
                />
              </div>

              {errors.phone && (
                <span className="field-error">
                  {errors.phone}
                </span>
              )}
            </div>

            {/* CITY */}
            <div className="field">
              <label htmlFor="signup-city">
                City
              </label>

              <input
                id="signup-city"
                name="city"
                type="text"
                placeholder="e.g. Chandigarh"
                value={form.city}
                onChange={handleChange}
                aria-invalid={Boolean(errors.city)}
                autoComplete="address-level2"
              />

              {errors.city && (
                <span className="field-error">
                  {errors.city}
                </span>
              )}
            </div>

            {/* PASSWORD */}
            <div className="field">
              <label htmlFor="signup-password">
                Password
              </label>

              <div className="field-with-icon">
                <input
                  id="signup-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a password"
                  value={form.password}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.password)}
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className="field-icon-btn"
                  onClick={() =>
                    setShowPassword((value) => !value)
                  }
                  aria-label={
                    showPassword
                      ? 'Hide password'
                      : 'Show password'
                  }
                >
                  <IconEye open={showPassword} />
                </button>
              </div>

              <small className="auth-help-text">
                Use at least 6 characters.
              </small>

              {errors.password && (
                <span className="field-error">
                  {errors.password}
                </span>
              )}
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="field">
              <label htmlFor="signup-confirm">
                Confirm Password
              </label>

              <input
                id="signup-confirm"
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                placeholder="Re-enter your password"
                value={form.confirmPassword}
                onChange={handleChange}
                aria-invalid={Boolean(errors.confirmPassword)}
                autoComplete="new-password"
              />

              {errors.confirmPassword && (
                <span className="field-error">
                  {errors.confirmPassword}
                </span>
              )}
            </div>

            {/* TERMS */}
            <label className="filter-checkbox auth-terms">
              <input
                type="checkbox"
                name="agreed"
                checked={form.agreed}
                onChange={handleChange}
              />

              <span>
                I agree to the{' '}
                <Link to="/terms">
                  Terms & Conditions
                </Link>
              </span>
            </label>

            {errors.agreed && (
              <span className="field-error">
                {errors.agreed}
              </span>
            )}

            {/* SUBMIT */}
            <button
              type="submit"
              className="btn btn-primary btn-block"
              style={{ marginTop: 'var(--space-3)' }}
            >
              Create Account
            </button>
          </form>

          <p className="auth-switch">
            Already have an account?{' '}
            <Link to="/login">Sign In</Link>
          </p>
        </div>

        {/* VISUAL */}
        <div
          className="auth-visual"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1200&auto=format&fit=crop')",
          }}
        >
          <div className="auth-visual-overlay">
            <h2>
              Start your search for a place that
              feels like home.
            </h2>

            <ul>
              <li>Save your favorite listings</li>
              <li>Track recently viewed homes</li>
              <li>Compare properties easily</li>
              <li>Discover homes in your city</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}