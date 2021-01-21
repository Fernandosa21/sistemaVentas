const API = `${process.env.REACT_APP_API}/cutoff`

export const getCutoffs = async (id_sale) => {
  const response = await fetch(`${API}`);
  const cutoffs = response.json();
  return cutoffs;
}