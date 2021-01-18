const API = `${process.env.REACT_APP_API}/saleDetails`

export const getSaleDetails = async (id_sale) => {
  const response = await fetch(`${API}/${id_sale}`);
  const sales = response.json();
  return sales;
}
