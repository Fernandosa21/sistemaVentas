const API = `${process.env.REACT_APP_API}/sales`

export const getSales = async (pending) => {
  const response = await fetch(`${API}/${pending ? 'pending' : 'paid'}`);
  const sales = response.json();
  return sales;
}

export const getSalesByCutoff = async (id_cutoff) => {
  const response = await fetch(`${API}/salesByCutoff/${id_cutoff}`);
  const sales = response.json();
  return sales;
}

export const putSale = async (id_order, pay_method, card, pin) => {
  const response = await fetch(`${API}/updateStatus/${id_order}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      pay_method,
      card,
      pin,
    })
  });
  return response.json();
}