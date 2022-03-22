const formatCurrency = ({ cents }: { cents: number }): string =>
  Intl.NumberFormat(undefined, {
    currency: 'CAD',
    style: 'currency',
  }).format(cents / 100);

export default formatCurrency;
