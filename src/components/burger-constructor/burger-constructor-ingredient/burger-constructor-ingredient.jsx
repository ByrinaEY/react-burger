import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor-ingredient.module.css';
import {useRef} from 'react';
import { useDrop, useDrag } from "react-dnd";
import {SWAP_INGREDIENT} from '../../../services/actions/burger-constructor.js'
import { useDispatch} from 'react-redux';

export default function BurgerConstructorIngredient({ item, index, onDelete }) {
    const dispatch = useDispatch();
    const ref = useRef(null);

    const [, drag] = useDrag({
        type: "sort",
        item: {index}
    });

    const [, drop] = useDrop({
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
            <li key={item.key} className={`${styles.ingredient} mt-4`} ref={ref}>
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