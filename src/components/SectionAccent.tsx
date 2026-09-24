type SectionAccentProps = {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const sizeClasses = {
  sm: 'w-8',
  md: 'w-10',
  lg: 'w-12',
} as const;

export default function SectionAccent({
  size = 'md',
  className = '',
}: SectionAccentProps) {
  return (
    <span
      aria-hidden="true"
      data-section-accent="rule"
      className={[
        'inline-block h-0.5 shrink-0 bg-[#E8A838]',
        sizeClasses[size],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    />
  );
}
