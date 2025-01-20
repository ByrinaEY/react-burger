
import React from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsCard from './burger-ingredients-card/burger-ingredients-card';
import PropTypes from 'prop-types';
import { dataPropTypes } from '../utils/data-prop-types';


function BurgerIngredients({ data }) {
    const [current, setCurrent] = React.useState('all')
    return (
        <section className={styles.section}>
            <h1 className={`${styles.h1} text text_type_main-large mt-10 mb-5`}>Соберите бургер</h1>
            <div className={`${styles.tab} pb-10`}>
                <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="toppings" active={current === 'toppings'} onClick={setCurrent}>
                    Ничинки
                </Tab>
            </div>
            <div className={styles.scroll}>
            <BurgerIngredientsCard title={'Булки'} data = {data.filter((item) => item.type ==='bun')}/>
            <BurgerIngredientsCard title={'Соусы'} data = {data.filter((item) => item.type ==='sauce')}/>
            <BurgerIngredientsCard title={'Начинки'} data = {data.filter((item) => item.type ==='main')}/>
            </div>
        </section>

    )


}

BurgerIngredients.PropTypes ={
    data: PropTypes.arrayOf(dataPropTypes).isRequired
}

export default BurgerIngredients;