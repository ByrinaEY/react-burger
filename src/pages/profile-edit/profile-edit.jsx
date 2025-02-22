import { Input, EmailInput, PasswordInput , Button} from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useCallback, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {auth } from '../../services/selectors';
import { useNavigate } from 'react-router-dom';
import {useForm} from '../../components/hook/useForm';
import {authPatchUserAction, AUTH_CLEAR_ERRORS} from '../../services/actions/auth';
import styles from './profile-edit.module.css';


export  function ProfileEdit(){
   
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitCb = useCallback((state) => {
        dispatch(authPatchUserAction(state));
    }, [dispatch]);

    const { requestStart, requestError, requestSuccess, user } = useSelector(auth);
   
    const { state, setState, onChange, onSubmit } = useForm({
        name: "",
        email: "",
        password: ""
    }, submitCb);

    const valueChange = (user.name !== "" && (state.name !== user.name || state.email !== user.email || state.password.length > 0));

       const onReset = useCallback((e) => {
        e.preventDefault();
        setState({ name: user.name, email: user.email, password: "" });
    }, [setState, user]);

    useEffect(() => {
        if (requestError) {
            alert(`[Профиль сохранение] ${requestError}`);
            dispatch({type: AUTH_CLEAR_ERRORS});
        } else {
            setState({ name: user.name, email: user.email, password: "" });
        }
    }, [dispatch, setState, user, navigate, requestError, requestSuccess]);

 
return(
     <form className={styles.registration}  onSubmit={onSubmit} onReset={onReset}>
    <Input placeholder="Имя" extraClass="mb-6" name="name" value={state.name} onChange={onChange} icon={'EditIcon'} />
    <EmailInput name={'email'} isIcon={false} extraClass="mb-6" value={state.email}  onChange={onChange} icon={'EditIcon'} />
    <PasswordInput name={'password'} extraClass="mb-6" value={state.password} onChange={onChange} icon={'EditIcon'} />
    {requestStart ? <p >loading</p> : valueChange ? (<div>
                <Button type="primary" htmlType='reset'>Отмена</Button>
                <Button type="primary" extraClass="ml-5" htmlType='submit'>Сохранить</Button>
            </div>) : undefined}
    </form>
)
}
