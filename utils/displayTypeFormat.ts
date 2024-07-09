const displayTypeFormat = (type: string) => {
  switch (type) {
    case 'place_ask':
      return 'ASK';
    case 'pre_order':
      return 'PRE-ORDER';
    default:
      return type;
  }
};

export default displayTypeFormat;
