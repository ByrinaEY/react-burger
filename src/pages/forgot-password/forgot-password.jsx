import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useEffect } from 'react';
import styles from './forgot-password.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../services/selectors';
import { recoverPWAction } from '../../services/actions/auth';
import { Link, useNavigate } from 'react-router-dom';
import { AUTH_CLEAR_ERRORS} from '../../services/actions/auth';

export function ForgotPassword() {
    const [email, setState] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { requestStart, requestError, requestSuccess } = useSelector(auth);
    const onChange = e => {
        setState(e.target.value)
    }


    function recoverPassword() {
        if (email != '') {
            dispatch(recoverPWAction(email));
        }
    }

    useEffect(() => {
        if (requestSuccess) {
            dispatch({ type: AUTH_CLEAR_ERRORS });
            navigate("/reset-password", { replace: true });
        }

    }, [requestSuccess]);

    return (
        <div className={"container"}>
            {(requestStart || requestError) ?
                (<p> {requestStart ? 'Загрузка...' : requestError ? 'Произошла ошибка' : undefined}</p>)
                :
                (!requestSuccess) &&
                (
                    <div className={styles.main}>
                        <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
                        <EmailInput placeholder="Укажите e-mail" name={'email'} isIcon={false} extraClass="mb-6" value={email} onChange={onChange} />
                        <Button htmlType="button" type="primary" size="medium" extraClass="mb-20" onClick={recoverPassword}>Восстановить</Button>
                        <div className={styles.bottom}>
                            <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?</p>
                            <Link to='/login' className={styles.link}>
                                <Button htmlType="button" type="secondary" size="medium">Войти</Button>
                            </Link>
                        </div>
                    </div>)

            }
        </div>)
}




