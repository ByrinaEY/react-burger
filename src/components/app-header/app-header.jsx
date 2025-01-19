import { Logo, ProfileIcon, BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import IconLink from '../icon-link/icon-link';
import styles from './app-header.module.css'
function AppHeader() {
    return (
        <header className={`${styles.header} pt-4 pb-4`}>
            <div className={styles.container}>
                <nav className={styles.left}>
                    <ul className={styles.list}>
                        <li >
                            <IconLink href="/" iconName={BurgerIcon} isActive>Конструктор</IconLink>
                        </li>
                        <li>
                           
                            <IconLink href="/" iconName={ListIcon}>Лента заказов</IconLink>
                        </li>
                    </ul>
                </nav>


                <div className={styles.center}>
                    <Logo />
                </div>

                <div className={styles.right}>
                <IconLink href="/" iconName={ProfileIcon}>Личный кабинет</IconLink>
                </div>
            </div>
        </header>

    )
}

export default AppHeader;

