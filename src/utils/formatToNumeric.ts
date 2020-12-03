export default function formatToNumeric(item: string | number): number {
  const itemToString = String(item);

  return Number(itemToString.replace(',', '.'));
}
