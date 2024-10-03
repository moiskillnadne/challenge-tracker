export function convertDate(day: number, exactMonth?: number) {
  const today = new Date();
  const year = today.getFullYear();

  const rawMonth = exactMonth ? exactMonth : today.getMonth();
  const month = String(rawMonth + 1).padStart(2, '0');
  const dayString = String(day).padStart(2, '0');

  return `${year}-${month}-${dayString}`;
}
