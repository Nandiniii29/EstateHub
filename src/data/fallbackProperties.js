// Used only if the fetch to /properties.json fails, so the demo never shows a
// completely empty page during a viva or offline preview.
export const fallbackProperties = [
  {
    id: 'fallback-1',
    title: 'Sample 3 BHK Apartment',
    purpose: 'Buy',
    type: 'Apartment',
    city: 'Mohali',
    locality: 'Sector 82',
    address: 'Sector 82, Mohali, Punjab',
    price: 8500000,
    beds: 3,
    baths: 2,
    area: 1650,
    floor: '4th of 12',
    furnishing: 'Semi Furnished',
    possession: 'Ready to Move',
    ageOfProperty: '2-5 Years',
    featured: true,
    description: 'Sample listing shown because live property data could not be loaded.',
    highlights: ['Spacious Living & Dining', 'Modular Kitchen'],
    amenities: ['Parking', 'Lift', '24/7 Security'],
    images: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1400&auto=format&fit=crop',
    ],
  },
];
