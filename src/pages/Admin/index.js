import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProductStart, deleteProductStart, fetchProductStart } from './../../redux/Products/products.actions';
import { firestore } from "./../../firebase/utils";
import Modal from './../../components/Modal';
import FormInput from './../../components/forms/FormInput';
import FormSelect from './../../components/forms/FormSelect';
import Button from './../../components/forms/Button';
import './styles.scss';


const mapState = ({ products }) => ({
    products: products.products
})

const Admin = props => {
    const dispatch = useDispatch();
    const { products } = useSelector(mapState)

    const [hideModal, setHideModal] = useState(true);
    const [productCategory, setProductCategory] = useState('mens');
    const [productName, setProductName] = useState('');
    const [productThumbnail, setProductThumbnail] = useState('');
    const [productPrice, setProductPrice] = useState(0);

    const toggleHide = () => setHideModal(!hideModal);

    const configModal = {
        hideModal,
        toggleHide
    }

    useEffect(() => {
        dispatch(
            fetchProductStart()
        );

        
    }, []);

    const resetForm = () => {
        setHideModal(true);
        setProductCategory('mens');
        setProductName('');
        setProductThumbnail('');
        setProductPrice(0);
    }

    const handleSubmit = e => {
        e.preventDefault();

        dispatch(addProductStart({
            productCategory,
            productName,
            productThumbnail,
            productPrice
        }))

        resetForm();
    };

    return (
        <div className="admin">

            <div className="callToActions">
                <ul>
                    <li>
                        <Button onClick = {() => toggleHide()}>
                            Add new product
                        </Button>
                    </li>
                </ul>
            </div>

            <Modal {...configModal}>
                <div className="addNewProductForm">
                    <form onSubmit={handleSubmit}>

                        <h2>
                            Add new product
                        </h2>

                        <FormSelect
                            label="Category"
                            options={[{
                                value: 'mens',
                                name: 'Men'
                            },
                            {
                                value: 'women',
                                name: 'Women'
                            }]}
                            handleChange={e => setProductCategory(e.target.value)}
                        />

                        <FormInput
                            label="Name"
                            type="text"
                            value={productName}
                            handleChange={e => setProductName(e.target.value)}
                        />

                        <FormInput 
                            label="Main image URL"
                            type="url"
                            value={productThumbnail}
                            handleChange={e => setProductThumbnail(e.target.value)}
                        />

                        <FormInput 
                            label="Price"
                            type="number"
                            min="0.00"
                            max="1000.00"
                            step="0.01"
                            value={productPrice}
                            handleChange={e => setProductPrice(e.target.value)}
                        />

                        <Button type="submit">
                            Add product
                        </Button>

                    </form>
                </div>
            </Modal>

            <div className="manageProducts">
                <table border="0" cellPadding="0" cellSpacing="0">
                    <tbody>
                        <tr>
                            <th>
                                <h1>
                                    Manage Products
                                </h1>
                            </th>
                        </tr>
                        <tr>
                            <td>
                                <table className="results" border="0" cellPadding="10" cellSpacing="0">
                                    <tbody>
                                    {products.map((product, index) => {
                                        const {
                                            productName,
                                            productThumbnail,
                                            productPrice,
                                            documentID
                                        } = product;

                                        return (
                                                <tr key={index}>
                                                    <td>
                                                        <img className="thumb" src={productThumbnail} />
                                                    </td>
                                                    <td>
                                                        {productName}
                                                    </td>
                                                    <td>
                                                        ₹{productPrice}
                                                    </td>
                                                    <td>
                                                        <Button onClick={() => dispatch(deleteProductStart(documentID))}>
                                                            Delete
                                                        </Button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Admin;