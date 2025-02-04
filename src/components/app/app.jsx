import AppHeader from '../app-header/app-header.jsx';
//import {data} from '../utils/data.js';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx'
import styles from './app.module.css';
import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { loadIngredientsAction } from '../../services/actions/burger-ingredients.js';
import { loadIngredients } from '../../services/selectors.js';



function App() {
 
  const {isLoading, hasError, ingredients} = useSelector(loadIngredients);
  const dispatch = useDispatch();
 
  
  useEffect(() => { dispatch(loadIngredientsAction()); }, [dispatch]);
  return (
    <main>
      {(isLoading || hasError) ?
        (<p>
          {isLoading ? 'Загрузка...' : hasError ? 'Произошла ошибка' : undefined}</p>) :
        ingredients && ingredients.length>0 && (
          <>
            <AppHeader />
            <div className={styles.main}>
              <BurgerIngredients />
              <BurgerConstructor />
            </div>
          </>)}
    </main>
  )
}

export default App


