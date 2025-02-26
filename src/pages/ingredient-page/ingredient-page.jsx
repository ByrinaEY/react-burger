import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { loadIngredients } from '../../services/selectors.js';
import { SET_DISPLAYES_INGREDIENT } from '../../services/actions/ingredients-details.js';
import { loadIngredientsAction } from '../../services/actions/burger-ingredients.js';
import { useEffect } from 'react';
import styles from './ingredient-page.module.css';


export function IngredientPage() {
    const { ingredients } = useSelector(loadIngredients);
    const dispatch = useDispatch();
    const location = useLocation();
    const id = location.pathname.slice(13);
    let item = {};

    useEffect(() => {
        dispatch(loadIngredientsAction());
          
    }, []);
   if (ingredients ){
     item = ingredients.find(el => el._id === id);  
     dispatch({ type: SET_DISPLAYES_INGREDIENT, ingredient: item });
    console.log(item);
    if (!item) {
             return <p>'Загружаю ингредиент....'</p>
         } else {
    return (
                <div className ={styles.ingrDetail}>
                    <IngredientDetails ingredient={item} /> 
                </div>
            );
   }
}
}