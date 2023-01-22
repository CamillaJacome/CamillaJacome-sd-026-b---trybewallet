import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';

const totalField = 'total-field';
const valueInput = 'value-input';
const headerCurrencyField = 'header-currency-field';
const descriptionInput = 'description-input';
// const validEmail = 'user@mail.com';

describe('Testa os compomentes do Header.js', () => {
  test('se existe o email do usuário', () => {
    const initialEntries = ['/carteira'];
    const initialState = { user: { email: 'user@mail.com' } };
    renderWithRouterAndRedux(<App />, { initialState, initialEntries });
    // const emailElement = screen.getByTestId('email-field');
    const emailElement = screen.getByText(/user@mail\.com/i);
    // const emailElement = screen.getByRole('paragraph', { name: /user@mail\.com/i });
    expect(emailElement).toBeInTheDocument();
  });
  test('se existe o valor total das despesas e o cambio BRL', () => {
    const initialEntries = ['/carteira'];
    renderWithRouterAndRedux(<App />, { initialEntries });
    const totalFieldElement = screen.getByTestId(totalField);
    const brlElement = screen.getByTestId(headerCurrencyField);
    expect(totalFieldElement).toBeInTheDocument();
    expect(brlElement).toBeInTheDocument();
    // expect(screen.getByText('0.00'));
  });
  test('se o valor inicial das despesas é 0', () => {
    const initialEntries = ['/carteira'];
    renderWithRouterAndRedux(<App />, { initialEntries });
    const totalFieldElement = screen.getByTestId(totalField);
    expect(totalFieldElement).toHaveTextContent('0');
  });
  describe('testa os componentes do WalletForm', () => {
    test('se a API foi chamada', () => {
      jest.spyOn(global, 'fetch');
      // const dispatch = jest.fn();
      global.fetch.mockResolvedValue(mockData)({
        json: jest.fn().mockResolvedValue(mockData),
      });
      const initialEntries = ['/carteira'];
      renderWithRouterAndRedux(<App />, { initialEntries });
      // verifica a chamada da api
      expect(global.fetch).toHaveBeenCalledTimes(2);
      expect(global.fetch).toHaveBeenCalledWith('https://economia.awesomeapi.com.br/json/all');
      // expect(dispatch).toHaveBeenCalledWith({ type: 'REQUEST_SUCCESSFUL' });
    });
    test('se existe o campo para adicionar o valor', () => {
      const initialEntries = ['/carteira'];
      renderWithRouterAndRedux(<App />, { initialEntries });
      const valueElement = screen.getByTestId(valueInput);
      expect(valueElement).toBeInTheDocument();
    });
    test('se existe o campo para adicionar a descrição', () => {
      const initialEntries = ['/carteira'];
      renderWithRouterAndRedux(<App />, { initialEntries });
      const descriptionElement = screen.getByTestId(descriptionInput);
      expect(descriptionElement).toBeInTheDocument();
    });
    test('se existe um campo para escolher o tipo da moeda', () => {
      const initialEntries = ['/carteira'];
      renderWithRouterAndRedux(<App />, { initialEntries });
      const moedaTypeElement = screen.getByTestId('currency-input');
      expect(moedaTypeElement).toBeInTheDocument();
    });
    test('se existe um campo para adicionar o metodo de pagamento', () => {
      const initialEntries = ['/carteira'];
      renderWithRouterAndRedux(<App />, { initialEntries });
      const methodElement = screen.getByTestId('method-input');
      expect(methodElement).toBeInTheDocument();
    });
    test('se existe um campo escolher a categoria', () => {
      const initialEntries = ['/carteira'];
      renderWithRouterAndRedux(<App />, { initialEntries });
      const tagElement = screen.getByTestId('tag-input');
      expect(tagElement).toBeInTheDocument();
    });
    test('se os valores são adicionados na store', () => {
      const initialState = {
        wallet: {
          currencies: [
            'USD',
            'CAD',
            'GBP',
            'ARS',
            'BTC',
            'LTC',
            'EUR',
            'JPY',
            'CHF',
            'AUD',
            'CNY',
            'ILS',
            'ETH',
            'XRP',
            'DOGE',
          ],
          expenses: [],
          editor: false,
          idToEdit: 0,
        },
      };
      const initialEntries = ['/carteira'];
      renderWithRouterAndRedux(<App />, { initialEntries, initialState });
      const valueElement = screen.getByTestId(valueInput);
      const descriptionElement = screen.getByTestId(descriptionInput);
      const moedaTypeElement = screen.getByTestId('currency-input');
      const methodElement = screen.getByTestId('method-input');
      const tagElement = screen.getByTestId('tag-input');
      const buttonElement = screen.getByRole('button', { name: /adicionar despesa/i });

      // faz os acts
      act(() => {
        userEvent.type(valueElement, '10');
        userEvent.type(descriptionElement, 'Almoço');
        userEvent.selectOptions(
          moedaTypeElement,
          screen.getByRole('option', { name: 'USD' }),
        );
        userEvent.selectOptions(
          methodElement,
          screen.getByRole('option', { name: 'Dinheiro' }),
        );
        userEvent.selectOptions(
          tagElement,
          screen.getByRole('option', { name: 'Lazer' }),
        );
      });

      expect(buttonElement).toBeEnabled();
      act(() => {
        userEvent.click(buttonElement);
      });
    });
    test('se o valor do total field é atualizado depois de adicionar uma despesa', () => {
      const initialEntries = ['/carteira'];
      renderWithRouterAndRedux(<App />, { initialEntries });
      const valueElement = screen.getByTestId(valueInput);
      const buttonElement = screen.getByRole('button', { name: /adicionar despesa/i });
      userEvent.type(valueElement, '1');
      userEvent.click(buttonElement);
      expect(screen.findByText(/5\.24/i));
    });
  });
  describe('testa o componente table', () => {
    test('se existe uma tabela', () => {
      const initialEntries = ['/carteira'];
      const initialState = {
        wallet: {
          currencies: Object.keys(mockData),
          expenses: [
            {
              value: '10',
              description: 'descricao',
              currency: 'USD',
              method: 'Dinheiro',
              tag: 'Almoço',
              id: 0,
              exchangeRates: mockData,
            },
          ],
          editor: false,
          idToEdit: 0,
        },
      };
      renderWithRouterAndRedux(<App />, { initialEntries, initialState });

      const descriptionCollun = screen.getByRole('columnheader', {
        name: /descrição/i,
      });
      expect(descriptionCollun).toBeInTheDocument();
      const description = screen.getByRole('cell', {
        name: /descricao/i,
      });
      expect(description).toBeInTheDocument();

      const tagColumn = screen.getByRole('columnheader', {
        name: /tag/i,
      });
      expect(tagColumn).toBeInTheDocument();
      const tagCell = screen.getByRole('cell', {
        name: /descricao/i,
      });
      expect(tagCell).toBeInTheDocument();

      const methodColumn = screen.getByRole('columnheader', {
        name: /método de pagamento/i,
      });
      expect(methodColumn).toBeInTheDocument();
      const methodCell = screen.getByRole('cell', {
        name: /dinheiro/i,
      });
      expect(methodCell).toBeInTheDocument();

      const valueColumn = screen.getByRole('columnheader', {
        name: 'Valor',
      });
      expect(valueColumn).toBeInTheDocument();
      const valueCell = screen.getByRole('cell', {
        name: /10\.00/i,
      });
      expect(valueCell).toBeInTheDocument();

      const currencyColumn = screen.getByRole('columnheader', {
        name: 'Moeda',
      });
      expect(currencyColumn).toBeInTheDocument();
      const currencyCell = screen.getByRole('cell', {
        name: /dólar americano\/real brasileiro/i,
      });
      expect(currencyCell).toBeInTheDocument();

      const exchangeColumn = screen.getByRole('columnheader', {
        name: /câmbio utilizado/i,
      });
      expect(exchangeColumn).toBeInTheDocument();
      const exchangeCell = screen.getByRole('cell', {
        name: /4\.75/i,
      });
      expect(exchangeCell).toBeInTheDocument();
      const convertedValue = screen.getByRole('columnheader', {
        name: /valor convertido/i,
      });
      expect(convertedValue).toBeInTheDocument();
      const convertedValueCell = screen.getByRole('cell', {
        name: /47\.53/i,
      });
      expect(convertedValueCell).toBeInTheDocument();

      const conversionCurrency = screen.getByRole('columnheader', {
        name: /moeda de conversão/i,
      });
      expect(conversionCurrency).toBeInTheDocument();
      const conversionCell = screen.getByRole('cell', {
        name: 'Real',
      });
      expect(conversionCell).toBeInTheDocument();

      const remove = screen.getByRole('columnheader', {
        name: /editar\/excluir/i,
      });
      expect(remove).toBeInTheDocument();
      const deleteButtonElement = screen.getByTestId('delete-btn');
      const editButtonElement = screen.getByTestId('edit-btn');
      expect(deleteButtonElement).toBeInTheDocument();
      expect(editButtonElement).toBeInTheDocument();
    });
    test('se o botão de excluir funciona', async () => {
      const initialEntries = ['/carteira'];
      const initialState = {
        wallet: {
          currencies: Object.keys(mockData),
          expenses: [
            {
              value: '10',
              description: 'descricao',
              currency: 'USD',
              method: 'Dinheiro',
              tag: 'Almoço',
              id: 0,
              exchangeRates: mockData,
            },
            {
              value: '18',
              description: 'descricao2',
              currency: 'USD',
              method: 'Dinheiro',
              tag: 'Almoço',
              id: 1,
              exchangeRates: mockData,
            },
          ],
          editor: false,
          idToEdit: 0,
        },
      };
      renderWithRouterAndRedux(<App />, { initialEntries, initialState });

      const totalElement = screen.getByTestId(totalField);
      const deleteButton = screen.getAllByRole('button', { name: /excluir/i });

      expect(totalElement).toHaveTextContent('133.09');
      userEvent.click(deleteButton[0]);
      expect(totalElement).toHaveTextContent('85.56');
    });
  });
});
