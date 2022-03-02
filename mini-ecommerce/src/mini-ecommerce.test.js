import { render, screen } from '@testing-library/react';
import MiniEcommerce from './mini-ecommerce';

describe('MiniEcommerce test', () => {

  test('renders without crashing', () => {
    const { getByText } = render(<MiniEcommerce />);
    const linkElement = getByText('Mini Ecommerce');
    expect(linkElement).toBeInTheDocument();
  });

});

