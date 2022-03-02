import { render } from '@testing-library/react';
import axiosMock from 'axios';
import ListCities from './list-cities';

describe('ListCities component test', () => {

    test('must generates a list of citites', async () => {
        axiosMock.get.mockResolvedValueOnce({ data: ['São Paulo', 'Piracicaba'] });
        const { findByTestId } = render(<ListCities state='SP' />);
        expect(axiosMock.get).toHaveBeenCalledTimes(1);
        expect(await findByTestId('São Paulo')).toHaveTextContent('São Paulo');
        expect(await findByTestId('Piracicaba')).toHaveTextContent('Piracicaba');
    });
});