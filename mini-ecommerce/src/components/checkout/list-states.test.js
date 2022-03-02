import { render } from '@testing-library/react';
import ListStates from './list-states';

describe('ListState test component', () => {

    test('should generate a list of states', () => {
        const { getByTestId } = render(<ListStates />);
        expect(getByTestId('AM')).toHaveTextContent('Amazonas');
        expect(getByTestId('SP')).toHaveTextContent('São Paulo');
    });
});