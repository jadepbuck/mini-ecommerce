import { render, fireEvent } from '@testing-library/react';
import Checkout from './checkout';
import axiosMock from 'axios';
import axios from 'axios';

describe('checkout component test', () => {

    const dataCheckout = {
        email: 'jade@gmail.com',
        fullName: 'Fulano de Tal',
        cpf: '808.679.980-83',
        address: 'Avenida Paulista, 890',
        city: 'São Paulo',
        state: 'SP',
        cep: '13400-100',
        termsConditions: true,
        newsletter: 'Y',
        birthDate: new Date('1998-07-21T03:00:00.00Z'),
        products: '{}',
        total: 'R$ 29,99'
    };

    test('must finalize purchase without errors', async () => {
        axiosMock.get.mockResolvedValueOnce({ data: ['São Paulo', 'São Pedro'] });
        const { findByTestId, getByTestId, getByPlaceholderText } = render(
            <Checkout
                visible={true}
                handleShowProducts={() => false}
                total={'29,99'}
                products={{}}
                handleClearCart={() => false} />
        );
        fireEvent.change(getByTestId('txt-email'), { target: { value: 'jade@gmail.com' } });
        fireEvent.change(getByTestId('txt-full-name'), { target: { value: 'Fulano de Tal' }});
        fireEvent.change(getByPlaceholderText('Selecione a data'), { target: { value: '21/07/1998' }});
        fireEvent.change(getByTestId('txt-cpf'), { target: { value: '808.679.980-83' }});
        fireEvent.change(getByTestId('txt-address'), { target: { value: 'Avenida Paulista, 890' }});
        fireEvent.change(getByTestId('state'), { target: {value: 'SP' }});
        const city = await findByTestId('city');
        fireEvent.change(city, { target: { value: 'São Paulo' }});
        fireEvent.change(getByTestId('txt-cep'), { target: { value: '13400-100'}});
        fireEvent.click(getByTestId('check-terms-conditions'));
        fireEvent.click(getByTestId('btn-finalize-purchase'));
        const modal = await findByTestId('modal-succes-checkout');
        expect(modal).toHaveTextContent('Compra realizada com sucesso!');
        expect(axiosMock.get).toHaveBeenCalledTimes(1);
        expect(axiosMock.post).toHaveBeenCalledTimes(1);
        expect(axiosMock.post.mock.calls[0][1]).toStrictEqual(dataCheckout);
    });

});