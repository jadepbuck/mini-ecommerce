import PropTypes from 'prop-types';
import { NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSadTear } from '@fortawesome/free-solid-svg-icons';

function CartItemsMenu(props) {

    function render() {

        if (props.products.length === 0) {
            return(
                <NavDropdown.Item href='' data-testid='items'>
                    <FontAwesomeIcon icon={faSadTear} />
                    &nbsp;
                    Carrinho vazio...
                </NavDropdown.Item>
            );
        }

        const items = props.products.map(product => 
            <NavDropdown.Item href='' key={product.name} data-testid={product.name}>
                {product.name} - {product.quantity} x {product.price}
            </NavDropdown.Item>
        );
        return items;
    }

    return render();
}

CartItemsMenu.propTypes = {
    products: PropTypes.array.isRequired
}

export default CartItemsMenu;