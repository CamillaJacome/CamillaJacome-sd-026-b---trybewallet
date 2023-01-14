import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import saveEmail from '../redux/actions';

class Login extends React.Component {
  state = {
    inputPassword: '',
    email: '',
    disabledBtn: true,
  };

  enableBtn = () => {
    const { inputPassword, email } = this.state;
    const six = 6;
    const emailRegex = /^[a-z0-9._-]+@[a-z0-9]+?\.[a-z]+\.?[a-z]+?$/i;
    const invalidEmail = !emailRegex.test(email);
    const invalidName = inputPassword.length < six;
    const disabled = invalidEmail || invalidName;
    this.setState({
      disabledBtn: disabled,
    });
  };

  onHandleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, () => this.enableBtn());
  };

  /* saveUserEmail = () => {
    const { dispatch } = this.props;
    const { email } = this.state;
    dispatch(saveEmail(email));
  }; */

  render() {
    const { inputPassword, email, disabledBtn } = this.state;
    const { dispatch } = this.props;
    return (
      <div id="form-login">
        <form>
          <label htmlFor="input-email">
            Email
            <input
              type="text"
              placeholder="Email"
              id="input-email"
              name="email"
              value={ email }
              onChange={ this.onHandleChange }
              data-testid="email-input"
            />
          </label>
          <label htmlFor="input-password">
            Password
            <input
              type="password"
              placeholder="Password"
              id="input-password"
              name="inputPassword"
              value={ inputPassword }
              onChange={ this.onHandleChange }
              data-testid="password-input"
            />
          </label>
          <Link to="/carteira">
            <button
              type="button"
              disabled={ disabledBtn }
              onClick={ () => dispatch(saveEmail(email)) }
            >
              Entrar
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

/* const mapStateToProps = (state) => {
  console.log('mapStateToProps', state);
  return {
    email: state.user.email,
  };
}; */

const mapStateToProps = (state) => {
  console.log(state.user);
  return {
    email: state.user.email,
  };
};

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Login);
