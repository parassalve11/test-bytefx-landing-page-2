/* Original solid interface glyphs. No icon-library dependency. */
const shapes = {
  arrow: <path d="M3 10.5h12L10.5 6 13 3.5l8.5 8.5-8.5 8.5-2.5-2.5 4.5-4.5H3z" />,
  back: <path d="M21 10.5H9L13.5 6 11 3.5 2.5 12l8.5 8.5 2.5-2.5L9 13.5h12z" />,
  caret: <path d="m5 8 7 8 7-8z" />,
  chevron: <path d="m8 4 9 8-9 8z" />,
  close: <path d="m5 3 7 7 7-7 2 2-7 7 7 7-2 2-7-7-7 7-2-2 7-7-7-7z" />,
  chat: <path d="M3 3h18v14H10l-7 5V3zm4 5v2h10V8H7zm0 4v2h7v-2H7z" fillRule="evenodd" />,
  send: <path d="m2 2 21 10L2 22l3-8 11-2-11-2z" />,
  refresh: <path d="M12 3a9 9 0 1 0 8.5 12h-3.3A6 6 0 1 1 16 7l-4 4h10V1l-3.8 3.8A9 9 0 0 0 12 3z" />,
  expand: <path d="M2 2h8v3H5v5H2zm12 0h8v8h-3V5h-5zM2 14h3v5h5v3H2zm17 0h3v8h-8v-3h5z" />,
  sun: <><circle cx="12" cy="12" r="5"/><path d="M10.5 0h3v4h-3zm0 20h3v4h-3zM0 10.5h4v3H0zm20 0h4v3h-4zM3 1l4 4-2 2-4-4zm14 18 2-2 4 4-2 2zM1 21l4-4 2 2-4 4zM17 5l4-4 2 2-4 4z"/></>,
  moon: <path d="M10 1a11 11 0 1 0 13 13A10 10 0 0 1 10 1z" />,
  phone: <path d="m3 2 5 1 2 5-3 2a19 19 0 0 0 7 7l2-3 5 2 1 5c-9 5-25-11-19-19z" />,
  mail: <path d="M2 4h20v16H2V4zm2 2v3l8 5 8-5V6l-8 5-8-5z" fillRule="evenodd" />,
  pin: <path d="M12 1a8 8 0 0 0-8 8c0 6 8 14 8 14s8-8 8-14a8 8 0 0 0-8-8zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" fillRule="evenodd" />,
  badge: <path d="M2 3h20v18H2zm4 5v3h12V8zm0 6v2h8v-2z" fillRule="evenodd" />,
  globe: <path d="M12 1a11 11 0 1 0 0 22 11 11 0 0 0 0-22zM5 5l4-1 3 4-3 4H5l-2-2zm5 8 7-1 3 3-5 6-3-1-1-4z" fillRule="evenodd" />,
  shield: <path d="m12 1 9 4v7c0 5-6 9-9 11-3-2-9-6-9-11V5zm-5 10-2 2 5 5 9-9-2-2-7 7z" fillRule="evenodd" />,
  spark: <path d="m12 0 3.5 8.5L24 12l-8.5 3.5L12 24l-3.5-8.5L0 12l8.5-3.5z" />,
  qr: <path d="M1 1h9v9H1zm3 3v3h3V4zm10-3h9v9h-9zm3 3v3h3V4zM1 14h9v9H1zm3 3v3h3v-3zm10-3h4v4h-4zm6 0h3v6h-3zm-6 6h6v3h-6zm7 1h2v2h-2z" fillRule="evenodd" />,
  star: <path d="m12 1 3.4 7 7.6 1-5.5 5.4 1.3 7.6-6.8-3.6-6.8 3.6 1.3-7.6L1 9l7.6-1z" />,
  drag: <path d="m0 12 7-7v5h10V5l7 7-7 7v-5H7v5z" />,
  x: <path d="M2 2h5l15 20h-5L2 2zm17 0h3L5 22H2z" />,
  instagram: <path d="M6 1h12a5 5 0 0 1 5 5v12a5 5 0 0 1-5 5H6a5 5 0 0 1-5-5V6a5 5 0 0 1 5-5zm6 5a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm0 3a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm6-5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" fillRule="evenodd" />,
  facebook: <path d="M14 24V13h4l1-4h-5V6c0-2 1-2 5-2V0h-4c-4 0-6 2-6 6v3H6v4h3v11z" />,
  linkedin: <path d="M1 1h22v22H1zm4 8v10h3V9zm1.5-5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 9v10h3v-6c0-3 3-3 3 0v6h3v-7c0-4-4-5-6-2V9z" fillRule="evenodd" />,
  youtube: <path d="M5 3h14a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H5a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm4 4v10l9-5z" fillRule="evenodd" />,
  telegram: <path d="m1 10 22-9-4 22-7-6-4 4v-7l11-10-14 8z" />,
};
export default function Icon({name,size=18,className,...rest}) {
  if (!shapes[name]) return null;
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" className={className} {...rest}>{shapes[name]}</svg>;
}
