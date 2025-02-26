import { Logo, ProfileIcon, BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import IconLink from '../icon-link/icon-link';
import styles from './app-header.module.css';
import {useSelector} from 'react-redux';
import {auth } from '../../services/selectors';



function AppHeader() {
    const { userLoggedIn } = useSelector(auth);
    
    return (
        <header className={`${styles.header} pt-4 pb-4`}>
            <div className={styles.container}>
                <nav className={styles.left}>
                    <ul className={styles.list}>
                        <li >
                            <IconLink href={"/"} iconName={BurgerIcon} >Конструктор</IconLink>
                        </li>
                        <li>
                           
                            <IconLink href={"/lenta"} iconName={ListIcon}>Лента заказов</IconLink>
                        </li>
                    </ul>
                </nav>


                <div className={styles.center}>
                    <Logo />
                </div>

                <div className={styles.right}>
                <IconLink href={`${userLoggedIn ? "/profile" : "/login"}`} iconName={ProfileIcon}>Личный кабинет</IconLink>
                </div>
            </div>
        </header>

    )
}

export default AppHeader;

