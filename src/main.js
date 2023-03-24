import { searchCep } from './helpers/cepFunctions';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import './style.css';

import { createCartProductElement,
  createProductElement,
  getPrices } from './helpers/shopFunctions';
import { getSavedCartIDs } from './helpers/cartFunctions';

document.querySelector('.cep-button').addEventListener('click', searchCep);

// Requisito 10 - Calcule o valor total dos itens do carrinho de compras -> Passei para o arquivo shopFunctions
// const getPrices = () => {
//   const spanTotalPrice = document.querySelector('.total-price');
//   const spanPrices = document.querySelectorAll('section.cart span.product__price__value');
//   let total = 0;
//   spanPrices.forEach((element) => {
//     total += Number(element.innerHTML);
//   });
//   spanTotalPrice.innerHTML = total;
// };

// Requisito 4 - Adicione um texto de carregando durante uma requisição à API
const loadingText = () => {
  const p = document.createElement('p');
  const sectionProducts = document.querySelector('.products');
  p.innerHTML = 'carregando...';
  p.classList.add('loading');
  sectionProducts.appendChild(p);
};

const removeLoadingText = () => {
  const p = document.querySelector('.loading');
  p.remove();
};

// Requisito 3 - Crie uma listagem de produtos
const loadComputerProducts = async () => {
  loadingText();
  const sectionProducts = document.querySelector('.products');
  try {
    const arrayProducts = await fetchProductsList('computador');
    // console.log(arrayProducts);
    arrayProducts.forEach((product) => {
      const section = createProductElement(product);
      sectionProducts.appendChild(section);
    });
  } catch {
    const p = document.createElement('p');
    p.innerHTML = 'Algum erro ocorreu, recarregue a página e tente novamente';
    p.classList.add('error');
    sectionProducts.appendChild(p);
  }
  removeLoadingText();
};

// Requisito 9 - Carregue o carrinho de compras ao iniciar a página
const getSavedCartProducts = () => {
  const arrayIds = getSavedCartIDs();
  // console.log(arrayIds);
  const arrayPromisses = arrayIds.map((id) => fetchProduct(id));
  // console.log(arrayPromisses);
  Promise.all(arrayPromisses)
    .then((data) => data.forEach((product) => {
      const li = createCartProductElement(product);
      const ol = document.querySelector('.cart__products');
      ol.appendChild(li);
      // Requisito 10
      getPrices();
    }));
};

window.onload = () => {
  loadComputerProducts();
  getSavedCartProducts();
};
