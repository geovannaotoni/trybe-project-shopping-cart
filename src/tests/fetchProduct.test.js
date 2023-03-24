import './mocks/fetchSimulator';
import { fetchProduct } from '../helpers/fetchFunctions';
import product from './mocks/product';

// implemente seus testes aqui.
describe('Teste a função fetchProduct', () => {
  const produto = 'MLB1405519561';
  it('fetchProduct é uma função', () => {
    expect(typeof fetchProduct).toBe('function');
  });

  it('fetch é chamado ao executar fetchProduct com o argumento', async () => {
    await fetchProduct(produto);
    expect(fetch).toHaveBeenCalled();
  });

  it('fetch é chamado com o endpoint correto ao executar fetchProduct', async () => {
    await fetchProduct(produto);
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1405519561');
  });

  it('o retorno da função fetchProduct com o argumento é uma estrutura de dados igual ao objeto produto', async () => {
    await expect(fetchProduct(produto)).resolves.toEqual(product);
  });

  it('ao chamar a função fetchProduct sem argumento retorna um erro com a mensagem correta', async () => {
    await expect(fetchProduct()).rejects.toThrow(new Error('ID não informado'));
  });
});
