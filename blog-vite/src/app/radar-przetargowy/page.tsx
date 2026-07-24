import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Radar Przetargowy',
  description: 'Agregator ogłoszeń przetargowych z polskich platform zakupowych.',
};

// Radar to samodzielne SPA (React + Vite + ag-grid) budowane do public/radar-app/.
// Osadzamy je w iframe pod nawigacją bloga — izolacja stylów/JS od reszty strony.
// Wysokość wg wzoru ze strony głównej (Header + footer ≈ 96px mobile / 112px desktop).
export default function RadarPage() {
  return (
    <iframe
      src="/radar-app/index.html"
      title="Radar Przetargowy"
      className="block w-full border-0 h-[calc(100vh-96px)] sm:h-[calc(100vh-112px)]"
    />
  );
}
