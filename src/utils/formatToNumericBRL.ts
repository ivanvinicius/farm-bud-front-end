export default function formatToNumericBRL(value: string): string {
  return new Intl.NumberFormat('pt-BR', {
    currency: 'BRL',
  })
    .format(Number(value.replace(',', '.').replace(' ', '')))
    .toString();
}
