import { useState } from "react";
import ListProducts from "./list-products";
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';

function Products(props) {

    const [showMsg, setShowMsg] = useState(false);
    const [product, setProduct] = useState('');

    function visible() {
        return props.visible ? null : 'hidden';
    }

    function showMessage(product) {
        setShowMsg(true);
        setProduct(product.name);
        setTimeout(() => {
            setShowMsg(false)
        }, 3000);
    }

    return(
        <div className={visible()}>
            <Alert
                variant='success'
                stule={{ margin: '10px' }}
                show={showMsg}>
                <b> {product} </b> adicionado ao carrinho!
            </Alert>
            <ListProducts 
               showMessage={showMessage} 
               addProduct={props.addProduct} />
        </div>
    );
}

Products.propTypes = {
    visible: PropTypes.bool.isRequired,
    addProduct: PropTypes.func.isRequired
}

export default Products;