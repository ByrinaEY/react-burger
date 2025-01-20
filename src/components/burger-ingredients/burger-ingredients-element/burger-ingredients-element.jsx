import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients-element.module.css';
 import PropTypes from 'prop-types';
 import { dataPropTypes } from '../../utils/data-prop-types.js';


function BurgerIngredientElement ({data}){
    return(
    <div className={`${styles.element} ml-4 mr-4 mt-6 mb-8`}>
    
        <img className={`${styles.image} ml-4 mb-1`} src={data.image} alt={data.name} />
        <Counter count={1} size="default" extraClass="m-1" />
        <div className={`${styles.price} mb-1`}>
            <span className="text text_type_main-default mr-4">{data.price}</span>
            <span><CurrencyIcon type="primary" /></span>
        </div>
        <p className={`${styles.caption} text text_type_main-default mb-4`}>{data.name}</p>
    </div>


    )
}

BurgerIngredientElement.PropTypes ={
    data: PropTypes.arrayOf(dataPropTypes).isRequired
}
export default BurgerIngredientElement;


