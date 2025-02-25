import {EmailInput, PasswordInput, Button  } from '@ya.praktikum/react-developer-burger-ui-components';
import {useState, useCallback} from 'react';
import styles from './login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {auth } from '../../services/selectors';
import { authLoginAction} from '../../services/actions/auth';


export  function Login (){
    const { userLoggedIn } = useSelector(auth);

    const [user, setValue] = useState({email:"",password:""  });
   
    const onChange = e => {
       
        if (e.target.name === 'email') {
            setValue({ ...user, email: e.target.value });
        }
        else {setValue({ ...user, password: e.target.value})}
        };

    const navigate = useNavigate();
    const dispatch = useDispatch();

    
    let login= useCallback(
        e => {
           e.preventDefault();
           dispatch(authLoginAction(user));
                       
        },
        [authLoginAction, user]
      );
     
    
        if (userLoggedIn) {
            alert("Вы успешно вошли в систему!") ;
            navigate("/", { replace: true });
        } 
       
    
    return(
        <div className = {"container"}>
        <div className = {styles.main}>
            <p className="text text_type_main-medium mb-6">Вход</p>
            <EmailInput name={'email'} isIcon={false} extraClass="mb-6" value={user.email} onChange={onChange}/>
            <PasswordInput name={'password'} extraClass="mb-6" value={user.password} onChange={onChange}/>
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