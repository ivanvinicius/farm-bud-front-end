export default function formatToNumeric(item: string | number): number {
  return Number(item.toString().replace(',', '.'));
}
