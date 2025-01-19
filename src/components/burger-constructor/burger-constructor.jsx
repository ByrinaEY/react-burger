import React from 'react';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import PropTypes from 'prop-types';
import { dataPropTypes } from '../utils/data-prop-types.js';



function BurgerConstructor({ data }) {
    const bun = data.find(item => item.type === 'bun');
    const ingredient = data.filter(item => item.type !== 'bun');
    const total = bun.price * 2 + ingredient.reduce((sum, item) => sum + item.price, 0);

    return (
        <section className={styles.section}>
            <div className='mt-25 ml-8'>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${bun.name} (верх)`}
                    price={bun.price}
                    thumbnail={bun.image}
                />
                <ul className={styles.scroll}>
                    {ingredient.map((item, index) => (
                        <li key={index} className={`${styles.ingredient} mt-4`}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image}
                            />
                        </li>))}
                </ul>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${bun.name} (низ)`}
                    price={bun.price}
                    thumbnail={bun.image}
                />
            </div>
            <div className={`${styles.total} mr-4 mt-10`}>
                <span className="text text_type_main-large mr-2 mb-1">{total}</span>
                <span className={`${styles.icon} mr-10`}><CurrencyIcon type="primary" /></span>
                <Button htmlType="button" type="primary" size="medium">
                    Оформить заказ
                </Button>
            </div>
        </section>

    )
}

BurgerConstructor.PropTypes = {
    data: PropTypes.arrayOf(dataPropTypes).isRequired
}; 

export default BurgerConstructor;