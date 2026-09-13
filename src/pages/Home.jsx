import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useProperties } from '../hooks/useProperties.js';
import { useApp } from '../context/AppContext.jsx';
import SearchBar from '../components/SearchBar.jsx';
import PropertyList from '../components/PropertyList.jsx';
import Loading from '../components/Loading.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import {
  IconShield,
  IconAgents,
  IconLocation,
  IconScale,
  IconArrowRight,
  IconHome as IconBuilding,
  IconType
} from '../components/icons.jsx';
import './Home.css';

const categories = [
  {
    type: 'Apartment',
    icon: IconBuilding,
    description: 'Modern flats in gated societies'
  },
  {
    type: 'Villa',
    icon: IconType,
    description: 'Independent luxury villas'
  },
  {
    type: 'Plot',
    icon: IconLocation,
    description: 'Residential plots, clear title'
  },
  {
    type: 'Commercial',
    icon: IconScale,
    description: 'Offices and retail spaces'
  },
];

const whyChoose = [
  {
    icon: IconShield,
    title: 'Verified Listings',
    description:
      'Every property is checked for authentic ownership and accurate details.'
  },
  {
    icon: IconAgents,
    title: 'Trusted Agents',
    description:
      'Work with experienced agents who know the local market inside out.'
  },
  {
    icon: IconLocation,
    title: 'Prime Locations',
    description:
      'Curated properties in the most connected and sought-after localities.'
  },
  {
    icon: IconScale,
    title: 'Fair Pricing',
    description:
      'Transparent pricing with EMI tools to help you plan confidently.'
  },
];

export default function Home() {
  const { properties, loading, error } = useProperties();
  const {
    favorites,
    toggleFavorite,
    compareIds,
    toggleCompare
  } = useApp();

  const featured = useMemo(
    () => properties.filter((property) => property.featured).slice(0, 6),
    [properties]
  );

  return (
    <>
      <section className="hero">
        <div className="hero-overlay" />

        <div className="container hero-content">
          <h1>
            Find a place that feels <span>like home.</span>
          </h1>

          <p>
            Discover verified properties in prime locations, selected to match
            the way you want to live.
          </p>

          <div className="hero-cta">
            <Link to="/properties" className="btn btn-primary">
              Explore Properties
            </Link>
          </div>

          <div className="hero-search">
            <SearchBar properties={properties} />
          </div>

          <div className="hero-stats">
            <div>
              <IconShield />
              Verified Listings
            </div>

            <div>
              <IconAgents />
              Trusted Agents
            </div>

            <div>
              <IconLocation />
              Prime Locations
            </div>

            <div>
              <IconScale />
              Best Prices
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header row-header">
            <div>
              <h2>Featured Properties</h2>

              <p>
                Hand-picked homes currently generating the most interest from
                buyers and tenants.
              </p>
            </div>

            <Link to="/properties" className="section-link">
              View all properties <IconArrowRight />
            </Link>
          </div>

          {loading && <Loading />}

          {error && !loading && (
            <ErrorMessage message="Could not load live listings — showing sample data." />
          )}

          {!loading && (
            <PropertyList
              properties={featured}
              favorites={favorites}
              onFavorite={toggleFavorite}
              compareIds={compareIds}
              onCompare={toggleCompare}
            />
          )}
        </div>
      </section>

      <section className="section categories-section">
        <div className="container">
          <div className="section-header">
            <h2>Browse by Property Type</h2>

            <p>
              Whether you&apos;re after an apartment, a villa or a commercial
              space, start your search here.
            </p>
          </div>

          <div className="category-grid">
            {categories.map(
              ({ type, icon: Icon, description }) => (
                <Link
                  key={type}
                  to={`/properties?type=${encodeURIComponent(type)}`}
                  className="category-card"
                >
                  <span className="category-icon">
                    <Icon />
                  </span>

                  <h3>{type}</h3>

                  <p>{description}</p>
                </Link>
              )
            )}
          </div>
        </div>
      </section>

      <section className="section why-section">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose EstateHub</h2>

            <p>
              We combine verified data with real local expertise so you can
              decide with confidence.
            </p>
          </div>

          <div className="why-grid">
            {whyChoose.map(
              ({ icon: Icon, title, description }) => (
                <div key={title} className="why-card">
                  <span className="why-icon">
                    <Icon />
                  </span>

                  <h3>{title}</h3>

                  <p>{description}</p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <div className="container cta-banner-inner">
          <div>
            <h2>Ready to find your next home?</h2>

            <p>
              Browse thousands of verified listings or speak to an EstateHub
              expert today.
            </p>
          </div>

          <div className="cta-banner-actions">
            <Link to="/properties" className="btn btn-primary">
              Explore Properties
            </Link>

            <Link to="/contact" className="btn btn-outline">
              Talk to an Expert
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}