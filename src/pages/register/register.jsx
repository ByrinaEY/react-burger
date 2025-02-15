import {Input, EmailInput, PasswordInput, Button  } from '@ya.praktikum/react-developer-burger-ui-components';
import {useState} from 'react';
import styles from './register.module.css';
export  function Register (){
    const [state, setState] = useState({name:"",email:"",password:""  })
    const onChange = e => {
        setState(e.target.value)}
    
      
    return(
        <div className = {"container"}>
        <div className = {styles.main}>
            <p className="text text_type_main-medium mb-6">Регистрация</p>
            <Input placeholder="Имя" extraClass="mb-6" name="name" value={state.name} onChange={onChange} />
            <EmailInput name={'email'} isIcon={false} extraClass="mb-6" value={state.email} onChange={onChange}/>
            <PasswordInput name={'password'} extraClass="mb-6" value={state.password} onChange={onChange}/>
            <Button htmlType="button" type="primary" size="medium" extraClass="mb-20">Зарегистрироваться</Button>
            <div className={styles.bottom}>
                <p className="text text_type_main-default text_color_inactive">Уже зарегистрированы?</p>
                <Button htmlType="button" type="secondary" size="medium">Войти</Button>
            </div>
        </div>
        </div>
    )
}