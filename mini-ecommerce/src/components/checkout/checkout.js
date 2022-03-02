import { useState } from 'react';
import { Form, Row, Col, Button, Modal } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker, { registerLocale } from 'react-datepicker';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';
import ListStates from './list-states';
import ListCities from './list-cities';
import { Formik } from 'formik';
import * as yup from 'yup';
import { validateCpf, formatCpf } from '../../utils/cpf-util';
import formatCep from '../../utils/cep-util';
import axios from 'axios';

registerLocale('pt', pt);

function Checkout(props) {

    const CHECKOUT_URL = 'http://localhost:3001/mini-ecommerce/checkout/finalize-purchase';

    const [birthDate, setBirthDate] = useState(null);
    const [formSent, setFormSent] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);

    const schema = yup.object({
        email: yup.string().email().required(),
        fullName: yup.string().required().min(5),
        cpf: yup.string().required().min(14).max(14)
            .test('cpf-valid', 'CPF inválido', (cpf) => validateCpf(cpf) ),
        address: yup.string().min(5).required(),
        city: yup.string().required(),
        state: yup.string().required(),
        cep: yup.string().required().min(9).max(9),
        newsletter: yup.string().required(),
        termsConditions: yup.bool().oneOf([true])
    });

    function visible() {
        return props.visible ? null : 'hidden';
    }

    async function finalizePurchase(data) {
        if (!birthDate) {
            setFormSent(true);
            return;
        }
        data.birthDate = birthDate;
        data.products = JSON.stringify(props.products);
        data.total = `R$ ${props.total}`;
        try {
            await axios.post(CHECKOUT_URL, data);
            setShowModal(true);
            props.handleClearCart();
        } catch(err) {
            setShowErrorModal(true);
        }
    }

    function handleBirthDate(date) {
        setBirthDate(date);
    }

    function datePickerCss() {
        if (!formSent) {
            return 'form-control';
        }
        if (birthDate) {
            return 'form-control is valid';
        } else {
            return 'form-control is-invalid';
        }
    }

    function handleContinue() {
        setShowModal(false);
        props.handleShowProducts();
    }

    function handleCloseErrorModal() {
        setShowErrorModal(false);
    }

    return(
        <div className="jumbotron"
            fluid
            style={{margin: '10px'}}
            className={visible()} >
            <h3 className='text-center'>Finalizar Compra</h3>

            <Formik
                onSubmit={(values) => finalizePurchase(values)}
                initialValues={{
                    email: '',
                    fullName: '',
                    cpf: '',
                    address: '',
                    city: '',
                    state: '',
                    cep: '',
                    termsConditions: false,
                    newsletter: 'Y'
                }}
                validationSchema={schema} >
                {({
                    handleSubmit,
                    handleChange,
                    values,
                    touched,
                    errors
                }) => (
                    <Form 
                        noValidate 
                        style={{margin: '10px'}}
                        onSubmit={handleSubmit} >

                        <Form.Group as={Row} controlId='email'>
                            <Form.Label column sm={3}>
                                E-mail
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    type='email'
                                    placeholder='Digite seu e-mail'
                                    name='email'
                                    data-testid='txt-email'
                                    value={values.email}
                                    onChange={handleChange}
                                    isValid={touched.email && !errors.email}
                                    isInvalid={touched.email && !!errors.email} />
                                <Form.Control.Feedback type='invalid'>
                                    Digite um e-mail válido.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId='fullName'>
                            <Form.Label column sm={3}>
                                Nome Completo
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    type='text'
                                    placeholder='Digite seu nome completo'
                                    name='fullName'
                                    data-testid='txt-full-name'
                                    value={values.fullName}
                                    onChange={handleChange}
                                    isValid={touched.fullName && !errors.fullName}
                                    isInvalid={touched.fullName && !!errors.fullName} />
                                <Form.Control.Feedback type='invalid'>
                                    Digite o seu nome completo (mínimo 5 caracteres)
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId='birthDate'>
                            <Form.Label column sm={3}>
                                Data de nascimento
                            </Form.Label>
                            <Col sm={9}>
                                <DatePicker
                                    locale='pt'
                                    peekNextMonth
                                    showMonthDropdrown
                                    showYearDropdown
                                    dropdownMode='select'
                                    dateFormat='dd/MM/yyyy'
                                    placeholderText='Selecione a data'
                                    withPortal
                                    selected={birthDate}
                                    onChange={handleBirthDate}
                                    className={datePickerCss()} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId='cpf'>
                            <Form.Label column sm={3}>
                                CPF
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    type='text'
                                    placeholder='Digite seu CPF'
                                    name='cpf'
                                    data-testid='txt-cpf'
                                    values={values.cpf}
                                    onChange={e => {
                                        e.currentTarget.value = formatCpf(e.currentTarget.value);
                                        handleChange(e);
                                    }}
                                    isValid={touched.cpf && !errors.cpf}
                                    isInvalid={touched.cpf && !!errors.cpf} />
                                <Form.Control.Feedback type='invalid'>
                                    Digite um CPF válido
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId='address'>
                            <Form.Label column sm={3}>
                                Endereço
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control 
                                    type='text'
                                    placeholder='Digite seu endereço completo'
                                    name='address'
                                    data-testid='txt-address'
                                    value={values.address}
                                    onChange={handleChange}
                                    isValid={touched.address && !errors.address}
                                    isInvalid={touched.address && !!errors.address} />
                                <Form.Control.Feedback type='invalid'>
                                    Digite seu endereço
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId='state'>
                            <Form.Label column sm={3}>
                                Estado
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    as='select'
                                    name='state'
                                    data-testid='state'
                                    value={values.state}
                                    onChange={handleChange}
                                    isValid={touched.state && !errors.state}
                                    isInvalid={touched.state && !!errors.state} >
                                    <ListStates />
                                </Form.Control>
                                <Form.Control.Feedback type='invalid'>
                                    Selecione o seu estado
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId='city'>
                            <Form.Label column sm={3}>
                                Cidade
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    as='select'
                                    name='city'
                                    data-testid='city'
                                    value={values.city}
                                    onChange={handleChange}
                                    isValid={touched.city && !errors.city}
                                    isInvalid={touched.city && !!errors.city} >
                                    <option value=''>Selecione a cidade</option>
                                    <ListCities state={values.state} />
                                </Form.Control>
                                <Form.Control.Feedback type='invalid'>
                                    Selecione sua cidade
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId='cep'>
                            <Form.Label column sm={3}>
                                CEP
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    type='text'
                                    placeholder='Digite seu CEP'
                                    name='cep'
                                    data-testid='txt-cep'
                                    value={values.cep}
                                    onChange={e=> {
                                        e.currentTarget.value = formatCep(e.currentTarget.value);
                                        handleChange(e);
                                    }}
                                    isValid={touched.cep && !errors.cep}
                                    isInvalid={touched.cep && !!errors.cep} />
                                <Form.Control.Feedback type='invalid'>
                                    Digite seu CEP
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId='newsletter'>
                            <Form.Label column sm={12}>
                                Deseja receber nossa Newsletter?
                            </Form.Label>
                            <Form.Check
                                inline
                                name='newsletter'
                                type='radio'
                                id='yesNewsletter'
                                value='Y'
                                label='Sim'
                                style={{marginLeft: '10px'}}
                                checked={values.newsletter === 'Y'}
                                onChange={handleChange} />
                            <Form.Check
                                inline
                                name='newsletter'
                                type='radio'
                                id='noNewsletter'
                                value='N'
                                label='Não'
                                checked={values.newsletter === 'N'}
                                onChange={handleChange} />
                        </Form.Group>

                        <Form.Group as={Row} controlId='termsConditions'>
                            <Form.Check
                                name='termsConditions'
                                label='Concordo com os termos e condições'
                                style={{marginLeft: '10px'}}
                                data-testid='check-terms-conditions'
                                value={values.termsConditions}
                                onChange={handleChange}
                                isValid={touched.termsConditions && !errors.termsConditions}
                                isInvalid={touched.termsConditions && !!errors.termsConditions}/>
                        </Form.Group>

                        <Form.Group as={Row} controlId='finalizePurchase'>
                            <Col className='text-center' sm={12}>
                                <Button
                                    type='submit'
                                    variant='success'
                                    data-testid='btn-finalize-purchase' >
                                        Finalizar Compra
                                </Button>
                            </Col>
                        </Form.Group>

                    </Form>
                )}
            </Formik>

            <Modal 
                show={showModal} 
                data-testid='modal-succes-checkout'
                onHide={handleContinue}>
                <Modal.Header closeButton>
                    <Modal.Title>Compra realizada com sucesso!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Um e-mail de confirmação com os detalhes foi enviado.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='success' onClick={handleContinue}>
                        Continuar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal 
                show={showErrorModal} 
                data-testId='modal-error-checkout'
                onHide={handleCloseErrorModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Erro ao processo pedido</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Tente novamente em instantes.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='warning' onClick={handleCloseErrorModal}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );

}

Checkout.proTypes = {
    visible: PropTypes.bool.isRequired,
    handleShowProducts: PropTypes.func.isRequired,
    total: PropTypes.string.isRequired,
    products: PropTypes.object.isRequired,
    handleClearCart: PropTypes.func.isRequired
}

export default Checkout;