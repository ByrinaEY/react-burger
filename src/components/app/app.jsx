import AppHeader from '../app-header/app-header.jsx';
//import {data} from '../utils/data.js';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx'
import styles from './app.module.css';
import React, { useEffect, useState } from 'react';
import { DOMAIN } from '../utils/server.js';



function App() {
  const [state, setState] = useState({ isLoading: false, hasError: false, ingredients: null });
  const getIngredients = () => {
    setState({ ...state, hasError: false, isLoading: true });
    fetch(DOMAIN)
      .then(res => {
        if (res.status !==200){
          alert(`Ошибка ${res.status}: ${res.statusText}`);
        }
        return res.json();
        })
      .then(ingredients => setState({ ...state, ingredients, isLoading: false }))
      .catch(e => {
        setState({ ...state, hasError: true, isLoading: false });
      });
  };
  
  useEffect(() => { getIngredients(); }, []);
  return (
    <main>
      {(state.isLoading || state.hasError) ?
        (<p>
          {state.isLoading ? 'Загрузка...' : state.hasError ? 'Произошла ошибка' : undefined}</p>) :
        state.ingredients && (
          <>
            <AppHeader />
            <div className={styles.main}>
              <BurgerIngredients data={state.ingredients.data} />
              <BurgerConstructor data={state.ingredients.data} />
            </div>
          </>)}
    </main>
  )
}

export default App


