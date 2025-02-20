import { PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import styles from './reset-password.module.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {auth } from '../../services/selectors';
import { resetPWAction } from '../../services/actions/auth';
import { AUTH_CLEAR_ERRORS} from '../../services/actions/auth'

export function ResetPassword() {
    const [state, setState] = useState({ password: "", token: ""})
    const onChange = e => {
        if (e.target.name === 'token') {
            setState({ ...state, token: e.target.value });
        } else {
            setState({ ...state, [e.target.name]: e.target.value });
        }
    }
    const dispatch = useDispatch();
    const { requestStart, requestError, requestSuccess } = useSelector(auth);
    
    function resetPassword() {
        dispatch(resetPWAction(state));
    }

    useEffect(() => {
        if (requestSuccess) {
            dispatch({type: AUTH_CLEAR_ERRORS}) 
        }
       
    }, [requestSuccess]);
    return (
        <div className={"container"}>
             {( requestStart || requestError) ?
                 (<p> { requestStart ? 'Загрузка...' : requestError ? 'Произошла ошибка' : undefined}</p>) :
                 requestSuccess ?  alert ('Пароль сброшен') :
                
           ( <div className={styles.main}>
                <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
                <PasswordInput placeholder={"Введите новый пароль"} name={'password'} extraClass="mb-6" value={state.password} onChange={onChange} />
                <Input placeholder="Введите код из письма" extraClass="mb-6" name="token" value={state.token} onChange={onChange} />
                <Button htmlType="button" type="primary" size="medium" extraClass="mb-20" onClick={resetPassword}>Сохранить</Button>
                <div className={styles.bottom}>
                    <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?</p>
                    <Link to='/login' className={styles.link}>
                        <Button htmlType="button" type="secondary" size="medium">Войти</Button>
                    </Link>
                </div>

            </div>) }
        </div>
    )
}