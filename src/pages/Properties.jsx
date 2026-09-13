import { useState, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProperties } from '../hooks/useProperties.js';
import { useApp } from '../context/AppContext.jsx';
import SearchBar from '../components/SearchBar.jsx';
import FilterPanel from '../components/FilterPanel.jsx';
import PropertyList from '../components/PropertyList.jsx';
import Loading from '../components/Loading.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import { IconFilter, IconClose } from '../components/icons.jsx';
import './Properties.css';

const defaultFilters = {
  purpose: 'All',
  city: 'All',
  types: [],
  maxPrice: 40000000,
  bedrooms: 'Any',
  furnishing: [],
  amenities: [],
};

export default function Properties() {
  const { properties, loading, error } = useProperties();
  const { favorites, toggleFavorite, compareIds, toggleCompare } = useApp();
  const [searchParams] = useSearchParams();

  const [searchText, setSearchText] = useState(searchParams.get('location') || '');
  const [filters, setFilters] = useState({
    ...defaultFilters,
    purpose: searchParams.get('purpose') || 'All',
    types: searchParams.get('type') ? [searchParams.get('type')] : [],
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const cities = useMemo(() => Array.from(new Set(properties.map((p) => p.city))).sort(), [properties]);

  // useCallback: a stable handler passed down through PropertyList -> PropertyCard.
  const handleFavorite = useCallback(
    (id) => {
      toggleFavorite(id);
    },
    [toggleFavorite],
  );

  const handleSearch = useCallback((query) => {
    setSearchText(query.location);
    setFilters((prev) => ({
      ...prev,
      purpose: query.purpose,
      types: query.type === 'All Types' ? [] : [query.type],
      maxPrice: query.maxPrice === Infinity ? defaultFilters.maxPrice : query.maxPrice,
      bedrooms: query.bedrooms,
    }));
  }, []);

  // useMemo: only recompute the filtered/sorted list when the source data,
  // filters, or search text actually change.
  const filteredProperties = useMemo(() => {
    const query = searchText.trim().toLowerCase();

    return properties.filter((property) => {
      if (filters.purpose !== 'All' && property.purpose !== filters.purpose) return false;
      if (filters.city !== 'All' && property.city !== filters.city) return false;
      if (filters.types.length > 0 && !filters.types.includes(property.type)) return false;
      if (property.price > filters.maxPrice) return false;
      if (filters.bedrooms !== 'Any') {
        const wanted = filters.bedrooms === '5+' ? 5 : Number(filters.bedrooms);
        if (filters.bedrooms === '5+' ? property.beds < wanted : property.beds !== wanted) return false;
      }
      if (filters.furnishing.length > 0 && !filters.furnishing.includes(property.furnishing)) return false;
      if (filters.amenities.length > 0 && !filters.amenities.every((a) => property.amenities.includes(a))) {
        return false;
      }

      if (query) {
        const haystack = `${property.city} ${property.locality} ${property.title}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }

      return true;
    });
  }, [properties, filters, searchText]);

  return (
    <div className="properties-page">
      <section className="properties-hero">
        <div className="container">
          <h1>Properties</h1>
          <p>Browse verified listings for sale and rent across Chandigarh, Mohali, Panchkula and Zirakpur.</p>
          <SearchBar properties={properties} onSearch={handleSearch} initial={{ location: searchText }} />
        </div>
      </section>

      <div className="container properties-layout">
        <button
          type="button"
          className="mobile-filter-toggle"
          onClick={() => setMobileFiltersOpen(true)}
        >
          <IconFilter /> Filters
        </button>

        <aside className={`properties-sidebar ${mobileFiltersOpen ? 'open' : ''}`}>
          <div className="mobile-filter-header">
            <h3>Filters</h3>
            <button type="button" onClick={() => setMobileFiltersOpen(false)} aria-label="Close filters">
              <IconClose />
            </button>
          </div>
          <FilterPanel filters={filters} onChange={setFilters} cities={cities} />
        </aside>

        <div className="properties-results">
          <p className="results-count">
            {loading ? 'Loading properties…' : `${filteredProperties.length} properties found`}
          </p>

          {loading && <Loading />}
          {error && !loading && <ErrorMessage message="Could not load live listings — showing sample data." />}
          {!loading && (
            <PropertyList
              properties={filteredProperties}
              favorites={favorites}
              onFavorite={handleFavorite}
              compareIds={compareIds}
              onCompare={toggleCompare}
              emptyMessage="No properties match your filters. Try widening your search."
            />
          )}
        </div>
      </div>

    </div>
  );
}
