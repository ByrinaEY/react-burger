import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients-element.module.css';
import propTypes from 'prop-types';
import { dataPropTypes } from '../../utils/data-prop-types.js';
import { useState } from 'react';
import Modal from '../../modal/modal.jsx';
import IngredientDetails from '../../ingredient-details/ingredient-details.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { SET_DISPLAYES_INGREDIENT } from '../../../services/actions/ingredients-details.js';
import { useDrag } from 'react-dnd';
import {  getIngredientsFromConstructor } from '../../../services/selectors.js';
import { useMemo } from 'react';
import {useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect} from 'react';


function BurgerIngredientElement({ dataItem }) {
    const { ingredients, bun } = useSelector( getIngredientsFromConstructor);
    const navigate = useNavigate();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const location = useLocation();
        
    function showModalWindow() {
      setIsOpenModal(true);
         
    };
    function closeModalWindow() {
      setIsOpenModal(false);
     
    };

    useEffect(() => {
        if (isOpenModal == false) {
            navigate("/", { replace: true });
        }
       
    }, [isOpenModal]);
    

    const count = useMemo(() => {
        if (bun && bun._id === dataItem._id){
        return 2;
        } else {
        return ingredients.filter(item => item._id === dataItem._id).length;}
    }, [bun, ingredients]);
   
   

    //перенос компонентов
    const [, dragRef] = useDrag({
        type: dataItem.type,
        item: dataItem
    });
    return (
        <div>
            <div className={`${styles.element} ml-4 mr-4 mt-6 mb-8`} ref={dragRef}>

                <img className={`${styles.image} ml-4 mb-1`} src={dataItem.image} alt={dataItem.name} onClick={showModalWindow} />
                {count>0 && <Counter count={count} size="default" extraClass="m-1" />}
                <div className={`${styles.price} mb-1`}>
                    <span className="text text_type_main-default mr-4">{dataItem.price}</span>
                    <span><CurrencyIcon type="primary" /></span>
                </div>
                <p className={`${styles.caption} text text_type_main-default mb-4`}>{dataItem.name}</p>
            </div>
            {isOpenModal && (
                <Modal title={'Детали ингредиента'} onClose={closeModalWindow}>
                    <IngredientDetails ingredient={dataItem} />
                </Modal>
            )}
        </div>


    )
}

BurgerIngredientElement.propTypes = {
    dataItem: dataPropTypes.isRequired
};

export default BurgerIngredientElement;


