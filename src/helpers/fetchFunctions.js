export const fetchProduct = async (id) => {
  if (!id) {
    throw new Error('ID não informado');
  }
  const apiURL = 'https://api.mercadolibre.com/items/';
  const response = await fetch(`${apiURL}${id}`);
  const data = await response.json();
  return data;
};

export const fetchProductsList = async (query) => {
  if (!query) {
    throw new Error('Termo de busca não informado');
  }
  const apiURL = 'https://api.mercadolibre.com/sites/MLB/search?q=';
  const response = await fetch(`${apiURL}${query}`);
  const data = await response.json();
  return data.results;
};
