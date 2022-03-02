import { render } from '@testing-library/react';
import Menu from './menu';

describe('menu component test', () => {
    test('must renders without crashing', () =>{
        const { getByText } = render(
        <Menu 
            products={[]}
            handleShowProducts={() => false}
            handleShowCheckout={() => false} />
        );
        const text = getByText(/mini ecommerce/i);
        expect(text).toBeInTheDocument();
    });
});