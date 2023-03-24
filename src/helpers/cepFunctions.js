export const getAddress = async (cep) => {
  const awesomeApiURL = `https://cep.awesomeapi.com.br/json/${cep}`;
  const brasilApiURL = `https://brasilapi.com.br/api/cep/v2/${cep}`;
  let fullAd = '';
  await Promise.any([fetch(awesomeApiURL), fetch(brasilApiURL)])
    .then((response) => response.json())
    .then((data) => {
      if (data.cep) {
        fullAd = `${data.address} - ${data.district} - ${data.city} - ${data.state}`
          || `${data.street} - ${data.neighborhood} - ${data.city} - ${data.state}`;
      } else {
        throw new Error('CEP não encontrado');
      }
    });
  return fullAd;
};

export const searchCep = async () => {
  const span = document.querySelector('.cart__address');
  try {
    const cep = document.querySelector('.cep-input').value;
    const address = await getAddress(cep);
    span.innerHTML = address;
  } catch {
    span.innerHTML = 'CEP não encontrado';
  }
};
