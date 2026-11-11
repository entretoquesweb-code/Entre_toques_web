/**
 * Sistema de ícones: um único sprite SVG inline (renderizado uma vez no
 * layout) e referências leves via <use>. Evita repetir os caminhos SVG
 * a cada ícone e não carrega nenhum arquivo externo.
 */
import { Fragment } from "react";

const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.3 } as const;
const R = { ...S, strokeLinecap: "round" } as const;
const J = { ...S, strokeLinecap: "round", strokeLinejoin: "round" } as const;

const symbols = {
  mark: (
    <symbol id="i-mark" viewBox="0 0 48 48">
      <circle cx="24" cy="24" r="23" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M19.5 13.5c-6.4 4.2-6.4 16.8 0 21" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M28.5 13.5c6.4 4.2 6.4 16.8 0 21" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="24" cy="24" r="2.3" fill="currentColor" />
    </symbol>
  ),
  whatsapp: (
    <symbol id="i-whatsapp" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35m-5.42 7.4h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89a11.82 11.82 0 0 0-3.48-8.41z"
      />
    </symbol>
  ),
  arrow: (
    <symbol id="i-arrow" viewBox="0 0 24 24">
      <path d="M4 12h15M13 6l6 6-6 6" {...J} strokeWidth={1.4} />
    </symbol>
  ),
  instagram: (
    <symbol id="i-instagram" viewBox="0 0 24 24">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" {...S} strokeWidth={1.4} />
      <circle cx="12" cy="12" r="4" {...S} strokeWidth={1.4} />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
    </symbol>
  ),
  pin: (
    <symbol id="i-pin" viewBox="0 0 24 24">
      <path d="M12 21s-6.5-6.1-6.5-11a6.5 6.5 0 0 1 13 0c0 4.9-6.5 11-6.5 11z" {...S} />
      <circle cx="12" cy="10" r="2.3" {...S} />
    </symbol>
  ),
  menu: (
    <symbol id="i-menu" viewBox="0 0 24 24">
      <path d="M4 8h16M4 16h11" {...R} strokeWidth={1.5} />
    </symbol>
  ),
  close: (
    <symbol id="i-close" viewBox="0 0 24 24">
      <path d="M6 6l12 12M18 6L6 18" {...R} strokeWidth={1.5} />
    </symbol>
  ),
} as const;

export type IconName = keyof typeof symbols;

/** Renderize uma única vez, no layout raiz. */
export function IconSprite() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" className="sprite">
      <defs>
        {Object.entries(symbols).map(([name, symbol]) => (
          <Fragment key={name}>{symbol}</Fragment>
        ))}
      </defs>
    </svg>
  );
}

interface IconProps {
  readonly name: IconName;
  readonly className?: string;
  /** Texto acessível. Sem ele, o ícone é decorativo (aria-hidden). */
  readonly title?: string;
}

export function Icon({ name, className, title }: IconProps) {
  return (
    <svg
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      <use href={`#i-${name}`} />
    </svg>
  );
}
