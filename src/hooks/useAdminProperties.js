import { useMemo } from 'react';
import { useProperties } from './useProperties.js';
import { useLocalStorage } from './useLocalStorage.js';

// Admin CRUD is frontend-only: added/edited/deleted properties are tracked
// separately in localStorage and merged on top of the fetched properties.json
// data, so a page refresh keeps admin changes without needing a backend.
export function useAdminProperties() {
  const { properties: baseProperties, loading, error } = useProperties();
  const [addedProperties, setAddedProperties] = useLocalStorage('estatehub_admin_added', []);
  const [editedProperties, setEditedProperties] = useLocalStorage('estatehub_admin_edits', {});
  const [deletedIds, setDeletedIds] = useLocalStorage('estatehub_admin_deleted', []);

  const properties = useMemo(() => {
    const merged = [...baseProperties, ...addedProperties]
      .filter((property) => !deletedIds.includes(property.id))
      .map((property) => (editedProperties[property.id] ? { ...property, ...editedProperties[property.id] } : property));
    return merged;
  }, [baseProperties, addedProperties, editedProperties, deletedIds]);

  function addProperty(property) {
    const newProperty = {
      ...property,
      id: `admin-${Date.now()}`,
      images: property.images?.length
        ? property.images
        : ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1400&auto=format&fit=crop'],
      highlights: property.highlights || [],
      amenities: property.amenities || [],
    };
    setAddedProperties((prev) => [...prev, newProperty]);
  }

  function updateProperty(id, patch) {
    setEditedProperties((prev) => ({ ...prev, [id]: { ...(prev[id] || {}), ...patch } }));
  }

  function deleteProperty(id) {
    setDeletedIds((prev) => [...prev, id]);
  }

  return { properties, loading, error, addProperty, updateProperty, deleteProperty };
}
