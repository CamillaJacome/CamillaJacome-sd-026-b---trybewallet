import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies, addExpenses, editExpense } from '../redux/actions';

const INITIAL_CURRENCY = 'USD';
const INITIAL_METHOD = 'Dinheiro';
const INITIAL_TAG = 'Alimentação';

class WalletForm extends Component {
  state = {
    value: '',
    currency: INITIAL_CURRENCY,
    method: INITIAL_METHOD,
    tag: INITIAL_TAG,
    description: '',
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  onInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  fechQuote = async () => {
    // console.log('cliquei');
    try {
      const { expenses, dispatch } = this.props;
      const url = 'https://economia.awesomeapi.com.br/json/all';
      const response = await fetch(url);
      const data = await response.json();
      dispatch(addExpenses({ ...this.state, id: expenses.length, exchangeRates: data }));
      this.setState({
        value: '',
        currency: INITIAL_CURRENCY,
        method: INITIAL_METHOD,
        tag: INITIAL_TAG,
        description: '',
      });
    } catch (error) {
      // console.error(error);
    }
  };

  editTable = () => {
    const { dispatch, expenses, id } = this.props;
    expenses.forEach((expense) => {
      if (expense.id === id) {
        expenses[expense.id] = {
          ...this.state,
          id: expense.id,
          exchangeRates: expense.exchangeRates,
        };
      }
    });
    dispatch(editExpense(expenses));
    this.setState({
      value: '',
      description: '',
      currency: INITIAL_CURRENCY,
      method: INITIAL_METHOD,
      tag: INITIAL_TAG,
    });
  };

  render() {
    const { currencies, editor } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <div>
        <form>
          <input
            type="number"
            name="value"
            id=""
            value={ value }
            data-testid="value-input"
            placeholder="Valor"
            onChange={ this.onInputChange }
          />
          <input
            type="text"
            name="description"
            id=""
            value={ description }
            data-testid="description-input"
            placeholder="Descrição"
            onChange={ this.onInputChange }
          />
          <select
            data-testid="currency-input"
            name="currency"
            value={ currency }
            onChange={ this.onInputChange }
          >
            {currencies.map((currencie) => (
              <option key={ currencie }>{currencie}</option>
            ))}
          </select>
          <select
            data-testid="method-input"
            value={ method }
            name="method"
            onChange={ this.onInputChange }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
          <select
            data-testid="tag-input"
            name="tag"
            value={ tag }
            onChange={ this.onInputChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
          <button
            type="button"
            // onClick={ this.fechQuote }
            disabled={ !value || !description || !currency || !method || !tag }
            onClick={ editor ? this.editTable : this.fechQuote }
          >
            {editor ? 'Editar despesa' : 'Adicionar despesa'}
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
  id: state.wallet.idToEdit,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  editor: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
