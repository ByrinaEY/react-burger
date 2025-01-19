import BurgerIngredientElement from "../burger-ingredients-element/burger-ingredients-element";
import styles from './burger-ingredients-card.module.css';
import PropTypes from 'prop-types';
import { dataPropTypes } from '../../utils/data-prop-types.js';

function BurgerIngredientsCard({ title, data }) {
    return (
        <div className={styles.title}>
            <h2 className="text text_type_main-medium mb-6">{title}</h2>
            <div className={`${styles.card} ml-4 mr-4 mb-10;`}>
            {data.map((item, index) => <BurgerIngredientElement key={index} data={item} />)}
            </div>
        </div>
    )
}

BurgerIngredientElement.PropTypes ={
    data: PropTypes.arrayOf(dataPropTypes).isRequired,
    title: PropTypes.string
}

export default BurgerIngredientsCard;