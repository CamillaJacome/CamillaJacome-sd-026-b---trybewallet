import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, amount } = this.props;
    // console.log(email);
    return (
      <header>
        <h1>Wallet</h1>
        <p data-testid="email-field">{email}</p>
        <p data-testid="total-field">
          {amount
            .map(
              (value) => Object.values(value.exchangeRates).find(
                (exchangeRate) => exchangeRate.code === value.currency,
              ).ask * value.value,
            )
            .reduce((totalValue, currValue) => totalValue + currValue, 0)
            .toFixed(2)}
        </p>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}
Header.propTypes = {
  email: PropTypes.string.isRequired,
  amount: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  amount: state.wallet.expenses,
});
export default connect(mapStateToProps)(Header);
