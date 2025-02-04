import React, { useEffect, useState, useRef, useCallback } from 'react';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import PropTypes from 'prop-types';
import { dataPropTypes } from '../utils/data-prop-types.js';
import Modal from '../modal/modal.jsx';
import OrderDetails from '../order-details/order-details.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredientsFromConstructor } from '../../services/selectors.js';
import { useDrop, useDrag } from "react-dnd";
import { ADD_INGREDIENT, SET_BUN, SET_TOTAL, DELETE_INGREDIENT, SWAP_INGREDIENTS} from '../../services/actions/burger-constructor.js'
import {createOrderAction} from '../../services/actions/create-order.js';


function BurgerConstructor() {
    const { ingredients, bun, total } = useSelector(getIngredientsFromConstructor);
    const dispatch = useDispatch();
    const [isOpenModal, setIsOpenModal] = useState(false);
    function showModalWindow() {
        setIsOpenModal(true);
    }
    function closeModalWindow() {
        setIsOpenModal(false);
    }

    useEffect(() => {
        let sum = 0;
        if (bun) {
            sum = sum + bun.price * 2;
        }
        sum = sum + ingredients.reduce((sum, item) => sum + item.price, 0);
        dispatch({ type: SET_TOTAL, sum });
    }, [bun, ingredients, dispatch]
    );

    //перенос компонентов
    const [, dropTargetIngredient] = useDrop({
        accept: ["sauce", "main"],
        drop(item) {
            dispatch({ type: ADD_INGREDIENT, item: item });
        },
    });

    const [, dropTargetTopBun] = useDrop({
        accept: ["bun"],
        drop(item) {
            dispatch({ type: SET_BUN, item: item });
        },
    });

    const [, dropTargetLowerBun] = useDrop({
        accept: ["bun"],
        drop(item) {
            dispatch({ type: SET_BUN, item: item });
        },
    });

    function deleteIngredient(index) {
        dispatch({ type: DELETE_INGREDIENT, index: index })
    };
    
 function createOrder(){
    let orderIngredients=[];
    for(let item of ingredients){
        orderIngredients.push(item._id);
        }
    if (bun) {
        orderIngredients.push(bun._id, bun._id);
    }
    dispatch(createOrderAction(orderIngredients));
       showModalWindow();
    };
    

      const ref = useRef(null);
     
      const [, drag] = useDrag({
          type: "sort",
          item: ingredients.index
      });
  
      const [, drop] = useDrop({
          accept: "sort",
          drop(item) {
              if (index !== ingredients) {
                  dispatch({ type: SWAP_INGREDIENTS, index1: index, index2: item.index });
              }
          }
      });
      drag(drop(ref));
    return (
        <section className={styles.section}>
            <div className='mt-25 ml-8'>
                <div ref={dropTargetTopBun}>
                    {bun ? (<ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${bun.name} (верх)`}
                        price={bun.price}
                        thumbnail={bun.image}
                       
                    />)
                        : (<div className={`${styles["empty-element"]} constructor-element constructor-element_pos_top ml-8`}>
                            <div className={`${styles["empty-element-text"]} text text_type_main-default`}>Перетащите булочку</div>
                        </div>)}
                </div>

                <ul className={styles.scroll} ref={dropTargetIngredient} >
                    {ingredients && ingredients.length > 0 ? ingredients.map((item, index) => (
                        <li key={index} className={`${styles.ingredient} mt-4`}   
                        ref={ref}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image}
                                handleClose={() => deleteIngredient(index)}
                            //    handleDrop={handleDrop}
                              
                                                       
                            />
                        </li>)) :
                        (<div className={`${styles["empty-element"]} constructor-element constructor-element ml-8`}>
                            <div className={`${styles["empty-element-text"]} text text_type_main-default`}>Перетащите ингредиенты</div>
                        </div>)
                    }
                </ul>
                <div ref={dropTargetLowerBun}>
                    {bun ? (<ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`${bun.name} (низ)`}
                        price={bun.price}
                        thumbnail={bun.image}
                    />)
                        : (<div className={`${styles["empty-element"]} constructor-element constructor-element_pos_bottom ml-8`}>
                            <div className={`${styles["empty-element-text"]} text text_type_main-default`}>Перетащите булочку</div>
                        </div>)}
                </div>
            </div>
            <div className={`${styles.total} mr-4 mt-10`}>
                <span className="text text_type_main-large mr-2 mb-1">{total}</span>
                <span className={`${styles.icon} mr-10`}><CurrencyIcon type="primary" /></span>
                <Button htmlType="button" type="primary" size="medium" onClick={createOrder}>
                    Оформить заказ
                </Button>
            </div>
            {isOpenModal && (
                <Modal title={''} onClose={closeModalWindow}>
                    <OrderDetails/>
                </Modal>
            )}
        </section>

    )
}

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(dataPropTypes.isRequired)
};

export default BurgerConstructor;