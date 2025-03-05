import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback , useEffect} from "react";
import styles from "./forgot-password.module.css";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../services/selectors";
import { recoverPWAction } from "../../services/actions/auth";
import { Link, useNavigate } from "react-router-dom";
import { AUTH_CLEAR_ERRORS } from "../../services/actions/auth";
import { useForm } from "../../components/hook/useForm";
import { TForgotPassword } from "../../components/utils/data-post";

type TState = TForgotPassword & {
  wasSubmit?: boolean;
};

export function ForgotPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { requestStart, requestError, requestSuccess } = useSelector(auth);

  const submitCb = useCallback(
      (state: TState) => {
        dispatch(recoverPWAction(state) as any);
      },
      [dispatch]
    );

  const { state, onChange, onSubmit } = useForm<TState>(
    {
      email: "",
    },
    submitCb
  );
 

  useEffect(() => {
    if (requestSuccess) {
      dispatch({ type: AUTH_CLEAR_ERRORS });
      navigate("/reset-password", { replace: true });
    }
  }, [requestSuccess]);

  return (
    <div className={"container"}>
      {requestStart || requestError ? (
        <p>
          {" "}
          {requestStart
            ? "Загрузка..."
            : requestError
              ? "Произошла ошибка"
              : undefined}
        </p>
      ) : (
        !requestSuccess && (
          <form className={styles.main} onSubmit={onSubmit}>
            <p className="text text_type_main-medium mb-6">
              Восстановление пароля
            </p>
            <EmailInput
              placeholder="Укажите e-mail"
              name={"email"}
              isIcon={false}
              extraClass="mb-6"
              value={state.email}
              onChange={onChange}
            />
            <Button
              htmlType="submit"
              type="primary"
              size="medium"
              extraClass="mb-20"
            >
              Восстановить
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
        )
      )}
    </div>
  );
}
