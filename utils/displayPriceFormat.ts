const displayPriceFormat = (price: string) => {
  return `฿ ${price.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};

export default displayPriceFormat;
