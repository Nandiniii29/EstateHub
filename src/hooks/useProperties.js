import { useState, useEffect } from 'react';
import { fallbackProperties } from '../data/fallbackProperties.js';

// Fetches public/properties.json once and shares the loading/error pattern
// across every page that needs the property list (Home, Properties,
// PropertyDetails, Favorites, Compare, Admin).
export function useProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    async function loadProperties() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/properties.json');
        if (!response.ok) throw new Error('Failed to load properties');
        const data = await response.json();
        if (!isCancelled) setProperties(data);
      } catch (err) {
        if (!isCancelled) {
          setError(err.message || 'Something went wrong');
          setProperties(fallbackProperties);
        }
      } finally {
        if (!isCancelled) setLoading(false);
      }
    }

    loadProperties();

    return () => {
      isCancelled = true;
    };
  }, []);

  return { properties, loading, error };
}
