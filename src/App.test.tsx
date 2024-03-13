import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './configuration/store';
import { MemoryRouter } from 'react-router-dom';
const { expect, describe, it } = require('@jest/globals');
import '@testing-library/jest-dom';

test('renders Filter by ID button', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>);
  const linkElement = screen.findByLabelText(/Filter by ID/i);
  expect(linkElement).not.toBeNull();
});

test('renders columns in the table', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>);

  // Find table headers
  const idHeader = screen.getByText('ID');
  const nameHeader = screen.getByText('Name');
  const yearHeader = screen.getByText('Year');

  // Assert table headers are present
  expect(idHeader).toBeInTheDocument();
  expect(nameHeader).toBeInTheDocument();
  expect(yearHeader).toBeInTheDocument();
});



test('test if filter input accepts string', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>);
  const inputField = screen.getByLabelText(/Filter by ID/i);

  expect(inputField).toBeInTheDocument();

  fireEvent.change(inputField, { target: { value: 'abc' } });
  expect(inputField).toHaveValue(null);

});

test('test if filter input accepts numbers', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>);
  const inputField = screen.getByLabelText(/Filter by ID/i);

  fireEvent.change(inputField, { target: { value: 456 } });
  expect(inputField).toHaveValue(456);
});


