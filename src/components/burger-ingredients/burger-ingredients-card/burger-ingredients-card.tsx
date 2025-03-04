import BurgerIngredientElement from "../burger-ingredients-element/burger-ingredients-element";
import styles from './burger-ingredients-card.module.css';
import { TIngredient} from '../../utils/data-prop-types';
import { useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';
import {FC} from 'react';

type TProps ={
    title: string;
    data: Array<TIngredient>;
}
const BurgerIngredientsCard : FC <TProps> = ({ title, data }) => {
    const location = useLocation();
   
    return (
        <div className={styles.title}>
            <h2 className="text text_type_main-medium mb-6">{title}</h2>
            <div className={`${styles.card} ml-4 mr-4 mb-10;`}>
                {data.map((item: TIngredient) =>
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

export default BurgerIngredientsCard;

