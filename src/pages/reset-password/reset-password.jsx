import {PasswordInput, Button , Input } from '@ya.praktikum/react-developer-burger-ui-components';
import {useState} from 'react';
import styles from './reset-password.module.css';

export  function ResetPassword (){
    const [state, setState] = useState({code:"",password:""  })
    const onChange = e => {
        setState(e.target.value)}
    
      
    return(
        <div className = {"container"}>
        <div className = {styles.main}>
            <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
            <PasswordInput placeholder={"Введите новый пароль"} name={'password'} extraClass="mb-6" value={state.password} onChange={onChange}/>
            <Input placeholder="Введите код из письма" extraClass="mb-6" name="code" value={state.code} onChange={onChange} />
            <Button htmlType="button" type="primary" size="medium" extraClass="mb-20">Сохранить</Button>
            <div className={styles.bottom}>
                <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?</p>
                <Button htmlType="button" type="secondary" size="medium">Войти</Button>
            </div>
            
        </div>
        </div>
    )
}