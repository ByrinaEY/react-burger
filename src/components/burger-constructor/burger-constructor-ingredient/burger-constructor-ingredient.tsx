import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor-ingredient.module.css';
import {useRef, FC} from 'react';
import { useDrop, useDrag } from "react-dnd";
import {SWAP_INGREDIENT} from '../../../services/actions/burger-constructor.js'
import { useDispatch} from 'react-redux';
import { TIngredientConstructor } from '../../utils/data-prop-types';

type TProps ={
    item: TIngredientConstructor;
    index: number;
    onDelete: (index: number) => void;
}
 const BurgerConstructorIngredient : FC <TProps> = ({ item, index, onDelete }) => {
    const dispatch = useDispatch();
    const ref = useRef(null);

    const [, drag] = useDrag({
        type: "sort",
        item: {index}
    });

    const [, drop] = useDrop <TIngredientConstructor>({
        accept: "sort",
        drop(item) {
            if (index !== item.index) {
                dispatch({ type: SWAP_INGREDIENT, index1: index, index2: item.index });
            }
        }
    });

    drag(drop(ref));

    return (
        <div>
            <li key={item.id} className={`${styles.ingredient} mt-4`} ref={ref}>
                <DragIcon type="primary" />
                <ConstructorElement
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                    handleClose={() => onDelete(index)}

                />
            </li>
        </div>
    )
}

export default BurgerConstructorIngredient;