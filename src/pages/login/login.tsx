import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {useCallback } from "react";
import styles from "./login.module.css";
import { Link } from "react-router-dom";
import { useDispatch} from '../../components/hook/redux';
import { authLoginAction } from "../../services/actions/auth";
import { useForm } from "../../components/hook/useForm";
import { TLoginUser } from "../../components/utils/load-data-refresh";

type TState = TLoginUser & {
  wasSubmit?: boolean;
};

export function Login() {
  const dispatch = useDispatch();
  const submitCb = useCallback(
    (state: TState) => {
      dispatch(authLoginAction(state));
    },
    [dispatch]
  );

  const { state, onChange, onSubmit } = useForm<TState>(
    {
      email: "",
      password: "",
    },
    submitCb
  );

  return (
    <div className={"container"}>
      <form className={styles.main} onSubmit={onSubmit}>
        <p className="text text_type_main-medium mb-6">Вход</p>
        <EmailInput
          name={"email"}
          isIcon={false}
          extraClass="mb-6"
          value={state.email}
          onChange={onChange}
        />
        <PasswordInput
          name={"password"}
          extraClass="mb-6"
          value={state.password}
          onChange={onChange}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass="mb-20"
        >
          Войти
        </Button>

        <p className="text text_type_main-default text_color_inactive">
          Вы - новый пользователь?
          <Link to="/register" className={styles.link}>
            <Button htmlType="button" type="secondary" size="medium">
              Зарегистрироваться
            </Button>
          </Link>
        </p>

        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль?
          <Link to="/forgot-password" className={styles.link}>
            <Button htmlType="button" type="secondary" size="medium">
              Восстановить пароль
            </Button>
          </Link>
        </p>
      </form>
    </div>
  );
}
