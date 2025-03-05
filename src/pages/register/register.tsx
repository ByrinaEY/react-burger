import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useCallback } from "react";
import styles from "./register.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../services/selectors";
import { authRegisterAction } from "../../services/actions/auth";
import { AUTH_CLEAR_ERRORS } from "../../services/actions/auth";
import { useForm } from "../../components/hook/useForm";
import { TRegister } from "../../components/utils/data-post";

type TState = TRegister & {
  wasSubmit?: boolean;
};

export function Register() {
  const dispatch = useDispatch();
  const submitCb = useCallback(
    (state: TState) => {
      dispatch(authRegisterAction(state) as any);
    },
    [dispatch]
  );

  const { state, onChange, onSubmit } = useForm<TState>(
    {
      name: "",
      email: "",
      password: "",
    },
    submitCb
  );

  const { requestStart, requestError, requestSuccess } = useSelector(auth);

  useEffect(() => {
    if (requestSuccess) {
      dispatch({ type: AUTH_CLEAR_ERRORS });
      alert("Вы успешно зарегистрированы!");
    }
  }, [requestSuccess]);

  return (
    <div className={"container"}>
      <form className={styles.main} onSubmit={onSubmit}>
        <p className="text text_type_main-medium mb-6">Регистрация</p>
        <Input
          placeholder="Имя"
          extraClass="mb-6"
          name="name"
          value={state.name}
          onChange={onChange}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
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
          Зарегистрироваться
        </Button>
        <div className={styles.bottom}>
          <p className="text text_type_main-default text_color_inactive">
            Уже зарегистрированы?
          </p>
          <Link to="/login">
            <Button htmlType="button" type="secondary" size="medium">
              Войти
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
