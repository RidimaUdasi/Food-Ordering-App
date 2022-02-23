import classes from "./MealItemForm.module.css";
//import Input from "../../UI/Input";
//import React from "react";
import { useRef, useState } from "react";

const MealItemForm = (props) => {

    const amountInputRef = useRef();

    const [amountIsValid, setAmountIsValid] = useState(true);

    const submitHandler = (event) => {
        
        event.preventDefault();

        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;

        if(enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5) {
            setAmountIsValid(false);
            return;
        }

        props.onAddToCart(enteredAmountNumber);
    }

    return (
        <form className = {classes.form} onSubmit={submitHandler}>
            <div className = {classes.inputDiv}>
                <label>Amount</label>
                <input
                    ref={amountInputRef}
                    label="Amount" 
                    type= 'number'
                    id= 'amount'
                    min= '1'
                    max= '5'
                    step= '1'
                    defaultValue= '1'
                    
                />
            </div>
            <button>+ Add</button>
            {
                !amountIsValid && <p>Please enter a valid amount (1-5).</p>
            }
        </form>
    )
}

export default MealItemForm;

/*
Replaced custom Input with plain JSX input,
previous code 
<Input 
    ref={amountInputRef}
    label="Amount" 
    input={{
        type: 'number',
        id: 'amount',
        min: '1',
        max: '5',
        step: '1',
        defaultValue: '1'
    }}
/>

*/
