import { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconSearch, IconLocation } from './icons.jsx';
import './SearchBar.css';

const propertyTypes = ['All Types', 'Apartment', 'Villa', 'Builder Floor', 'Plot', 'Farmhouse', 'Commercial'];
const budgetRanges = [
  { label: 'Any Budget', min: 0, max: Infinity },
  { label: 'Under ₹50 L', min: 0, max: 5000000 },
  { label: '₹50 L – ₹1 Cr', min: 5000000, max: 10000000 },
  { label: '₹1 Cr – ₹2 Cr', min: 10000000, max: 20000000 },
  { label: 'Above ₹2 Cr', min: 20000000, max: Infinity },
];
const bedroomOptions = ['Any', '1', '2', '3', '4', '5+'];

// The homepage / properties-page search module. `properties` is the full
// dataset it derives location suggestions from (per the "no fixed Popular
// Cities section" requirement). onSearch is called with the built query
// when used inline on the Properties page instead of navigating.
export default function SearchBar({ properties = [], onSearch, initial = {} }) {
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const [purpose, setPurpose] = useState(initial.purpose || 'Buy');
  const [locationQuery, setLocationQuery] = useState(initial.location || '');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [propertyType, setPropertyType] = useState(initial.type || 'All Types');
  const [budget, setBudget] = useState(initial.budget || 'Any Budget');
  const [bedrooms, setBedrooms] = useState(initial.bedrooms || 'Any');

  // Derive the unique set of "City, Locality" labels straight from the data,
  // instead of a hardcoded Popular Cities list.
  const locationOptions = useMemo(() => {
    const unique = new Set();
    properties.forEach((property) => {
      unique.add(property.city);
      unique.add(`${property.locality}, ${property.city}`);
    });
    return Array.from(unique);
  }, [properties]);

  const suggestions = useMemo(() => {
    if (!locationQuery.trim()) return [];
    const q = locationQuery.trim().toLowerCase();
    return locationOptions.filter((option) => option.toLowerCase().includes(q)).slice(0, 6);
  }, [locationQuery, locationOptions]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    const range = budgetRanges.find((b) => b.label === budget) || budgetRanges[0];

    const query = {
      purpose,
      location: locationQuery.trim(),
      type: propertyType,
      budget,
      bedrooms,
      minPrice: range.min,
      maxPrice: range.max,
    };

    if (onSearch) {
      onSearch(query);
      return;
    }

    const params = new URLSearchParams();
    if (query.purpose) params.set('purpose', query.purpose);
    if (query.location) params.set('location', query.location);
    if (query.type && query.type !== 'All Types') params.set('type', query.type);
    if (query.budget && query.budget !== 'Any Budget') params.set('budget', query.budget);
    if (query.bedrooms && query.bedrooms !== 'Any') params.set('bedrooms', query.bedrooms);

    navigate(`/properties?${params.toString()}`);
  }

  return (
    <form className="search-module" onSubmit={handleSubmit}>
      <div className="search-toggle" role="tablist" aria-label="Buy or Rent">
        {['Buy', 'Rent'].map((option) => (
          <button
            key={option}
            type="button"
            role="tab"
            aria-selected={purpose === option}
            className={`toggle-btn ${purpose === option ? 'active' : ''}`}
            onClick={() => setPurpose(option)}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="search-fields">
        <div className="search-field search-field-location" ref={inputRef}>
          <label htmlFor="search-location">Where</label>
          <div className="field-with-icon">
            <IconLocation />
            <input
              id="search-location"
              type="text"
              placeholder="Search city, locality or property"
              value={locationQuery}
              onChange={(event) => {
                setLocationQuery(event.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              autoComplete="off"
            />
          </div>
          {showSuggestions && suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((option) => (
                <li key={option}>
                  <button
                    type="button"
                    onClick={() => {
                      setLocationQuery(option);
                      setShowSuggestions(false);
                    }}
                  >
                    <IconLocation width="14" height="14" />
                    {option}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="search-field">
          <label htmlFor="search-type">Property Type</label>
          <select id="search-type" value={propertyType} onChange={(event) => setPropertyType(event.target.value)}>
            {propertyTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="search-field">
          <label htmlFor="search-budget">Budget</label>
          <select id="search-budget" value={budget} onChange={(event) => setBudget(event.target.value)}>
            {budgetRanges.map((range) => (
              <option key={range.label} value={range.label}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        <div className="search-field">
          <label htmlFor="search-bedrooms">Bedrooms</label>
          <select id="search-bedrooms" value={bedrooms} onChange={(event) => setBedrooms(event.target.value)}>
            {bedroomOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary search-submit">
          <IconSearch />
          Search Properties
        </button>
      </div>
    </form>
  );
}
