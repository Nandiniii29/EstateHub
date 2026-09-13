import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import './LoginPrompt.css';

export default function LoginPrompt({
  isOpen,
  onClose,
  feature = 'this feature',
}) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  function handleLogin() {
    onClose();
    navigate('/login');
  }

  function handleSignup() {
    onClose();
    navigate('/signup');
  }

  const modal = (
    <div
      className="login-prompt-overlay"
      onClick={onClose}
    >
      <div
        className="login-prompt-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="login-prompt-close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        <div className="login-prompt-icon">
          👤
        </div>

        <span className="login-prompt-eyebrow">
          Account Required
        </span>

        <h2>Login to continue</h2>

        <p>
          Please sign in or create an account to use {feature}.
        </p>

        <div className="login-prompt-actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleLogin}
          >
            Sign In
          </button>

          <button
            type="button"
            className="btn btn-outline"
            onClick={handleSignup}
          >
            Create Account
          </button>
        </div>

        <button
          type="button"
          className="login-prompt-cancel"
          onClick={onClose}
        >
          Not now
        </button>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}