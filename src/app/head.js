export default function Head() {
  return (
    <>
      {/* Preload posters so LCP image is discoverable early */}
      <link rel="preload" as="image" href="/videos/hero.webp" />
      <link rel="preload" as="image" href="/videos/hero-mobile.webp" />
    </>
  );
}
