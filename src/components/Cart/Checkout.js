import classes from './Checkout.module.css';
import { useRef, useState } from 'react';

//helper functions
const isEmpty = value => value.trim() === '';
const isSixChars = value => value.trim().length === 6;

const Checkout = (props) => {

    const [formInputIsValid, setFormInputIsValid] = useState({
        name: true, //true bcuz we don't want to show any error in the beginning
        street: true,
        postalCode: true,
        city: true
    })

    const nameInputRef = useRef()
    const streetInputRef = useRef()
    const postalCodeInputRef = useRef()
    const cityInputRef = useRef()

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName)
    const enteredStreetIsValid = !isEmpty(enteredStreet)
    const enteredPostalCodeIsValid = !isEmpty(enteredPostalCode) && isSixChars(enteredPostalCode)
    const enteredCityIsValid = !isEmpty(enteredCity)

    setFormInputIsValid({
        name: enteredNameIsValid,
        street: enteredStreetIsValid,
        postalCode: enteredPostalCodeIsValid,
        city: enteredCityIsValid
    });

    const formIsValid = enteredCityIsValid && enteredNameIsValid && enteredPostalCodeIsValid && enteredStreetIsValid;

    if(!formIsValid) {
        return;
    }

    props.onConfirm({
        name: enteredName,
        street: enteredStreet,
        postalCode: enteredPostalCode,
        city: enteredCity
    });

  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${formInputIsValid.name ? '' : classes.invalid}`}>
        <label htmlFor='name'>Your Name</label>
        <input ref={nameInputRef} type='text' id='name' />
        {!formInputIsValid.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={`${classes.control} ${formInputIsValid.street ? '' : classes.invalid}`}>
        <label htmlFor='street'>Street</label>
        <input ref={streetInputRef} type='text' id='street' />
        {!formInputIsValid.street && <p>Please enter a valid Street name!</p>}
      </div>
      <div className={`${classes.control} ${formInputIsValid.postalCode ? '' : classes.invalid}`}>
        <label htmlFor='postal'>Postal Code</label>
        <input ref={postalCodeInputRef} type='text' id='postal' />
        {!formInputIsValid.postalCode && <p>Please enter a valid Postal Code!</p>}
      </div>
      <div className={`${classes.control} ${formInputIsValid.city ? '' : classes.invalid}`}>
        <label htmlFor='city'>City</label>
        <input ref={cityInputRef} type='text' id='city' />
        {!formInputIsValid.city && <p>Please enter a valid City name!</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;