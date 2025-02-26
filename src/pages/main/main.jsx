//import {data} from '../utils/data.js';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor.jsx';
import styles from './main.module.css';
import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { loadIngredientsAction } from '../../services/actions/burger-ingredients.js';
import { loadIngredients } from '../../services/selectors.js';


 function MainPage() {

    const { isLoading, hasError, ingredients } = useSelector(loadIngredients);
    const dispatch = useDispatch();
-

    useEffect(() => { dispatch(loadIngredientsAction()); }, [dispatch]);
    return (
        <main className={styles.main}>
            {(isLoading || hasError) ?
                (<p>
                    {isLoading ? 'Загрузка...' : hasError ? 'Произошла ошибка' : undefined}</p>) :
                ingredients && ingredients.length > 0 && (
                    <>
                        <div className={styles.div}>
                            <BurgerIngredients />
                            <BurgerConstructor />
                        </div>
                    </>)}
        </main>
    )
}


export default MainPage;

