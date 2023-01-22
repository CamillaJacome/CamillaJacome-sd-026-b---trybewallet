import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const emailInput = 'email-input';
const passwordInput = 'password-input';
const validEmail = 'user@mail.com';

describe('Testa a página de Login', () => {
  test('se a rota da página se inicia no "/"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');
  });
  test('se existe os campos de input de email e senha', () => {
    renderWithRouterAndRedux(<App />);
    const emailElement = screen.getByTestId(emailInput);
    const passwordElement = screen.getByTestId(passwordInput);

    expect(emailElement).toBeInTheDocument();
    expect(passwordElement).toBeInTheDocument();
  });
  test('se existe um botão "entrar"', () => {
    renderWithRouterAndRedux(<App />);
    const buttonElement = screen.getByRole('button', { name: /entrar/i });
    expect(buttonElement).toBeInTheDocument();
  });
  test('se o botão "entrar" permanece desabilitado caso não seja preenchido corretamente os campos de email e senha', () => {
    renderWithRouterAndRedux(<App />);
    const emailElement = screen.getByTestId(emailInput);
    const passwordElement = screen.getByTestId(passwordInput);
    const buttonElement = screen.getByRole('button', { name: /entrar/i });
    // quando o usuário preenche os campos corretamente
    userEvent.type(emailElement, validEmail);
    userEvent.type(passwordElement, '123456');
    expect(buttonElement).not.toBeDisabled();
    userEvent.clear(emailElement);
    userEvent.clear(passwordElement);
    // quando o usuário preenche o campo email no formato incorreto
    userEvent.type(emailElement, 'user');
    userEvent.type(passwordElement, '123456');
    expect(buttonElement).toBeDisabled();
    userEvent.clear(emailElement);
    userEvent.clear(passwordElement);
    // quando o usuário preenche o campo senha com menos de 6 caracters
    userEvent.type(emailElement, validEmail);
    userEvent.type(passwordElement, '12345');
    expect(buttonElement).toBeDisabled();
    userEvent.clear(emailElement);
    userEvent.clear(passwordElement);
  });
  test('se ao clicar no botão "entrar" a rota muda para /carteira', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailElement = screen.getByTestId(emailInput);
    const passwordElement = screen.getByTestId(passwordInput);
    const buttonElement = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(emailElement, validEmail);
    userEvent.type(passwordElement, '123456');
    userEvent.click(buttonElement);
    expect(history.location.pathname).toEqual('/carteira');
  });
});
// 1 acessar

// 2 agir / intetagir

// 3 aferir
