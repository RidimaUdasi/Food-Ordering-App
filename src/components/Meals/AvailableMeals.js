import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";
import { useEffect, useState } from "react";

const AvailableMeals = () => {

  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true); //set to true bcuz we know as soon as the page loads, we will be fetching data
  const [httpError, setHttpError] = useState('');

  useEffect( ()=> {
    const loadedMeals = [];
    fetch("https://react-food-ordering-app-28a02-default-rtdb.firebaseio.com/meals.json")
            .then((response) => {
              setIsLoading(false);
              if(!response.ok) {
                throw new Error("Something went wrong!")
              }
              return response.json();
            })
            .then( (data) => {
              for(const key in data) {
                loadedMeals.push ({
                  id: key,
                  name: data[key].name,
                  description: data[key].description,
                  price: data[key].price
                })
              }
              setMeals(loadedMeals);
            }) 
            .catch((err) => {
              setIsLoading(false);
              setHttpError(err.message)
            })  
  }, [])

    if(isLoading) {
      return (
        <section className={classes.MealsLoading}>
          <p>Loading...</p>
        </section>
      )
    }

    if(httpError) {
      return (
        <section className={classes.MealsError}>
          <p>{httpError}</p>
        </section>
      )
    }

    const mealsList = meals.map((meal) => (
    <MealItem 
      key = {meal.id}
      id = {meal.id}
      name = {meal.name}
      description = {meal.description}
      price = {meal.price}
      />
    ));

    return (
        <section className = {classes.meals}>
          <Card>
            <ul>
                {mealsList}
            </ul>
          </Card>
        </section>
    )
}

export default AvailableMeals;