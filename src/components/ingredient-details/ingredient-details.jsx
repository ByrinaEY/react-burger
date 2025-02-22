import styles from './ingredient-details.module.css';
import PropTypes from 'prop-types';
import { dataPropTypes } from '../utils/data-prop-types';
import {useSelector } from 'react-redux';
import {getDataOfIngredient} from '../../services/selectors'


function IngredientDetails({ingredient}) {
      
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


};

IngredientDetails.propTypes = {
    ingredient: dataPropTypes.isRequired}; 

export default IngredientDetails;