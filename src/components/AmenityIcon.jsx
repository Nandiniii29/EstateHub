import {
  IconParking,
  IconLift,
  IconSecurity,
  IconPower,
  IconCCTV,
  IconGym,
  IconClub,
  IconPool,
  IconWifi,
  IconGarden,
  IconPlayArea,
  IconIntercom,
  IconFire,
  IconGated,
  IconRainwater,
} from './icons.jsx';

// Maps a raw amenity name (from properties.json) to its icon component.
const amenityIconMap = {
  Parking: IconParking,
  'Covered Parking': IconParking,
  Lift: IconLift,
  '24/7 Security': IconSecurity,
  CCTV: IconCCTV,
  'Power Backup': IconPower,
  Gym: IconGym,
  'Club House': IconClub,
  'Swimming Pool': IconPool,
  'Wi-Fi': IconWifi,
  Garden: IconGarden,
  'Children Play Area': IconPlayArea,
  Intercom: IconIntercom,
  'Fire Safety': IconFire,
  'Gated Community': IconGated,
  'Rainwater Harvesting': IconRainwater,
};

// Renders one amenity as a circular icon with a label underneath, matching
// the "small circular icon container" spec from the brief.
export default function AmenityIcon({ name }) {
  const Icon = amenityIconMap[name] || IconCheck;

  return (
    <div className="amenity-item">
      <span className="amenity-circle">
        <Icon />
      </span>
      <span className="amenity-label">{name}</span>
    </div>
  );
}

function IconCheck() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
