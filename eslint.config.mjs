import nextVitals from 'eslint-config-next/core-web-vitals';

const config = [
  ...(Array.isArray(nextVitals) ? nextVitals : [nextVitals]),
  { ignores: ['.next/**', 'node_modules/**', 'out/**'] },
];

export default config;
