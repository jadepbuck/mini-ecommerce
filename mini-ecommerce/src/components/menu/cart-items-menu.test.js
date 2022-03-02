import { render } from '@testing-library/react';
import CartItemsMenu from './cart-items-menu';

describe('CartItemsMenu component test', () => {

    test('must renders cart empty', () => {
        const { getByTestId } = render(<CartItemsMenu products={[]} />);
        expect(getByTestId('items')).toHaveTextContent('Carrinho vazio...');
    });

    test('must renders cart with one product', () =>{
        const products = [{
            name: 'Aprenda React',
            price: 'R$ 60,90',
            description: 'description',
            quantity: 1
        }];
        const { getByTestId } = render(<CartItemsMenu products={products} />);
        expect(getByTestId(products[0].name)).toHaveTextContent('Aprenda React - 1 x R$ 60,90');
    });

    test('must renders cart with many products', () => {
        const products = [
            {name: 'Aprenda React', price: 'R$ 60,90', description: 'description', quantity: 1},
            {name: 'Aprenda Java', price: 'R$ 47,30', description: 'description2', quantity: 2},
        ];
        const { getByTestId } = render(<CartItemsMenu products={products} />);
        expect(getByTestId(products[0].name)).toHaveTextContent('Aprenda React - 1 x R$ 60,90');
        expect(getByTestId(products[1].name)).toHaveTextContent('Aprenda Java - 2 x R$ 47,30');
    });
});