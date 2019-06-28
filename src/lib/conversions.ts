export const metersToMiles = (meters: number): string => {
    return Math.max(Math.round(meters * 0.000621371 * 10) / 10, 2.8).toFixed(1);
  };