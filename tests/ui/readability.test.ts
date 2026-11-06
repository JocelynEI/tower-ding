import { computeTowerLayout } from '../../src/ui/game/layout';
import { colors, floorPalette } from '../../src/ui/theme';

// 1.1.1: the pastel palette and a narrow shaft made destinations hard to read. These guard it.
function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

function hue(hex: string): number {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const max = Math.max(r, g, b);
  const d = max - Math.min(r, g, b);
  if (d === 0) return 0;
  const h = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return (h * 60 + 360) % 360;
}

describe('destination readability', () => {
  it('keeps the floor number readable on every destination colour', () => {
    for (const color of floorPalette) expect(contrast(color, colors.textPrimary)).toBeGreaterThanOrEqual(4.5);
  });

  it('keeps destination colours vivid, not pastel', () => {
    for (const color of floorPalette) expect(contrast(color, colors.surface)).toBeGreaterThanOrEqual(1.35);
  });

  it('keeps every destination colour a distinct hue', () => {
    const hues = floorPalette.map(hue).sort((a, b) => a - b);
    for (let i = 1; i < hues.length; i++) expect(hues[i] - hues[i - 1]).toBeGreaterThanOrEqual(20);
  });

  it('keeps the cabin wide enough on a phone', () => {
    // Tower area of a 390 × 844 phone.
    expect(computeTowerLayout(390, 640, 10).cabinWidth).toBeGreaterThanOrEqual(80);
  });
});
