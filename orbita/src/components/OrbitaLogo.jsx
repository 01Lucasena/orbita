import orbitron from "../assets/fonts/Orbitron-Regular.ttf"

export default function OrbitaLogo({ size = 32, withLabel = false }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
      {withLabel && (
        <span
          style={{
            fontFamily: "Estrella",
            fontWeight: 400,
            fontSize: `${size}px`,
            color: 'var(--color-star)'
          }}
        >
          Órbita
        </span>
      )}

      <style>{`
        @font-face {
          font-family: "Orbitron";
          src: url("${orbitron}") format("opentype");
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }
      `}</style>
    </span>
  )
}