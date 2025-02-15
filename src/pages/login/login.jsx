import {EmailInput, PasswordInput, Button  } from '@ya.praktikum/react-developer-burger-ui-components';
import {useState} from 'react';
import styles from './login.module.css';

export  function Login (){
    const [state, setState] = useState({email:"",password:""  })
    const onChange = e => {
        setState(e.target.value)}
    
      
    return(
        <div className = {"container"}>
        <div className = {styles.main}>
            <p className="text text_type_main-medium mb-6">Вход</p>
            <EmailInput name={'email'} isIcon={false} extraClass="mb-6" value={state.email} onChange={onChange}/>
            <PasswordInput name={'password'} extraClass="mb-6" value={state.password} onChange={onChange}/>
            <Button htmlType="button" type="primary" size="medium" extraClass="mb-20">Войти</Button>
            <div className={styles.bottom}>
                <p className="text text_type_main-default text_color_inactive">Вы - новый пользователь?</p>
                <Button htmlType="button" type="secondary" size="medium">Зарегистрироваться</Button>
            </div>
            <div className={styles.bottom}>
                <p className="text text_type_main-default text_color_inactive">Забыли пароль?</p>
                <Button htmlType="button" type="secondary" size="medium">Восстановить пароль</Button>
            </div>
        </div>
        </div>
    )
}