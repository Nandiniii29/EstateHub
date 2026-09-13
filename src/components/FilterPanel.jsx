import './FilterPanel.css';

const propertyTypes = ['Apartment', 'Villa', 'Builder Floor', 'Plot', 'Farmhouse', 'Commercial'];
const furnishingOptions = ['Unfurnished', 'Semi Furnished', 'Fully Furnished'];
const bedroomOptions = ['1', '2', '3', '4', '5+'];
const amenityOptions = ['Parking', 'Lift', '24/7 Security', 'Power Backup', 'Gym', 'Swimming Pool', 'Club House', 'Wi-Fi'];

// Controlled filter sidebar. `filters` and `onChange` are owned by the
// PropertiesPage (lifted state) so results stay in sync everywhere.
export default function FilterPanel({ filters, onChange, cities }) {
  function update(patch) {
    onChange({ ...filters, ...patch });
  }

  function toggleInArray(key, value) {
    const current = filters[key] || [];
    const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
    update({ [key]: next });
  }

  return (
    <div className="filter-panel">
      <div className="filter-group">
        <h4>Buy / Rent</h4>
        <div className="filter-pill-row">
          {['All', 'Buy', 'Rent'].map((option) => (
            <button
              key={option}
              type="button"
              className={`filter-pill ${filters.purpose === option ? 'active' : ''}`}
              onClick={() => update({ purpose: option })}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <label htmlFor="filter-city">City</label>
        <select id="filter-city" value={filters.city} onChange={(event) => update({ city: event.target.value })}>
          <option value="All">All Cities</option>
          {cities.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <h4>Property Type</h4>
        <div className="filter-checkbox-list">
          {propertyTypes.map((type) => (
            <label key={type} className="filter-checkbox">
              <input
                type="checkbox"
                checked={filters.types.includes(type)}
                onChange={() => toggleInArray('types', type)}
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <label htmlFor="filter-max-price">Max Price: ₹{Number(filters.maxPrice).toLocaleString('en-IN')}</label>
        <input
          id="filter-max-price"
          type="range"
          min="500000"
          max="40000000"
          step="500000"
          value={filters.maxPrice}
          onChange={(event) => update({ maxPrice: Number(event.target.value) })}
        />
      </div>

      <div className="filter-group">
        <h4>Bedrooms</h4>
        <div className="filter-pill-row">
          {bedroomOptions.map((option) => (
            <button
              key={option}
              type="button"
              className={`filter-pill ${filters.bedrooms === option ? 'active' : ''}`}
              onClick={() => update({ bedrooms: filters.bedrooms === option ? 'Any' : option })}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <h4>Furnishing</h4>
        <div className="filter-checkbox-list">
          {furnishingOptions.map((option) => (
            <label key={option} className="filter-checkbox">
              <input
                type="checkbox"
                checked={filters.furnishing.includes(option)}
                onChange={() => toggleInArray('furnishing', option)}
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <h4>Amenities</h4>
        <div className="filter-checkbox-list">
          {amenityOptions.map((option) => (
            <label key={option} className="filter-checkbox">
              <input
                type="checkbox"
                checked={filters.amenities.includes(option)}
                onChange={() => toggleInArray('amenities', option)}
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="btn btn-ghost btn-block"
        onClick={() =>
          onChange({
            purpose: 'All',
            city: 'All',
            types: [],
            maxPrice: 40000000,
            bedrooms: 'Any',
            furnishing: [],
            amenities: [],
          })
        }
      >
        Clear All Filters
      </button>
    </div>
  );
}
