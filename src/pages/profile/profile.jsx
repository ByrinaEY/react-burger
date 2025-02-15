import { Input, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import styles from './profile.module.css';

export function Profile() {
    const [state, setState] = useState({ name: "Марк", email: "mail@stellar.burger", password: "12345" })
    const onChange = e => {
        setState(e.target.value)
    }


    return (
        <div>
            <div className={"container"}>
                <div className={styles.main}>
                    <p className="text text_type_main-medium mb-6">Регистрация</p>
                    <Input placeholder="Имя" extraClass="mb-6" name="name" value={state.name} onChange={onChange} icon={'EditIcon'} />
                    <EmailInput name={'email'} isIcon={false} extraClass="mb-6" value={state.email} onChange={onChange} icon={'EditIcon'} />
                    <PasswordInput name={'password'} extraClass="mb-6" value={state.password} onChange={onChange} icon={'EditIcon'} />
                </div>
            </div>
            <div className={"page-container-profile"}>
                <ul className={styles.ul}>
                    <li>
                        <p className="text text_type_main-large">Профиль</p>
                    </li>
                    <li>
                        <p className="text text_type_main-large text_color_inactive">История заказов</p>
                    </li>
                    <li>
                        <p className="text text_type_main-large text_color_inactive">Выход</p>
                    </li>
                </ul>
                <p className={`${styles.p} text text_type_main-default text_color_inactive mt-20`}>В этом разделе вы можете изменить свои персональные данные</p>
            </div>
        </div>
    )
}