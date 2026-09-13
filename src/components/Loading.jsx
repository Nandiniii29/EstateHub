import './Loading.css';

export default function Loading({ label = 'Loading properties…' }) {
  return (
    <div className="loading-state" role="status" aria-live="polite">
      <span className="loading-spinner" />
      <p>{label}</p>
    </div>
  );
}
