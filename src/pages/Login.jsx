import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { IconMail, IconEye } from '../components/icons.jsx';
import './Auth.css';

export default function Login() {
  const { login } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    email: '',
    password: '',
    remember: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));

    setLoginError('');
  }

  function validate() {
    const nextErrors = {};

    if (!form.email.trim()) {
      nextErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email.trim())) {
      nextErrors.email = 'Enter a valid email address';
    }

    if (!form.password) {
      nextErrors.password = 'Password is required';
    }

    return nextErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);
    setLoginError('');

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const result = login(
      form.email.trim(),
      form.password
    );

    if (!result.success) {
      setLoginError(
        result.message || 'Invalid email or password.'
      );
      return;
    }

    /*
     * If the user originally tried to open a protected page,
     * send them back there.
     *
     * Admin users can only go to admin routes.
     * Normal users cannot use an admin redirect.
     */
    const requestedPath = location.state?.from;

    if (result.user.role === 'admin') {
      if (
        requestedPath &&
        typeof requestedPath === 'string' &&
        requestedPath.startsWith('/admin')
      ) {
        navigate(requestedPath, { replace: true });
      } else {
        navigate('/admin', { replace: true });
      }

      return;
    }

    /*
     * Normal users always go to their profile.
     */
    if (
      requestedPath &&
      typeof requestedPath === 'string' &&
      !requestedPath.startsWith('/admin')
    ) {
      navigate(requestedPath, { replace: true });
    } else {
      navigate('/profile', { replace: true });
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-split">

        {/* IMAGE SECTION */}
        <div
          className="auth-visual"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop')",
          }}
        >
          <div className="auth-visual-overlay">
            <h2>
              Find a place that feels like home.
            </h2>

            <ul>
              <li>Verified properties</li>
              <li>Trusted agents</li>
              <li>Compare your options</li>
              <li>Save your favorite homes</li>
            </ul>
          </div>
        </div>

        {/* LOGIN FORM */}
        <div className="auth-form-panel">
          <h1>Welcome Back</h1>

          <p>
            Sign in to continue your EstateHub journey.
          </p>

          {loginError && (
            <div
              className="auth-error-box"
              role="alert"
            >
              {loginError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>

            {/* EMAIL */}
            <div className="field">
              <label htmlFor="login-email">
                Email Address
              </label>

              <div className="field-with-icon">
                <IconMail />

                <input
                  id="login-email"
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

            {/* PASSWORD */}
            <div className="field">
              <label htmlFor="login-password">
                Password
              </label>

              <div className="field-with-icon">
                <input
                  id="login-password"
                  name="password"
                  type={
                    showPassword
                      ? 'text'
                      : 'password'
                  }
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.password)}
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  className="field-icon-btn"
                  onClick={() =>
                    setShowPassword(
                      (value) => !value
                    )
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

              {errors.password && (
                <span className="field-error">
                  {errors.password}
                </span>
              )}
            </div>

            {/* OPTIONS */}
            <div className="auth-row">
              <label className="filter-checkbox">
                <input
                  type="checkbox"
                  name="remember"
                  checked={form.remember}
                  onChange={handleChange}
                />
                Remember me
              </label>

              <Link
                to="/contact"
                className="auth-link"
              >
                Forgot password?
              </Link>
            </div>

            {/* SIGN IN */}
            <button
              type="submit"
              className="btn btn-primary btn-block"
            >
              Sign In
            </button>
          </form>

          {/* SIGN UP LINK */}
          <p className="auth-switch">
            Don&apos;t have an account?{' '}
            <Link to="/signup">
              Create an Account
            </Link>
          </p>

          {/* ADMIN INFO */}
          <div className="auth-demo-note">
            <strong>Admin access</strong>
            <span>
              Use the EstateHub administrator account
              configured for this project.
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}