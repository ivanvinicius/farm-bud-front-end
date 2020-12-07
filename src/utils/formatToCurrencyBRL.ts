export default function formatToCurrencyBRL(value: string | number): string {
  return Intl.NumberFormat('pt-BR', {
    currency: 'BRL',
    style: 'currency',
  })
    .format(Number(value))
    .toString()
    .replace('R$', '');
}
