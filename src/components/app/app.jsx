import AppHeader from '../app-header/app-header.jsx';
import {data} from '../utils/data.js';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx'
import styles from './app.module.css';

function App() {
  return (
    <main>
      <AppHeader />
     <div className={styles.main}>
      <BurgerIngredients data={data}/>
      <BurgerConstructor data={data} />
      </div>
    </main>
  )
}

export default App
