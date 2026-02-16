import type { NovaSpacing } from '../theme/types';

/**
 * Creates consistent spacing values from theme spacing.
 */
export function createSpacing(spacing: NovaSpacing) {
  return {
    padding: (key: keyof NovaSpacing) => spacing[key],
    margin: (key: keyof NovaSpacing) => spacing[key],
    gap: (key: keyof NovaSpacing) => spacing[key],
    multiply: (key: keyof NovaSpacing, factor: number) =>
      spacing[key] * factor,
  };
}
