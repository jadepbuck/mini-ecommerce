import { render } from '@testing-library/react';
import ListProducts from './list-products';

describe('list products component test', () => {

    test('must shows product`s name', () => {
        const { getByTestId } = render(
            <ListProducts 
                addProduct={() => false} 
                showMessage={() => false} />
        );
        expect(getByTestId('card1')).toHaveTextContent('Aprenda Java');
        expect(getByTestId('card2')).toHaveTextContent('JavaScript em 24 horas');
    });

    test('must shows description`s products', () => {
        const { getByTestId } = render(
            <ListProducts
                addProduct={() => false}
                showMessage={() => false} />
        );
        expect(getByTestId('card4')).toHaveTextContent('Vide electram sadipscing et per.');
        expect(getByTestId('card5')).toHaveTextContent('Vide electram sadipscing et per.');
    });

    test('must shows price`s products', () => {
        const { getByTestId } = render(
            <ListProducts
                addProduct={() => false}
                showMessage={() => false} />
        );
        expect(getByTestId('card1')).toHaveTextContent('Comprar (R$ 59,99)');
        expect(getByTestId('card7')).toHaveTextContent('Comprar (R$ 15,99)');
    });
});