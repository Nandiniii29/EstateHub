// A small hand-picked set of inline SVG icons. Kept in one file instead of
// pulling in an icon library, since the project only needs a handful of them.
// Every icon accepts standard SVG props (size via width/height, stroke color inherits currentColor).

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export function IconSearch(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...props}>
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

export function IconLocation(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...props}>
      <path d="M12 22s7-7.58 7-12.5A7 7 0 0 0 5 9.5C5 14.42 12 22 12 22z" />
      <circle cx="12" cy="9.5" r="2.4" />
    </svg>
  );
}

export function IconHome(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...props}>
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5.5 10v9.5a1 1 0 0 0 1 1H10v-6h4v6h3.5a1 1 0 0 0 1-1V10" />
    </svg>
  );
}

export function IconHeart({ filled, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" {...base} fill={filled ? 'currentColor' : 'none'} {...props}>
      <path d="M12 20.5s-7.5-4.6-9.9-9.2C.5 8.1 1.9 4.7 5.2 3.8c2-.5 4 .3 5.1 2 .3.5.4.7.7 1.3.3-.6.4-.8.7-1.3 1.1-1.7 3.1-2.5 5.1-2 3.3.9 4.7 4.3 3.1 7.5C19.5 15.9 12 20.5 12 20.5z" />
    </svg>
  );
}

export function IconBed(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" {...base} {...props}>
      <path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6" />
      <path d="M3 18v2M21 18v2" />
      <path d="M3 12V8a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M11 12V9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3" />
    </svg>
  );
}

export function IconBath(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" {...base} {...props}>
      <path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3z" />
      <path d="M4 12V7a2 2 0 0 1 3.5-1.3" />
      <path d="M8 19v2M16 19v2" />
    </svg>
  );
}

export function IconArea(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" {...base} {...props}>
      <rect x="4" y="4" width="16" height="16" rx="1" />
      <path d="M4 9h4M9 4v4" />
    </svg>
  );
}

export function IconType(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" {...base} {...props}>
      <path d="M3 21V9l9-6 9 6v12" />
      <path d="M9 21v-8h6v8" />
    </svg>
  );
}

export function IconScale(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" {...base} {...props}>
      <path d="M12 3v18M7 21h10" />
      <path d="M5 7h6M13 7h6" />
      <path d="M5 7 2 13a3 3 0 0 0 6 0L5 7zM19 7l-3 6a3 3 0 0 0 6 0l-3-6z" />
    </svg>
  );
}

export function IconPhone(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" {...base} {...props}>
      <path d="M4 4h4l2 5-2.5 1.5a12 12 0 0 0 6 6L15 14l5 2v4a2 2 0 0 1-2 2C9.4 22 2 14.6 2 6a2 2 0 0 1 2-2z" />
    </svg>
  );
}

export function IconMail(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" {...base} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

export function IconUser(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...props}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c1.5-4 6-6 8-6s6.5 2 8 6" />
    </svg>
  );
}

export function IconEye({ open = true, ...props }) {
  if (!open) {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...props}>
        <path d="M3 3l18 18" />
        <path d="M10.6 5.1A11 11 0 0 1 12 5c5 0 9 4 10 7-.4 1.2-1.2 2.6-2.4 3.9M6.5 6.5C4.3 8 2.9 10 2 12c1 3 5 7 10 7 1.2 0 2.3-.2 3.4-.6" />
        <path d="M9.5 9.8a3 3 0 0 0 4.2 4.2" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...props}>
      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function IconClose(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...props}>
      <line x1="5" y1="5" x2="19" y2="19" />
      <line x1="19" y1="5" x2="5" y2="19" />
    </svg>
  );
}

export function IconChevronDown(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" {...base} {...props}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export function IconFilter(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...props}>
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="7" y1="12" x2="17" y2="12" />
      <line x1="10" y1="18" x2="14" y2="18" />
    </svg>
  );
}

export function IconCheck(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" {...base} {...props}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function IconArrowRight(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" {...base} {...props}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export function IconShield(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...props}>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
    </svg>
  );
}

export function IconAgents(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...props}>
      <circle cx="9" cy="8" r="3" />
      <path d="M2.5 20c1-3.5 3.8-5.5 6.5-5.5s5.5 2 6.5 5.5" />
      <circle cx="17" cy="7" r="2.2" />
      <path d="M15.5 14.2c2.2.4 4 2 4.8 4.8" />
    </svg>
  );
}

