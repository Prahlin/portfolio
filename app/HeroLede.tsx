const ledeLines = [
  { text: "Concept > Prototype > Build > Shipment" },
  { text: "All-In-One, 100% Hassle-Free", strong: true },
];

function HeroLedeLine({ strong, text }: { strong?: boolean; text: string }) {
  const content = (
    <span className="hero-lede-line-visual">{text}</span>
  );

  return (
    <span className="hero-lede-line">
      {strong ? <strong>{content}</strong> : content}
    </span>
  );
}

export function HeroLede() {
  return (
    <p className="hero-lede">
      {ledeLines.map((line) => (
        <HeroLedeLine key={line.text} {...line} />
      ))}
    </p>
  );
}
