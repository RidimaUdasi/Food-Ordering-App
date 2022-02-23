import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from './Checkout'

const Cart = (props) => {

    const cartCtx = useContext(CartContext);
    const [isCheckout, setIsCheckout] = useState(false)
    const [isSubmittingForm, setIsSubmittingForm] = useState(false)
    const [didSubmitForm, setdidSubmitForm] = useState(false)

    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler= (id) => {
        cartCtx.removeItem(id)
    }

    const cartItemAddHandler= (item) => {
        cartCtx.addItem({...item, amount: 1});
    }

    const orderHandler = () => {
        setIsCheckout(true)
    }

    const submitOrderHandler = async (userData) => {
        setIsSubmittingForm(true)
        await fetch("https://react-food-ordering-app-28a02-default-rtdb.firebaseio.com/orders.json", 
        {method: 'POST',
        body: JSON.stringify({
            user: userData,
            orderedItems: cartCtx.items
        })
        })
        .then( (res) => {
            return res.json()
        })

        setIsSubmittingForm(false);
        setdidSubmitForm(true);
        cartCtx.clearCart();
    }

    const cartItems = <ul className = {classes['cart-items']}>{
        cartCtx.items.map((item) =>
            (<li><CartItem 
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onAdd={cartItemAddHandler.bind(null, item)}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                />
            </li>)
        )
    }</ul>

    const modalActions = <div className = {classes.actions}>
        <button className = {classes['button--alt']} onClick = {props.onHideCart}>Close</button>
        {hasItems && <button className = {classes.button} onClick={orderHandler}>Order</button>}   
    </div>

    const CartModalContent = (
        <React.Fragment>
            {cartItems}
            <div className = {classes.total}>
                <span>Total amount</span>
                <span><i class="fa fa-inr"></i>{`${cartCtx.totalAmount.toFixed(2)}`}</span>
            </div>
            {isCheckout && <Checkout onCancel={props.onHideCart} onConfirm={submitOrderHandler}/>}
            {!isCheckout && modalActions} 
        </React.Fragment>
    )

    const isSubmittingModalContent = <p>Placing your order...</p>

    const didSubmitModalContent = <React.Fragment>
            <p>Order Successful!</p>
            <div className = {classes.actions}>
                <button className = {classes['button']} onClick = {props.onHideCart}>Close</button>  
            </div>
        </React.Fragment>

    return (
        <Modal onHideCart = {props.onHideCart}>
               {!isSubmittingForm && !didSubmitForm && CartModalContent}
               {isSubmittingForm && isSubmittingModalContent}
               {!isSubmittingForm && didSubmitForm && didSubmitModalContent}
        </Modal>
    )

}

export default Cart;