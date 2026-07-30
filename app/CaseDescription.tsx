type CaseDescriptionProps = {
  label: string;
  lines: [string, string, string, string];
};

type CaseEyebrowProps = {
  label: string;
};

export function CaseEyebrow({ label }: CaseEyebrowProps) {
  return <span className="case-eyebrow">{label}</span>;
}

export function CaseDescription({ label, lines }: CaseDescriptionProps) {
  return (
    <p className="case-description" aria-label={label}>
      {lines.join(" ")}
    </p>
  );
}
