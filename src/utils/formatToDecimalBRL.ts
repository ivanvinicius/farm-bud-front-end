export default function formatToDecimalBRL(value: string | number) {
  return Intl.NumberFormat('pt-BR', {}).format(Number(value));
}
