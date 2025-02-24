import {EmailInput, PasswordInput, Button  } from '@ya.praktikum/react-developer-burger-ui-components';
import {useState, useEffect} from 'react';
import styles from './login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {auth } from '../../services/selectors';
import { authLoginAction} from '../../services/actions/auth';


export  function Login (){
    const navigate = useNavigate();
    const dispatch = useDispatch();

    
    const [data, setData] = useState({email:"",password:""  })
    const onChange = e => {
        if (e.target.name === 'email') {
            setData({ ...data, email: e.target.value });
        }else{setData({ ...data, password: e.target.value})}
    };
    

    const { userLoggedIn, requestSuccess } = useSelector(auth);

    function login(){
        if (!userLoggedIn) {
        dispatch(authLoginAction(data));}
    }
    useEffect(() => {
        if (userLoggedIn) {
            alert("Вы успешно вошли в систему!") ;
            navigate("/", { replace: true });
        } 
       
    }, [requestSuccess,  navigate, dispatch]);

    
      
    return(
        <div className = {"container"}>
        <div className = {styles.main}>
            <p className="text text_type_main-medium mb-6">Вход</p>
            <EmailInput name={'email'} isIcon={false} extraClass="mb-6" value={data.email} onChange={onChange}/>
            <PasswordInput name={'password'} extraClass="mb-6" value={data.password} onChange={onChange}/>
            <Button htmlType="button" type="primary" size="medium" extraClass="mb-20" onClick={login}>Войти</Button>
           
                <p className="text text_type_main-default text_color_inactive">Вы - новый пользователь?
                <Link to ='/register' className={styles.link}>
                <Button htmlType="button" type="secondary" size="medium" >Зарегистрироваться</Button>
                </Link>
                </p>
           
                <p className="text text_type_main-default text_color_inactive">Забыли пароль?
                <Link to ='/forgot-password' className={styles.link}>
                <Button htmlType="button" type="secondary" size="medium">Восстановить пароль</Button>
                </Link>
                </p>
           
        </div>
        </div>
    )
}