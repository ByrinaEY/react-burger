import styles from './ingredient-details.module.css';
import { TIngredient } from '../utils/data-prop-types';
import { FC } from 'react';
import {useSelector } from 'react-redux';
import { loadIngredients } from '../../services/selectors.js';

type TProps={
    id: string; 
}

const IngredientDetails: FC<TProps> = ({id}) => {

    const { ingredients } = useSelector(loadIngredients);
      
    let ingredient;

   if (ingredients){
    ingredient = ingredients.find((el: TIngredient) => el._id === id);  }
       
    if (!ingredient) {
             return <p>'Загружаю ингредиент....'</p>
         } else {
      
    return (
        <div>
            <img className={styles.image} src={ingredient.image} alt={ingredient.name} />
            <p className={'text text_type_main-medium mt-4'}>{ingredient.name}</p>
            <div className={`${styles.CPFC} mt-8 mb-15`}>
                <div >
                <p className='text text_type_main-default text_color_inactive'>Калории, ккал</p>
                <p className='text text_type_main-default text_color_inactive'>{ingredient.calories}</p>
                </div>
                <div>
                <p className='text text_type_main-default text_color_inactive'>Белки, г</p>
                <p className='text text_type_main-default text_color_inactive'>{ingredient.proteins}</p>
                </div>
                <div>
                <p className='text text_type_main-default text_color_inactive'>Жиры, г</p>
                <p className='text text_type_main-default text_color_inactive'>{ingredient.fat}</p>
                </div>
                <div>
                <p className='text text_type_main-default text_color_inactive'>Углеводы, г</p>
                <p className='text text_type_main-default text_color_inactive'>{ingredient.carbohydrates}</p>
                </div>
        </div>
        </div>
    );

         }
};


export default IngredientDetails;