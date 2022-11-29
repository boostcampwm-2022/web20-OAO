export const onlyDate = (date: Date): Date => new Date(date.getFullYear(), date.getMonth(), date.getDate());
export const isEqualDate = (d1: Date, d2: Date): boolean => onlyDate(d1).getTime() === onlyDate(d2).getTime();
