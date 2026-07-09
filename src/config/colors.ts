/**
 * Centralized color palette for the HRM application.
 *
 * These values mirror the CSS custom properties defined in globals.css @theme.
 * Use this file for any runtime color references in TypeScript/TSX (e.g. charts, canvas).
 * For Tailwind utility classes, use the `bg-primary`, `text-primary`, etc. tokens directly.
 *
 * To change a color: update BOTH this file AND globals.css @theme block.
 */
export const COLORS = {
  // ─── Brand Primary ──────────────────────────────────────────────
  primary: '#0F6CBD',
  primaryHover: '#0B5CAD',
  primaryLight: '#EAF4FC',
  primaryText: '#FFFFFF', // text on primary background

  // ─── Brand Secondary ─────────────────────────────────────────────
  secondaryTeal: '#0F8A83',
  secondaryLight: '#E6F6F4',

  // ─── Backgrounds ─────────────────────────────────────────────────
  brandBg: '#F7F9FC',       // page background
  brandSurface: '#FFFFFF',  // card / sidebar surface

  // ─── Borders ─────────────────────────────────────────────────────
  brandBorder: '#DDE3EA',

  // ─── Text ────────────────────────────────────────────────────────
  brandPrimaryText: '#172033',    // headings, strong labels
  brandSecondaryText: '#667085',  // subtext, placeholders

  // ─── Navigation Sidebar ───────────────────────────────────────────
  navActive: '#0F6CBD',           // active nav item background  → same as primary
  navActiveText: '#FFFFFF',       // active nav item text
  navActiveSub: '#EAF4FC',        // active child nav background → primary-light
  navActiveSubText: '#0F6CBD',    // active child nav text
  navDefault: '#667085',          // default nav text
  navHoverBg: '#F7F9FC',          // hover nav background
  navHoverText: '#172033',        // hover nav text

  // ─── Status ───────────────────────────────────────────────────────
  success: '#12B76A',
  warning: '#F79009',
  danger: '#F04438',
  info: '#0F6CBD',
} as const;

export type ColorKey = keyof typeof COLORS;
