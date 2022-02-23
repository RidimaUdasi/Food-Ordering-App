import { Fragment } from "react";

import foodImage from "../../assets/food.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {

    return (
        <Fragment>
            <header className = {classes.header}>
                <h1>Happy Meals</h1>
                <HeaderCartButton onClick = {props.onShowCart}/>
            </header>
            <div className = {classes["main-image"]}>
                <img src={foodImage}/>

            </div>
        </Fragment>
    )
}

export default Header;