import { Platform } from 'react-native';

import { mobileAnalyticsService } from '../services/mobileAnalytics';

/**
 * Performance targets (thresholds) for Core Web Vitals.
 * Based on Google's "Good" thresholds.
 * https://web.dev/vitals/
 */
export const WEB_VITALS_THRESHOLDS = {
  LCP: { good: 2500, needsImprovement: 4000 },  // ms
  FID: { good: 100, needsImprovement: 300 },     // ms
  CLS: { good: 0.1, needsImprovement: 0.25 },    // unitless score
  FCP: { good: 1800, needsImprovement: 3000 },   // ms
  TTFB: { good: 800, needsImprovement: 1800 },   // ms
} as const;

type VitalName = keyof typeof WEB_VITALS_THRESHOLDS;

function getRating(name: VitalName, value: number): 'good' | 'needs-improvement' | 'poor' {
  const threshold = WEB_VITALS_THRESHOLDS[name];
  if (value <= threshold.good) return 'good';
  if (value <= threshold.needsImprovement) return 'needs-improvement';
  return 'poor';
}

function reportVital(name: string, value: number, id: string): void {
  const vitalName = name as VitalName;
  const rating = vitalName in WEB_VITALS_THRESHOLDS
    ? getRating(vitalName, value)
    : 'good';

  mobileAnalyticsService.trackPerformance(name, value, {
    metric_id: id,
    metric_rating: rating,
    platform: 'web',
  });

  if (__DEV__) {
    const emoji = rating === 'good' ? '✅' : rating === 'needs-improvement' ? '⚠️' : '❌';
    console.log(`${emoji} [WebVitals] ${name}: ${value.toFixed(2)} (${rating})`);
  }
}

/**
 * Initialize Core Web Vitals monitoring.
 * Only runs in web environments — no-op on iOS/Android.
 * Tracks: LCP, FID, CLS, FCP, TTFB
 */
export function initWebVitals(): void {
  if (Platform.OS !== 'web') return;

  // Dynamic import to avoid bundling web-vitals into native builds
  import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB }) => {
    onLCP(({ name, value, id }) => reportVital(name, value, id));
    onFID(({ name, value, id }) => reportVital(name, value, id));
    onCLS(({ name, value, id }) => reportVital(name, value, id));
    onFCP(({ name, value, id }) => reportVital(name, value, id));
    onTTFB(({ name, value, id }) => reportVital(name, value, id));
  }).catch((err) => {
    console.warn('[WebVitals] Failed to load web-vitals:', err);
  });
}
