import { useState } from 'react';
import { useAdminProperties } from '../../hooks/useAdminProperties.js';
import { formatCompactPrice } from '../../utils/format.js';
import { IconEdit, IconTrash, IconPlus } from '../../components/icons.jsx';

const emptyForm = {
  title: '',
  city: '',
  locality: '',
  type: 'Apartment',
  purpose: 'Buy',
  price: '',
  beds: '',
  baths: '',
  area: '',
};

export default function AdminProperties() {
  const { properties, loading, addProperty, updateProperty, deleteProperty } = useAdminProperties();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function startEdit(property) {
    setEditingId(property.id);
    setForm({
      title: property.title,
      city: property.city,
      locality: property.locality,
      type: property.type,
      purpose: property.purpose,
      price: property.price,
      beds: property.beds,
      baths: property.baths,
      area: property.area,
    });
    setShowForm(true);
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const payload = {
      ...form,
      price: Number(form.price) || 0,
      beds: Number(form.beds) || 0,
      baths: Number(form.baths) || 0,
      area: Number(form.area) || 0,
      address: `${form.locality}, ${form.city}`,
    };

    if (editingId) {
      updateProperty(editingId, payload);
    } else {
      addProperty(payload);
    }
    resetForm();
  }

  return (
    <div>
      <div className="admin-content-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
        <h2 style={{ margin: 0 }}>Manage Properties</h2>
        <button type="button" className="btn btn-primary btn-sm" onClick={() => setShowForm((v) => !v)}>
          <IconPlus /> {showForm ? 'Close Form' : 'Add Property'}
        </button>
      </div>

      {showForm && (
        <form className="card admin-add-form" onSubmit={handleSubmit}>
          <h3>{editingId ? 'Edit Property' : 'Add New Property'}</h3>
          <div className="admin-form-grid">
            <div className="field">
              <label htmlFor="admin-title">Title</label>
              <input id="admin-title" name="title" value={form.title} onChange={handleChange} required />
            </div>
            <div className="field">
              <label htmlFor="admin-city">City</label>
              <input id="admin-city" name="city" value={form.city} onChange={handleChange} required />
            </div>
            <div className="field">
              <label htmlFor="admin-locality">Locality</label>
              <input id="admin-locality" name="locality" value={form.locality} onChange={handleChange} required />
            </div>
            <div className="field">
              <label htmlFor="admin-type">Property Type</label>
              <select id="admin-type" name="type" value={form.type} onChange={handleChange}>
                {['Apartment', 'Villa', 'Builder Floor', 'Plot', 'Farmhouse', 'Commercial'].map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="admin-purpose">Purpose</label>
              <select id="admin-purpose" name="purpose" value={form.purpose} onChange={handleChange}>
                <option value="Buy">Buy</option>
                <option value="Rent">Rent</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="admin-price">Price (₹)</label>
              <input id="admin-price" name="price" type="number" min="0" value={form.price} onChange={handleChange} required />
            </div>
            <div className="field">
              <label htmlFor="admin-beds">Bedrooms</label>
              <input id="admin-beds" name="beds" type="number" min="0" value={form.beds} onChange={handleChange} />
            </div>
            <div className="field">
              <label htmlFor="admin-baths">Bathrooms</label>
              <input id="admin-baths" name="baths" type="number" min="0" value={form.baths} onChange={handleChange} />
            </div>
            <div className="field">
              <label htmlFor="admin-area">Area (sq.ft)</label>
              <input id="admin-area" name="area" type="number" min="0" value={form.area} onChange={handleChange} required />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-3)' }}>
            <button type="submit" className="btn btn-primary">{editingId ? 'Save Changes' : 'Add Property'}</button>
            <button type="button" className="btn btn-ghost" onClick={resetForm}>Cancel</button>
          </div>
        </form>
      )}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>City</th>
              <th>Type</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td colSpan={5}>Loading…</td></tr>
            )}
            {!loading && properties.map((property) => (
              <tr key={property.id}>
                <td>{property.title}</td>
                <td>{property.city}</td>
                <td>{property.type}</td>
                <td>{formatCompactPrice(property.price)}</td>
                <td>
                  <div className="admin-table-actions">
                    <button type="button" onClick={() => startEdit(property)}>
                      <IconEdit /> Edit
                    </button>
                    <button type="button" onClick={() => deleteProperty(property.id)}>
                      <IconTrash /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
