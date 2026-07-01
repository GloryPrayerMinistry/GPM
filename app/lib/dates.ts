export function toDateKey(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function toMonthKey(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
}

export function toYearKey(date = new Date()): string {
  return String(date.getFullYear());
}

export function formatDisplayDate(date = new Date()): string {
  return date.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/** Flyers display on Wednesday, Friday, and Sunday (UK time). */
export function isFlyerDay(date = new Date()): boolean {
  const ukDay = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    weekday: 'short',
  }).format(date);

  return ukDay === 'Sun' || ukDay === 'Wed' || ukDay === 'Fri';
}

export const BIBLE_PLAN_TYPES = ['DAILY', 'MONTHLY', 'YEARLY'] as const;
export type BiblePlanType = (typeof BIBLE_PLAN_TYPES)[number];

export function periodKeyForType(type: BiblePlanType, date = new Date()): string {
  switch (type) {
    case 'DAILY':
      return toDateKey(date);
    case 'MONTHLY':
      return toMonthKey(date);
    case 'YEARLY':
      return toYearKey(date);
  }
}
