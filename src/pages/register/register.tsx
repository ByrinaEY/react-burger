import {Input, EmailInput, PasswordInput, Button  } from '@ya.praktikum/react-developer-burger-ui-components';
import {useState, useEffect, ChangeEvent} from 'react';
import styles from './register.module.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {auth } from '../../services/selectors';
import { authRegisterAction } from '../../services/actions/auth';
import { AUTH_CLEAR_ERRORS} from '../../services/actions/auth';

export  function Register (){
    const [state, setState] = useState({name:"",email:"",password:""  })
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'name') {
            setState({ ...state, name: e.target.value });
        } else if (e.target.name === 'email') {
            setState({ ...state, email: e.target.value });
        } else {
            setState({ ...state, [e.target.name]: e.target.value })}
       }
       const dispatch = useDispatch();
    const { requestStart, requestError, requestSuccess } = useSelector(auth);
    function registrate(){
        dispatch(authRegisterAction(state) as any);
    }
    useEffect(() => {
        if (requestSuccess) {
            dispatch({type: AUTH_CLEAR_ERRORS});
            alert("Вы успешно зарегистрированы!") ;
        } 
       
    }, [requestSuccess]);
      
    return(
        <div className = {"container"}>
        <div className = {styles.main}>
            <p className="text text_type_main-medium mb-6">Регистрация</p>
            <Input placeholder="Имя" extraClass="mb-6" name="name" value={state.name} onChange={onChange} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
            <EmailInput name={'email'} isIcon={false} extraClass="mb-6" value={state.email} onChange={onChange}/>
            <PasswordInput name={'password'} extraClass="mb-6" value={state.password} onChange={onChange}/>
            <Button htmlType="button" type="primary" size="medium" extraClass="mb-20"  onClick={registrate}>Зарегистрироваться</Button>
            <div className={styles.bottom}>
                <p className="text text_type_main-default text_color_inactive">Уже зарегистрированы?</p>
                <Link to ='/login'>
                <Button htmlType="button" type="secondary" size="medium">Войти</Button>
                </Link>
            </div>
        </div>
        </div>
    )
}