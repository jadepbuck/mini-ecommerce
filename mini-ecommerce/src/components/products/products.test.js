import { render } from '@testing-library/react';
import Products from './products';

describe('products component test', () => {
    test('must renders component when visible', () => {
        const { getAllByText } = render(
            <Products visible={true} addProduct={() => false} />
        );
        const buttons = getAllByText(/comprar/i);
        expect(buttons).toBeTruthy;
    });
});