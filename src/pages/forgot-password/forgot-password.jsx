import {EmailInput, Button  } from '@ya.praktikum/react-developer-burger-ui-components';
import {useState} from 'react';
import styles from './forgot-password.module.css';

export  function ForgotPassword (){
    const [state, setState] = useState({email:"",password:""  })
    const onChange = e => {
        setState(e.target.value)}
    
      
    return(
        <div className = {"container"}>
        <div className = {styles.main}>
            <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
            <EmailInput placeholder="Укажите e-mail" name={'email'} isIcon={false} extraClass="mb-6" value={state.email} onChange={onChange}/>
            <Button htmlType="button" type="primary" size="medium" extraClass="mb-20">Восстановить</Button>
            <div className={styles.bottom}>
                <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?</p>
                <Button htmlType="button" type="secondary" size="medium">Войти</Button>
            </div>
            
        </div>
        </div>
    )
}