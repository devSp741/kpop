export default function manifest() {
  return {
    name: 'K-Pop Radar - Idol Updates & Comeback Tracker',
    short_name: 'KpopRadar',
    description: 'Track real-time K-Pop updates, posts, schedules & comeback alerts across all platforms in one clean feed.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0F172A',
    theme_color: '#7C3AED',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/apple-icon.svg',
        sizes: '180x180',
        type: 'image/svg+xml',
      },
    ],
  };
}
