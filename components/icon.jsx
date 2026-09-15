const shapes = {
  arrow: <path d="M4 12h15m-6-6 6 6-6 6" />,
  caret: <path d="m6 9 6 6 6-6" />,
  chevron: <path d="m9 6 6 6-6 6" />,
  back: <path d="M20 12H5m6 6-6-6 6-6" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.6v2.1m0 14.6v2.1M2.6 12h2.1m14.6 0h2.1M5.4 5.4l1.5 1.5m10.2 10.2 1.5 1.5M5.4 18.6l1.5-1.5M17.1 6.9l1.5-1.5" />
    </>
  ),
  moon: <path d="M20.4 14.2A8.6 8.6 0 0 1 9.8 3.6a8.7 8.7 0 1 0 10.6 10.6Z" />,
  phone: (
    <path d="M7.4 3h-2A2.4 2.4 0 0 0 3 5.6C3 14.1 9.9 21 18.4 21a2.4 2.4 0 0 0 2.6-2.4v-2l-4.4-1.8-1.9 2.3a13.6 13.6 0 0 1-5.8-5.8l2.3-1.9Z" />
  ),
  mail: (
    <>
      <rect x="2.8" y="5" width="18.4" height="14" rx="3" />
      <path d="m4 7.6 8 5.4 8-5.4" />
    </>
  ),
  pin: (
    <>
      <path d="M19 10.3c0 5-7 10.7-7 10.7s-7-5.7-7-10.7a7 7 0 1 1 14 0Z" />
      <circle cx="12" cy="10.2" r="2.4" />
    </>
  ),
  badge: (
    <>
      <rect x="3.5" y="4" width="17" height="16" rx="3" />
      <path d="M7.5 9.5h9m-9 4h6" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3.2 9.6h17.6M3.2 14.4h17.6" />
      <ellipse cx="12" cy="12" rx="4" ry="9" />
    </>
  ),
  shield: (
    <>
      <path d="M12 2.8 5 5.6v5.6c0 4.5 3 8.2 7 9.9 4-1.7 7-5.4 7-9.9V5.6Z" />
      <path d="m9.2 12 2 2 3.6-3.8" />
    </>
  ),
  spark: <path d="M12 2.6 14 9l6.4 2-6.4 2-2 6.4-2-6.4L3.6 11 10 9Z" />,
  qr: (
    <>
      <rect x="3.2" y="3.2" width="6.4" height="6.4" rx="1.4" />
      <rect x="14.4" y="3.2" width="6.4" height="6.4" rx="1.4" />
      <rect x="3.2" y="14.4" width="6.4" height="6.4" rx="1.4" />
      <path d="M14.4 14.4h3v3h-3zm6.4 0v3m-3 3.4h3m-6.4 0h.02" />
    </>
  ),
  star: (
    <path
      d="m12 3.4 2.6 5.4 5.9.8-4.3 4.1 1.1 5.9-5.3-2.9-5.3 2.9 1.1-5.9L3.5 9.6l5.9-.8Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  drag: (
    <>
      <path d="M8 6.5 4.5 10 8 13.5M16 6.5 19.5 10 16 13.5M4.5 10h15" />
      <path d="M12 16v3.5" strokeDasharray="0.1 3.4" />
    </>
  ),
  x: <path d="M4 3.5h3.9l11.6 17H15.6ZM19.6 3.5l-6.8 7.8M4.4 20.5l6.8-7.8" />,
  instagram: (
    <>
      <rect x="3.3" y="3.3" width="17.4" height="17.4" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.1" cy="6.9" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  facebook: (
    <path d="M14.4 21v-8.2h2.8l.5-3.5h-3.3V7.1c0-1 .3-1.7 1.7-1.7h1.8V2.3a23 23 0 0 0-2.6-.1c-2.6 0-4.4 1.6-4.4 4.5v2.6H8v3.5h2.9V21" />
  ),
  linkedin: (
    <>
      <rect x="3.3" y="3.3" width="17.4" height="17.4" rx="3.4" />
      <path d="M7.4 10.4v6.4m4 0v-6.4m0 3.1c0-3.4 5.2-3.4 5.2 0v3.3" />
      <circle cx="7.4" cy="7.2" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  youtube: (
    <>
      <rect x="2.6" y="5.4" width="18.8" height="13.2" rx="4.2" />
      <path d="m10.3 9.2 5 2.8-5 2.8Z" />
    </>
  ),
  telegram: <path d="M21 4.2 2.9 11.1l4.8 1.7 1.8 5.6 2.7-3.1 4.4 3.3Zm0 0-13.3 8.6" />,
};

export default function Icon({ name, size = 18, className, ...rest }) {
  const shape = shapes[name];
  if (!shape) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...rest}
    >
      {shape}
    </svg>
  );
}
