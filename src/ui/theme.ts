import { Platform, type TextStyle, type ViewStyle } from 'react-native';

export const colors = {
  background: '#FFF1E3',
  backgroundDeep: '#FBE6D2',
  surface: '#FFFFFF',
  surfaceRaised: '#FFFAF4',
  surfacePressed: '#F6E6D6',
  outline: '#EED7C3',
  /** Soft "toy" drop shadow under raised pastel blocks. */
  ledge: '#F2D9C4',
  textPrimary: '#3B2F56',
  textSecondary: '#685A86',
  textMuted: '#76688F',
  accent: '#6E52D6',
  accentPressed: '#5A40BE',
  onAccent: '#FFFFFF',
  combo: '#FFC93C',
  onCombo: '#3B2F56',
  /** Gold readable as text on light backgrounds (coins, record). */
  comboText: '#A35F00',
  danger: '#C8323F',
  success: '#2B7D4C',
  warning: '#E2702A',
  shaft: '#FFFFFF',
  floorLine: '#F3DDCB',
  scrim: 'rgba(59, 47, 86, 0.55)',
} as const;

/** 4 px base grid. */
export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radius = {
  sm: 8,
  md: 14,
  lg: 20,
  xl: 28,
  pill: 999,
} as const;

export const fonts = {
  medium: 'Nunito_600SemiBold',
  semibold: 'Nunito_700Bold',
  bold: 'Nunito_800ExtraBold',
  extraBold: 'Nunito_800ExtraBold',
  black: 'Nunito_900Black',
} as const;

export const type = {
  display: { fontFamily: fonts.black, fontSize: 40, lineHeight: 42, letterSpacing: -0.5 },
  h1: { fontFamily: fonts.extraBold, fontSize: 28, lineHeight: 34, letterSpacing: -0.3 },
  h2: { fontFamily: fonts.bold, fontSize: 20, lineHeight: 26 },
  body: { fontFamily: fonts.medium, fontSize: 16, lineHeight: 22 },
  caption: { fontFamily: fonts.semibold, fontSize: 13, lineHeight: 18 },
  overline: { fontFamily: fonts.bold, fontSize: 12, lineHeight: 16, letterSpacing: 1.4, textTransform: 'uppercase' },
  button: { fontFamily: fonts.extraBold, fontSize: 17, lineHeight: 22, letterSpacing: 0.6 },
  number: { fontFamily: fonts.black, fontVariant: ['tabular-nums'] },
} satisfies Record<string, TextStyle>;

export const durations = {
  press: 90,
  fast: 160,
  base: 220,
  slow: 300,
} as const;

/** Minimum touch target: 44 pt (iOS) / 48 dp (Android); we use 48 everywhere. */
export const touchTarget = 48;

export const maxContentWidth = 520;

export function shadow(elevation: 'low' | 'high'): ViewStyle {
  return {
    boxShadow: elevation === 'high' ? '0px 14px 32px rgba(59, 47, 86, 0.22)' : '0px 5px 0px rgba(59, 47, 86, 0.16)',
  };
}

/**
 * Destination badge colours, always paired with a number and an arrow, never alone. Vivid enough to tell
 * apart at a glance on the pastel shelves; dark text reads on all of them (4.5:1 minimum).
 */
export const floorPalette = [
  '#3CC8F5',
  '#4FD37F',
  '#FFD23F',
  '#FF9150',
  '#B48CFF',
  '#6E9BFF',
  '#FF7AAC',
  '#2FD6C3',
  '#E98AE6',
  '#AEDC3C',
] as const;

/** Thin dark rim that detaches a destination badge from the pastel shelf or cabin behind it. */
export const badgeRim = 'rgba(59, 47, 86, 0.45)';

/** Light wash of each floor colour, used for the floor's "shelf" behind its queue. */
export const floorTints = [
  '#E3F4FC',
  '#E5F8EC',
  '#FFF6DA',
  '#FFEDE2',
  '#F1EBFD',
  '#EBF0FF',
  '#FFE9EF',
  '#E2F8F5',
  '#FDEAF8',
  '#F3FAE0',
] as const;

/** The native animation driver does not exist on web; there animations run in JS. */
export const nativeDriver = Platform.OS !== 'web';

/** Light halo that keeps floating text readable over the pastel tower. */
export function textShadow(blur: number, opacity: number): TextStyle {
  const color = `rgba(255, 255, 255, ${opacity})`;
  return Platform.OS === 'web'
    ? ({ textShadow: `0px 1px ${blur}px ${color}` } as TextStyle)
    : { textShadowColor: color, textShadowRadius: blur, textShadowOffset: { width: 0, height: 1 } };
}
