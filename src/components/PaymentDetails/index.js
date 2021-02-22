import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { CountryDropdown } from 'react-country-region-selector';

// components
import FormInput from '../forms/FormInput';
import Button from '../forms/Button';
import MessageBox from '../MessageBox';

import { selectCartTotal, selectCartItemsCount, selectCartItems } from '../../redux/Cart/cart.selectors';
import { createStructuredSelector } from "reselect";
import { useSelector, useDispatch } from 'react-redux';

import { saveOrderHistory } from "../../redux/Orders/orders.actions";
import { clearCart } from "../../redux/Cart/cart.actions";

import { apiInstance } from '../../Utils';
import './styles.scss';


const initialAddressState = {
    line1: '',
    line2: '',
    city: '',
    state: '',
    postal_code: '',
    country: '',
};

const mapState = createStructuredSelector({
    total: selectCartTotal,
    itemsCount: selectCartItemsCount,
    cartItems: selectCartItems
});

const PaymentDetails = props => {
    const elements = useElements();
    const stripe = useStripe();
    const { total, itemsCount, cartItems } = useSelector(mapState);
    const dispatch = useDispatch();
    const history = useHistory();

    const [billingAddress, setBillingAddress] = useState({ ...initialAddressState });
    const [shippingAddress, setShippingAddress] = useState({ ...initialAddressState });
    const [recipientName, setRecipientName] = useState("");
    const [nameOnCard, setNameOnCard] = useState("");
    const [paymentErr, setPaymentErr] = useState("");
    const [showMsg, setShowMsg] = useState(false);

    useEffect(() => {
        if(itemsCount < 1) {
            history.push('/dashboard');
        }
    }, [itemsCount]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const cardElement = elements.getElement('card');

        if (
            !shippingAddress.line1 || !shippingAddress.city ||
            !shippingAddress.state || !shippingAddress.postal_code ||
            !shippingAddress.country ||
            !billingAddress.line1 || !billingAddress.city ||
            !billingAddress.state || !billingAddress.postal_code ||
            !billingAddress.country ||
            !recipientName || !nameOnCard
        ) return;

        apiInstance.post('/payments/create', {
            amount: total * 100,
            shipping: {
                name: recipientName,
                address: {
                    ...shippingAddress
                }
            }
        }).then( ({ data: clientSecret }) => {
            stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
                billing_details: {
                    name: nameOnCard,
                    address: {
                        ...billingAddress
                    }
                }
            }).then( ({ paymentMethod, error }) => {
                if(error) {
                    setPaymentErr(error.message);
                    setShowMsg(true);
                    return;
                }

                stripe.confirmCardPayment(clientSecret, {
                    payment_method: paymentMethod.id
                }).then(({ paymentIntent }) => {
                    
                    const configOrder = {
                        orderTotal: total,
                        orderItems: cartItems.map(item => {
                            const { documentID, productThumbnail, productName,
                                productPrice, quantity } = item;

                            return {
                                documentID,
                                productThumbnail,
                                productName,
                                productPrice,
                                quantity
                            };
                        })
                    }
                    
                    dispatch(
                        saveOrderHistory(configOrder)
                    )
                })
                .catch(err => {
                    setPaymentErr(err.message);
                    setShowMsg(true);
                });
            } )
            .catch(err => {
                setPaymentErr(err.message);
                setShowMsg(true);
            });
        }).catch(err => {
            setPaymentErr(err.message);
            setShowMsg(true);
        });

    }

    const handleChangeShipping = e => {
        setShippingAddress({
            ...shippingAddress,
            [e.target.name]: e.target.value
        })
    }
    const handleChangeBilling = e => {
        setBillingAddress({
            ...billingAddress,
            [e.target.name]: e.target.value
        })
    }

    const configCardElement = {
        iconStyle: 'solid',
        style: {
            base: {
                fontSize: '16px'
            }
        },
        hidePostalCode: true
    }

    return (
        <div className="paymentDetails" onClick={() => setShowMsg(false)}>
            <form onSubmit={handleSubmit}>

                <div className="group">
                    <h2>
                        Shipping Address
                    </h2>

                    <FormInput
                        required
                        placeholder="Recipient Name"
                        name="recipientName"
                        value={recipientName}
                        handleChange={e => setRecipientName(e.target.value)}
                        type="text"
                    />
                    <FormInput
                        required
                        placeholder="Line 1"
                        name="line1"
                        value={shippingAddress.line1}
                        handleChange={e => handleChangeShipping(e)}
                        type="text"
                    />
                    <FormInput
                        placeholder="Line 2"
                        name="line2"
                        value={shippingAddress.line2}
                        handleChange={e => handleChangeShipping(e)}
                        type="text"
                    />
                    <FormInput
                        required
                        placeholder="City"
                        name="city"
                        value={shippingAddress.city}
                        handleChange={e => handleChangeShipping(e)}
                        type="text"
                    />
                    <FormInput
                        required
                        placeholder="State"
                        name="state"
                        value={shippingAddress.state}
                        handleChange={e => handleChangeShipping(e)}
                        type="text"
                    />
                    <FormInput
                        required
                        placeholder="Postal code"
                        name="postal_code"
                        value={shippingAddress.postal_code}
                        handleChange={e => handleChangeShipping(e)}
                        type="text"
                    />
                    <div className="formRow checkoutInput">
                        <CountryDropdown
                            required
                            valueType='short'
                            value={shippingAddress.country}
                            onChange={val => handleChangeShipping({
                                target: {
                                    name: 'country',
                                    value: val
                                }
                            })}
                        />
                    </div>
                </div>

                <div className="group">
                    <h2>
                        Billing Address
                    </h2>
                    <FormInput
                        required
                        placeholder="Name on card"
                        name="nameOnCard"
                        value={nameOnCard}
                        handleChange={e => setNameOnCard(e.target.value)}
                        type="text"
                    />
                    <FormInput
                        required
                        placeholder="Line 1"
                        name="line1"
                        value={billingAddress.line1}
                        handleChange={e => handleChangeBilling(e)}
                        type="text"
                    />
                    <FormInput
                        placeholder="Line 2"
                        name="line2"
                        value={billingAddress.line2}
                        handleChange={e => handleChangeBilling(e)}
                        type="text"
                    />
                    <FormInput
                        required
                        placeholder="City"
                        name="city"
                        value={billingAddress.city}
                        handleChange={e => handleChangeBilling(e)}
                        type="text"
                    />
                    <FormInput
                        required
                        placeholder="State"
                        name="state"
                        value={billingAddress.state}
                        handleChange={e => handleChangeBilling(e)}
                        type="text"
                    />
                    <FormInput
                        required
                        placeholder="Postal code"
                        name="postal_code"
                        value={billingAddress.postal_code}
                        handleChange={e => handleChangeBilling(e)}
                        type="text"
                    />

                    <div className="formRow checkoutInput">
                        <CountryDropdown
                            required
                            valueType='short'
                            value={billingAddress.country}
                            onChange={val => handleChangeBilling({
                                target: {
                                    name: 'country',
                                    value: val
                                }
                            })}
                        />
                    </div>
                </div>

                <div className="group">
                    <h2>
                        Card Details
                    </h2>
                    <CardElement
                        options={configCardElement}
                    />
                </div>


                <Button type="submit">
                    Pay Now
                </Button>
                <MessageBox msg={paymentErr} show={showMsg} />
            </form>
        </div>
    );
};

export default PaymentDetails;