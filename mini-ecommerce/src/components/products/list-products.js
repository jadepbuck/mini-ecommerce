import placeholder from '../../images/286x180.png';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

function ListProducts(props) {

    const products = [
        { name: 'Aprenda Java', price: 'R$ 59,99', description: 'Vide electram sadipscing et per.' },
		{ name: 'JavaScript em 24 horas', price: 'R$ 19,99', description: 'Aenean aliquam, vitae iaculis nisl.' },
		{ name: 'React em 7 dias', price: 'R$ 29,99', description: 'Seru eleam sadipsng el dro.' },
		{ name: 'Algoritmos e Estrutura de Dados', price: 'R$ 25,99', description: 'Vide electram sadipscing et per.' },
		{ name: 'Start-Up', price: 'R$ 29,99', description: 'Vide electram sadipscing et per.' },
		{ name: 'Testes Unitários com Jasmine', price: 'R$ 14,99', description: 'Vide electram sadipscing et per.' },
		{ name: 'APIs RESTful com Spring e Java', price: 'R$ 15,99', description: 'Vide electram sadipscing et per.' },
		{ name: 'TypeScript na prática', price: 'R$ 9,99', description: 'Vide electram sadipscing et per.' }
    ];

    function handleBuy(event, product) {
        event.preventDefault();
        props.addProduct(product);
        props.showMessage(product);
    }

    function render() {
        let key = 1;
        const cards = products.map(product =>
            <Card 
                key={key}
                data-testid={'card' + key++}
                style={{ width: '18rem', margin: '10px', float: 'left' }}>
                <Card.Img variant='top' src={placeholder} />
                <Card.Body className='text-center'>
                    <Card.Title style={{ height: '40px' }}>
                        {product.name}
                    </Card.Title>
                    <Card.Text>
                        {product.description}
                    </Card.Text>
                    <Button
                        variant='success'
                        style={{ width: '100%' }}
                        onClick={(event) => handleBuy(event, product)}>
                        Comprar ({product.price})
                    </Button>
                </Card.Body>
            </Card>
        );
        return cards;
    }
    return render();
}

ListProducts.propTypes = {
    addProduct: PropTypes.func.isRequired,
    showMessage: PropTypes.func.isRequired
}

export default ListProducts;