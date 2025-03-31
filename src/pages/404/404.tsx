import { Link } from 'react-router-dom';
import styles from './404.module.css';

export function NotFound404() {

  return (
       <div className={styles.notFound}>
          <h1 className="text text_type_digits-large"> Ошибка 404</h1>
          <p className="text text_type_digits-medium">Такая страница не найдена</p>
          <br />
          <br />
          <p className="text text_type_digits-medium">Проверьте адрес или перейдите на <Link to='/' className={styles.link}>Главную страницу</Link></p>
        </div>
     
  );
}