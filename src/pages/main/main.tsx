import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients.js';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor.js';
import styles from './main.module.css';
import { useSelector} from '../../components/hook/redux';
import { loadIngredients } from '../../services/selectors.js';


 function MainPage() {

    const { isLoading, hasError, ingredients } = useSelector(loadIngredients);
    
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

