import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket, faCashRegister, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import CartItemsMenu from './cart-items-menu';

function Menu(props) {

    function calculateTotal() {
        if (props.products.length === 0) {
            return '0,00';
        }
        let total = 0;
        props.products.forEach(product => {
            let price = product.price.replace(',', '.').replace('R$ ', '');
            total += parseFloat(price) * product.quantity;
        });
        return total.toFixed(2).toString().replace('.', ',');
    }

    return(
        <Navbar bg='dark' variant='dark'>
            <Navbar.Brand href='' >Mini Ecommerce</Navbar.Brand>
            <Navbar.Collapse className='justify-content-end'>
                <Nav>
                    <NavDropdown
                        title={
                            <div style={{ display: 'inline-block' }}>
                                <FontAwesomeIcon icon={faShoppingCart} />
                                &nbsp;
                                Carrinho
                            </div>
                        }
                        drop='left'>

                        <NavDropdown.Item href='' onClick={props.handleShowProducts}>
                            <FontAwesomeIcon icon={faShoppingBasket} />
                            &nbsp;
                            <strong>Produtos</strong>
                        </NavDropdown.Item>

                        <NavDropdown.Divider/>

                        <CartItemsMenu products={props.products} />

                        <NavDropdown.Divider/>

                        <NavDropdown.Item href='' data-testid='total-cart'>
                            Total: R$ {calculateTotal()}
                        </NavDropdown.Item>

                        <span className={props.products.length === 0 ? 'hidden' : null}>
                            <NavDropdown.Divider />
                            <NavDropdown.Item
                                href=''
                                style={{ color: 'green' }}
                                onClick={() => props.handleShowCheckout(calculateTotal())} >
                                <FontAwesomeIcon icon={faCashRegister} />
                                &nbsp;
                                Finalizar compra
                            </NavDropdown.Item>
                        </span>

                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

Menu.propTypes = {
    products: PropTypes.array.isRequired,
    handleShowProducts: PropTypes.func.isRequired,
    handleShowCheckout: PropTypes.func.isRequired
}

export default Menu;