import {EmailInput, PasswordInput, Button  } from '@ya.praktikum/react-developer-burger-ui-components';
import {useState, useEffect} from 'react';
import styles from './login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {auth } from '../../services/selectors';
import { authLoginAction,authGetUserAction } from '../../services/actions/auth';
import { AUTH_CLEAR_ERRORS} from '../../services/actions/auth';

export  function Login (){
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authGetUserAction());
    }, [dispatch]);


    const [state, setState] = useState({email:"",password:""  })
    const onChange = e => {
        if (e.target.name === 'email') {
            setState({ ...state, email: e.target.value });
        }else{setState({ ...state, password: e.target.value})}
    };
    

    const { userLoggedIn, requestSuccess } = useSelector(auth);

    function login(){
        dispatch(authLoginAction(state));
    }
    useEffect(() => {
        if (userLoggedIn) {
            // dispatch({type: AUTH_CLEAR_ERRORS});
            alert("Вы успешно вошли в систему!") ;
            navigate("/", { replace: true });
        } 
       
    }, [requestSuccess, userLoggedIn,  navigate, dispatch]);

    
      
    return(
        <div className = {"container"}>
        <div className = {styles.main}>
            <p className="text text_type_main-medium mb-6">Вход</p>
            <EmailInput name={'email'} isIcon={false} extraClass="mb-6" value={state.email} onChange={onChange}/>
            <PasswordInput name={'password'} extraClass="mb-6" value={state.password} onChange={onChange}/>
            <Button htmlType="button" type="primary" size="medium" extraClass="mb-20" onClick={login}>Войти</Button>
            <div className={styles.bottom}>
                <p className="text text_type_main-default text_color_inactive">Вы - новый пользователь?</p>
                <Link to ='/register' className={styles.link}>
                <Button htmlType="button" type="secondary" size="medium">Зарегистрироваться</Button>
                </Link>
            </div>
            <div className={styles.bottom}>
                <p className="text text_type_main-default text_color_inactive">Забыли пароль?</p>
                <Link to ='/forgot-password' className={styles.link}>
                <Button htmlType="button" type="secondary" size="medium">Восстановить пароль</Button>
                </Link>
            </div>
        </div>
        </div>
    )
}