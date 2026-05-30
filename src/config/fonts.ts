/**
 * Font Configuration
 * 
 * Centralized configuration for all fonts used in the application.
 * This file defines font families, weights, and loading strategies.
 */

export interface FontFamily {
  name: string;
  weights: Record<string, string>;
  source: string;
  subset: string[];
  priority: 'critical' | 'important' | 'optional';
}

export const FONT_FAMILIES: Record<string, FontFamily> = {
  Inter: {
    name: 'Inter',
    weights: {
      '400': 'Inter-Regular',
      '500': 'Inter-Medium',
      '600': 'Inter-SemiBold',
      '700': 'Inter-Bold',
    },
    source: 'Inter',
    subset: ['latin', 'latinExtended', 'symbols'],
    priority: 'critical',
  },
  // Add more font families as needed
  // Roboto: {
  //   name: 'Roboto',
  //   weights: {
  //     '400': 'Roboto-Regular',
  //     '500': 'Roboto-Medium',
  //     '700': 'Roboto-Bold',
  //   },
  //   source: 'Roboto',
  //   subset: ['latin', 'latinExtended'],
  //   priority: 'important',
  // },
};

// Font weight mappings
export const FONT_WEIGHTS = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

// Font size scale (using 8px grid system)
export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
  '6xl': 60,
} as const;

// Line height scale
export const LINE_HEIGHTS = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.75,
  loose: 2,
} as const;

// Letter spacing
export const LETTER_SPACING = {
  tighter: -0.05,
  tight: -0.025,
  normal: 0,
  wide: 0.025,
  wider: 0.05,
  widest: 0.1,
} as const;

// Typography presets
export const TYPOGRAPHY_PRESETS = {
  h1: {
    fontSize: FONT_SIZES['6xl'],
    fontWeight: FONT_WEIGHTS.bold,
    lineHeight: LINE_HEIGHTS.tight,
    letterSpacing: LETTER_SPACING.tight,
  },
  h2: {
    fontSize: FONT_SIZES['5xl'],
    fontWeight: FONT_WEIGHTS.bold,
    lineHeight: LINE_HEIGHTS.tight,
    letterSpacing: LETTER_SPACING.tight,
  },
  h3: {
    fontSize: FONT_SIZES['4xl'],
    fontWeight: FONT_WEIGHTS.semibold,
    lineHeight: LINE_HEIGHTS.tight,
    letterSpacing: LETTER_SPACING.normal,
  },
  h4: {
    fontSize: FONT_SIZES['3xl'],
    fontWeight: FONT_WEIGHTS.semibold,
    lineHeight: LINE_HEIGHTS.tight,
    letterSpacing: LETTER_SPACING.normal,
  },
  body: {
    fontSize: FONT_SIZES.base,
    fontWeight: FONT_WEIGHTS.regular,
    lineHeight: LINE_HEIGHTS.normal,
    letterSpacing: LETTER_SPACING.normal,
  },
  bodyLarge: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.regular,
    lineHeight: LINE_HEIGHTS.normal,
    letterSpacing: LETTER_SPACING.normal,
  },
  bodySmall: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.regular,
    lineHeight: LINE_HEIGHTS.normal,
    letterSpacing: LETTER_SPACING.normal,
  },
  caption: {
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.regular,
    lineHeight: LINE_HEIGHTS.tight,
    letterSpacing: LETTER_SPACING.normal,
  },
  button: {
    fontSize: FONT_SIZES.base,
    fontWeight: FONT_WEIGHTS.semibold,
    lineHeight: LINE_HEIGHTS.tight,
    letterSpacing: LETTER_SPACING.wide,
  },
} as const;

// Font loading configuration
export const FONT_LOADING_CONFIG = {
  // Critical fonts that must load before app renders
  critical: ['Inter-Regular', 'Inter-Medium', 'Inter-Bold'],
  
  // Important fonts that should load soon after
  important: ['Inter-SemiBold'],
  
  // Optional fonts that can load on demand
  optional: [],
  
  // Loading strategy
  strategy: 'preload-critical' as const,
  
  // Fallback settings
  fallback: 'System',
  
  // Display strategy
  display: 'swap' as const,
};

// Character sets for subsetting
export const CHARACTER_SETS = {
  latin: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~ ',
  latinExtended: 'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ',
  cyrillic: 'АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя',
  greek: 'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρστυφχψω',
  symbols: '©®™€£¥₩₽₹₺₸₼₿₾₱₲₴₵₶₷₸₹₺₻₼₽₾₿',
  numbers: '0123456789',
  punctuation: '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~',
};

// Utility functions
export function getFontWeight(weight: keyof typeof FONT_WEIGHTS): string {
  return FONT_WEIGHTS[weight];
}

export function getFontSize(size: keyof typeof FONT_SIZES): number {
  return FONT_SIZES[size];
}

export function getTypographyPreset(preset: keyof typeof TYPOGRAPHY_PRESETS) {
  return TYPOGRAPHY_PRESETS[preset];
}

export function getFontFamily(family: keyof typeof FONT_FAMILIES): FontFamily {
  return FONT_FAMILIES[family];
}

export function getFontName(family: string, weight: string): string {
  const fontFamily = FONT_FAMILIES[family];
  if (!fontFamily) return family;
  return fontFamily.weights[weight] || family;
}
