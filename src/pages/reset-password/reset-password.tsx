import {
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useCallback } from "react";
import styles from "./reset-password.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../services/selectors";
import { resetPWAction } from "../../services/actions/auth";
import { AUTH_CLEAR_ERRORS } from "../../services/actions/auth";
import { useForm } from "../../components/hook/useForm";
import { TResetPassword } from "../../components/utils/data-post";

type TState = TResetPassword & {
  wasSubmit?: boolean;
};

export function ResetPassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitCb = useCallback(
      (state: TState) => {
        dispatch(resetPWAction(state) as any);
      },
      [dispatch]
    );
  
    const { state, onChange, onSubmit } = useForm<TState>(
      {
        password: "",
        token: "",
      },
      submitCb
    );

  const { requestStart, requestError, requestSuccess, userLoggedIn } =
    useSelector(auth);

  
  useEffect(() => {
    if (requestSuccess && !userLoggedIn) {
      dispatch({ type: AUTH_CLEAR_ERRORS });
      navigate("/forgot-password", { replace: true });
    }
  }, [requestSuccess, navigate]);

  return (
    <div className={styles.registration}>
      {/* {(requestStart || requestError) ?
                (<p> {requestStart ? 'Загрузка...' : requestError ? 'Произошла ошибка' : " "}</p>) :
                requestSuccess ? alert('Пароль сброшен') :   */}
      (
      <form className={styles.main} onSubmit={onSubmit}>
        <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
        <PasswordInput
          placeholder={"Введите новый пароль"}
          name={"password"}
          extraClass="mb-6"
          value={state.password}
          onChange={onChange}
        />
        <Input
          placeholder="Введите код из письма"
          extraClass="mb-6"
          name="token"
          value={state.token}
          onChange={onChange}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass="mb-20"
        >
          Сохранить
        </Button>
        <div className={styles.bottom}>
          <p className="text text_type_main-default text_color_inactive">
            Вспомнили пароль?
          </p>
          <Link to="/login" className={styles.link}>
            <Button htmlType="button" type="secondary" size="medium">
              Войти
            </Button>
          </Link>
        </div>
      </form>
      ){/* }  */}
    </div>
  );
}
