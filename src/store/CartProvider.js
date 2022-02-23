import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    if(action.type === 'ADD') {
        console.log("****************************************")
        console.log("this is the state = " + JSON.stringify(state))
        console.log("this is the action item coming in= " + JSON.stringify(action.item))
        console.log("items array of the state: " + JSON.stringify(state.items))

        const existingCartItemIndex = state.items.findIndex( (item) => item.id === action.item.id );

        const existingCartItem = state.items[existingCartItemIndex];

        let updatedItems;

        if(existingCartItem) {
            let updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            }

            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        else {
            updatedItems = state.items.concat(action.item);
        }

        console.log("updated items array after concatenation: " + JSON.stringify(updatedItems))

        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

        console.log("updated total amount of cart: " + JSON.stringify(updatedTotalAmount))
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    } 
    else if(action.type === 'REMOVE') {
        const existingCartItemIndex = state.items.findIndex( (item) => item.id === action.id );
        const existingCartItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingCartItem.price;

        let updatedItems;

        if(existingCartItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.id);

        }
        else {
            const updatedItem = {...existingCartItem, amount: existingCartItem.amount - 1};
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
            
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
        
    }
    else if(action.type === 'CLEAR') { //clear entire cart
        return defaultCartState;       //empty object
    }
    return defaultCartState;
}

const CartProvider = (props) => {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCardHandler = (item) => {
        dispatchCartAction({
            type: 'ADD',
            item: item
        })
    }

    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({
            type: 'REMOVE',
            id: id
        })    
    }

    const clearCartHandler = () => {
        dispatchCartAction({
            type: 'CLEAR',
        })
        
    }

    //dynamic
    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCardHandler,
        removeItem : removeItemFromCartHandler,
        clearCart: clearCartHandler
    }

    return (
        <CartContext.Provider value = {cartContext}>
            {props.children}
        </CartContext.Provider>
    )

}

export default CartProvider;