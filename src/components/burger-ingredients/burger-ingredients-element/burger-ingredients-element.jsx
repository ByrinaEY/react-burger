import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients-element.module.css';
import propTypes from 'prop-types';
import { dataPropTypes } from '../../utils/data-prop-types.js';
import { useState } from 'react';
import Modal from '../../modal/modal.jsx';
import IngredientDetails from '../../ingredient-details/ingredient-details.jsx';
import { useDispatch } from 'react-redux';
import { SET_DISPLAYES_INGREDIENT } from '../../../services/actions/ingredients-details.js';
import { useDrag } from 'react-dnd';
import {  getIngredientsFromConstructor } from '../../../services/selectors.js';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';


function BurgerIngredientElement({ data }) {
    const { ingredients, bun } = useSelector( getIngredientsFromConstructor);
    const dispatch = useDispatch();
    const [isOpenModal, setIsOpenModal] = useState(false);
    function showModalWindow() {
        dispatch({ type: SET_DISPLAYES_INGREDIENT, ingredient: data });
        setIsOpenModal(true);
    };
    function closeModalWindow() {
        dispatch({ type: SET_DISPLAYES_INGREDIENT, ingredient: null });
        setIsOpenModal(false);
    };

    const count = useMemo(() => {
        if (bun && bun._id === data._id){
        return 2;
        } else {
        return ingredients.filter(item => item._id === data._id).length;}
    }, [bun, ingredients]);
   
   

    //перенос компонентов
    const [, dragRef] = useDrag({
        type: data.type,
        item: data
    });
    return (
        <div>
            <div className={`${styles.element} ml-4 mr-4 mt-6 mb-8`} ref={dragRef}>

                <img className={`${styles.image} ml-4 mb-1`} src={data.image} alt={data.name} onClick={showModalWindow} />
                {count>0 && <Counter count={count} size="default" extraClass="m-1" />}
                <div className={`${styles.price} mb-1`}>
                    <span className="text text_type_main-default mr-4">{data.price}</span>
                    <span><CurrencyIcon type="primary" /></span>
                </div>
                <p className={`${styles.caption} text text_type_main-default mb-4`}>{data.name}</p>
            </div>
            {isOpenModal && (
                <Modal title={'Детали ингредиента'} onClose={closeModalWindow}>
                    <IngredientDetails />
                </Modal>
            )}
        </div>


    )
}

BurgerIngredientElement.propTypes = {
    data: dataPropTypes.isRequired
};

export default BurgerIngredientElement;


