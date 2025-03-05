
import styles from './profile.module.css';
import { NavLink } from 'react-router-dom';
import { Outlet } from 'react-router-dom';


export function Profile() {
    
   return (
        <div className={styles.parent}>
        <div className={styles.container}>
                <ul className={styles.ul}>
                    <li className={styles.li}>
                    <NavLink to="" end style={{ textDecoration: 'none' }}>{({ isActive }) => (
                        <p className={`text text_type_main-medium  ${isActive ? "text_color_primary" : "text_color_inactive"}`}>Профиль</p>)} 
                    </NavLink>
                    </li>
                   
                    <li className={styles.li}>
                    <NavLink to="orders" end style={{ textDecoration: 'none' }}>{({ isActive }) => (
                        <p className={`text text_type_main-medium  ${isActive ? "text_color_primary" : "text_color_inactive"}`}>История заказов</p>)}
                    </NavLink>
                    </li>
                    <li className={styles.li}>
                    <NavLink to="logout" end style={{ textDecoration: 'none' }}>{({ isActive }) => (
                        <p className={`text text_type_main-medium  ${isActive ? "text_color_primary" : "text_color_inactive"}`}>Выход</p>
                         )}
                    </NavLink> 
                    </li>
                </ul>
                <p className={`${styles.p} text text_type_main-default text_color_inactive mt-20`}>В этом разделе вы можете изменить свои персональные данные</p>
               
        </div>
       
        <Outlet/>
            
        </div>
    )
}