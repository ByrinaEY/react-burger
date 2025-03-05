import IngredientDetails from '../../components/ingredient-details/ingredient-details.js';
import styles from './ingredient-page.module.css';



export function IngredientPage() {
    const id = location.pathname.slice(13);
    return (
                <div className ={styles.ingrDetail}>
                    <IngredientDetails id={id} /> 
                </div>
            );
   }
