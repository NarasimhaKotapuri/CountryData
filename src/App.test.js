import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Sort/i);
  expect(linkElement).toBeInTheDocument();
});

describe('Greet',()=>{
  test('Checking labels',()=>{
      render(<App />)
      let testSelect = screen.getByDisplayValue('Region')
      expect(testSelect).toBeInTheDocument()
  })
})