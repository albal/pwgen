import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { waitFor } from '@testing-library/react';



describe('<App />', () => {

  test('renders without crashing', () => {
    render(<App />);
    const linkElement = screen.getByText(/Password Generator/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('defaults to 12 characters', () => {
    render(<App />);
    const inputElement = screen.getByLabelText(/Length:/i);
    expect(inputElement.value).toBe('12');
  });

  test('generates a password', () => {
    render(<App />);
    const generateButton = screen.getByText(/Generate/i);
    fireEvent.click(generateButton);
    const passwordText = screen.getByText(/Password:/i);
    expect(passwordText).toBeInTheDocument();
  });

  test('handles letters checkbox toggling', () => {
    render(<App />);
    const lettersCheckbox = screen.getByLabelText(/Letters:/i);
    expect(lettersCheckbox.checked).toBe(true);
    fireEvent.click(lettersCheckbox);
    expect(lettersCheckbox.checked).toBe(false);
  });

  test('handles numbers checkbox toggling', () => {
    render(<App />);
    const numbersCheckbox = screen.getByLabelText(/Numbers:/i);
    expect(numbersCheckbox.checked).toBe(true);
    fireEvent.click(numbersCheckbox);
    expect(numbersCheckbox.checked).toBe(false);
  });

  test('handles symbols checkbox toggling', () => {
    render(<App />);
    const symbolsCheckbox = screen.getByLabelText(/Symbols:/i);
    expect(symbolsCheckbox.checked).toBe(true);
    fireEvent.click(symbolsCheckbox);
    expect(symbolsCheckbox.checked).toBe(false);
  });



});

