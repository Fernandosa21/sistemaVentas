const API = `${process.env.REACT_APP_API}/sales`

export const getSales = async (pending) => {
  const response = await fetch(`${API}/${pending ? 'pending' : 'paid'}`);
  const sales = response.json();
  return sales;
}
