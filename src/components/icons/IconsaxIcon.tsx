import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { ICONSAX_LINEAR_CATALOG } from './iconsaxCatalog.generated';

export type IconsaxVariant =
  | 'bold'
  | 'broken'
  | 'bulk'
  | 'linear'
  | 'outline'
  | 'twotone';

export type IconsaxMotion = 'float' | 'nudge' | 'pulse' | 'spin';

type IconStyle = CSSProperties & {
  '--hva-icon-size'?: string;
};

export interface IconsaxIconProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, 'children' | 'color'> {
  name: string;
  variant?: IconsaxVariant;
  size?: number | string;
  color?: string;
  motion?: IconsaxMotion;
  pro?: boolean;
  /** Accepted while migrating from stroke-based libraries; Iconsax owns its stroke geometry. */
  strokeWidth?: number | string;
  /** Accepted for compatibility with Lucide call sites. */
  absoluteStrokeWidth?: boolean;
  /** Used as a color fallback when legacy call sites pass `fill`. */
  fill?: string;
}

export type IconsaxGlyphProps = Omit<IconsaxIconProps, 'name'>;

export type IconsaxIconComponent = (
  props: IconsaxGlyphProps
) => ReactNode;

function cssSize(size: number | string): string {
  return typeof size === 'number' || /^\d+(\.\d+)?$/.test(size)
    ? `${size}px`
    : size;
}

function iconMarkup(name: string): string {
  const svg = ICONSAX_LINEAR_CATALOG[name];
  if (!svg) return '';

  return svg
    .replace(/<svg([^>]*)>/, (_match, attributes: string) => {
      const normalizedAttributes = attributes
        .replace(/\swidth="[^"]*"/, '')
        .replace(/\sheight="[^"]*"/, '')
        .replace(/\sstyle="[^"]*"/, '');

      return `<svg${normalizedAttributes} width="100%" height="100%" focusable="false">`;
    })
    .replace(/(fill|stroke)="(?!none)[^"]*"/g, '$1="currentColor"');
}

export function IconsaxIcon({
  name,
  variant = 'linear',
  size = 24,
  color = 'currentColor',
  motion,
  pro = false,
  className = '',
  style,
  strokeWidth,
  absoluteStrokeWidth,
  fill,
  ...spanProps
}: IconsaxIconProps) {
  // The legacy stroke props are intentionally accepted but not forwarded.
  void strokeWidth;
  void absoluteStrokeWidth;
  void variant;
  void pro;

  const resolvedColor = color === 'currentColor' && fill && fill !== 'none'
    ? fill
    : color;
  const iconStyle: IconStyle = {
    ...style,
    '--hva-icon-size': cssSize(size),
    color: resolvedColor,
  };
  const motionClass = motion ? ` hva-icon--${motion}` : '';
  const markup = iconMarkup(name);

  return (
    <span
      {...spanProps}
      className={`hva-icon${motionClass}${className ? ` ${className}` : ''}`}
      style={iconStyle}
    >
      <span
        className="hva-icon__glyph"
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: markup }}
      />
    </span>
  );
}

export function createIconsaxIcon(
  name: string,
  defaultVariant: IconsaxVariant = 'linear'
): IconsaxIconComponent {
  function NamedIconsaxIcon({
    variant = defaultVariant,
    ...props
  }: Omit<IconsaxIconProps, 'name'>) {
    return <IconsaxIcon name={name} variant={variant} {...props} />;
  }

  return NamedIconsaxIcon;
}
