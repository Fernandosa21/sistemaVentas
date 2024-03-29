const API = `${process.env.REACT_APP_API}/cutoff`

export const getCutoffs = async (id_sale) => {
  const response = await fetch(`${API}`);
  const cutoffs = response.json();
  return cutoffs;
}

export const putCutoff = async (id_cutoff, user_name, initial_amount, income, total_income, transactions_quantity) => {
  const response = await fetch(`${API}/updateStatus/${id_cutoff}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user_name,
      initial_amount,
      income,
      total_income,
      transactions_quantity,
      status: 'closed'
    })
  });
  return response.json();
}