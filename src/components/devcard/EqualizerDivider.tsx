export function EqualizerDivider() {
  return (
    <div className="equalizer-divider" aria-hidden="true">
      <div className="equalizer-divider__line" />
      <div className="equalizer">
        <span className="equalizer__bar" />
        <span className="equalizer__bar" />
        <span className="equalizer__bar" />
        <span className="equalizer__bar" />
        <span className="equalizer__bar" />
      </div>
      <div className="equalizer-divider__line" />
    </div>
  );
}