export function IconTrash(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" {...base} {...props}>
      <polyline points="3 6 5 6 21 6" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m2 0v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6h12z" />
    </svg>
  );
}

export function IconEdit(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" {...base} {...props}>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
    </svg>
  );
}

export function IconPlus(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" {...base} {...props}>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

export function IconLogout(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" {...base} {...props}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

// Amenity-specific icons, mapped by name in AmenityIcon.jsx
export function IconParking(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...props}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M9 16V8h3.5a2.5 2.5 0 0 1 0 5H9" />
    </svg>
  );
}

export function IconLift(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...props}>
      <rect x="5" y="3" width="14" height="18" rx="1.5" />
      <polyline points="10 9 12 7 14 9" />
      <polyline points="10 15 12 17 14 15" />
    </svg>
  );
}

export function IconSecurity(props) {
  return <IconShield {...props} width="20" height="20" />;
}

export function IconPower(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...props}>
      <polygon points="13 2 4 14 11 14 10 22 20 9 13 9 13 2" />
    </svg>
  );
}

export function IconCCTV(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...props}>
      <path d="M3 8l9-3 9 3-9 3-9-3z" />
      <path d="M7 9.5V15a5 5 0 0 0 10 0V9.5" />
      <line x1="12" y1="15" x2="12" y2="20" />
    </svg>
  );
}

export function IconGym(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...props}>
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="6" y1="7" x2="6" y2="17" />
      <line x1="18" y1="7" x2="18" y2="17" />
      <line x1="3" y1="9" x2="3" y2="15" />
      <line x1="21" y1="9" x2="21" y2="15" />
    </svg>
  );
}

export function IconClub(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...props}>
      <path d="M4 21h16" />
      <path d="M6 21V10l6-6 6 6v11" />
      <path d="M10 21v-6h4v6" />
    </svg>
  );
}

export function IconPool(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...props}>
      <path d="M3 17c1.5-1.5 3-1.5 4.5 0s3 1.5 4.5 0 3-1.5 4.5 0 3 1.5 4.5 0" />
      <path d="M3 21c1.5-1.5 3-1.5 4.5 0s3 1.5 4.5 0 3-1.5 4.5 0 3 1.5 4.5 0" />
      <path d="M7 13V5l10 4-10 4" />
    </svg>
  );
}

export function IconWifi(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...props}>
      <path d="M2 8.5a16 16 0 0 1 20 0" />
      <path d="M5.5 12.5a11 11 0 0 1 13 0" />
      <path d="M9 16.5a5.5 5.5 0 0 1 6 0" />
      <circle cx="12" cy="20" r="0.8" fill="currentColor" />
    </svg>
  );
}

export function IconGarden(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...props}>
      <path d="M12 21V9" />
      <path d="M12 9c-4 0-6-2.5-6-6 4 0 6 2 6 6z" />
      <path d="M12 13c4 0 6-2.5 6-6-4 0-6 2-6 6z" />
    </svg>
  );
}

export function IconPlayArea(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...props}>
      <circle cx="12" cy="5" r="2" />
      <path d="M6 21l3-9 3 3 3-3 3 9" />
      <path d="M9 12l3-7 3 7" />
    </svg>
  );
}

export function IconIntercom(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...props}>
      <rect x="7" y="2" width="10" height="20" rx="2" />
      <line x1="10" y1="7" x2="14" y2="7" />
      <circle cx="12" cy="12" r="1.5" />
    </svg>
  );
}

export function IconFire(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...props}>
      <path d="M12 22c4 0 6-2.7 6-6.2 0-3-2-5-3-7-1 1.5-1.7 2-2.5 1-1-1.3-.5-3.3-.5-3.3S9 8 8 11c-.6 1.7-2 2.6-2 5.3C6 19.7 8.5 22 12 22z" />
    </svg>
  );
}

export function IconGated(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...props}>
      <path d="M3 21V8l9-5 9 5v13" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="9" y1="21" x2="9" y2="12" />
      <line x1="15" y1="21" x2="15" y2="12" />
    </svg>
  );
}

export function IconRainwater(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...props}>
      <path d="M12 3c3 4 6 7.2 6 10.5A6 6 0 0 1 6 13.5C6 10.2 9 7 12 3z" />
    </svg>
  );
}
