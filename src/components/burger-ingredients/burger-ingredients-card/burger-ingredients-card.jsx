import BurgerIngredientElement from "../burger-ingredients-element/burger-ingredients-element";
import styles from './burger-ingredients-card.module.css';
import PropTypes from 'prop-types';
import { dataPropTypes } from '../../utils/data-prop-types.js';
import { useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';

function BurgerIngredientsCard({ title, data }) {
    const location = useLocation();
   
    return (
        <div className={styles.title}>
            <h2 className="text text_type_main-medium mb-6">{title}</h2>
            <div className={`${styles.card} ml-4 mr-4 mb-10;`}>
                {data.map((item) =>
                    <Link key={item._id}
                        to={`ingredients/${item._id}`}
                        state={{ background: location }}
                        className = {styles.navlink}>
                        <BurgerIngredientElement key={item._id} dataItem={item} />
                    </Link>)}
            </div>
        </div>
    )
}

BurgerIngredientElement.propTypes = {
    data: PropTypes.arrayOf(dataPropTypes),
    title: PropTypes.string
}

export default BurgerIngredientsCard;

