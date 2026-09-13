import { useEffect } from 'react';
import { IconClose } from './icons.jsx';
import './Modal.css';

// A generic modal shell used by the image gallery and (optionally) the EMI
// calculator when opened from a property card instead of navigating away.
export default function Modal({ title, onClose, children, wide = false }) {
  useEffect(() => {
    function handleKey(event) {
      if (event.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal-panel ${wide ? 'modal-wide' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          {title && <h3>{title}</h3>}
          <button type="button" className="modal-close" onClick={onClose} aria-label="Close dialog">
            <IconClose />
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
