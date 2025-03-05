import { useEffect, useState, useCallback, FC } from "react";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import { TIngredientConstructor } from "../utils/data-prop-types";
import Modal from "../modal/modal.jsx";
import OrderDetails from "../order-details/order-details.js";
import { useDispatch, useSelector } from "react-redux";
import { getIngredientsFromConstructor } from "../../services/selectors.js";
import { useDrop } from "react-dnd";
import {
  SET_BUN,
  SET_TOTAL,
  DELETE_INGREDIENT,
} from "../../services/actions/burger-constructor.js";
import { createOrderAction } from "../../services/actions/create-order.js";
import { createUniqKeyForIngredientAction } from "../../services/actions/burger-constructor.js";
import BurgerConstructorIngredient from "./burger-constructor-ingredient/burger-constructor-ingredient.jsx";
import { useNavigate } from "react-router";
import { auth } from "../../services/selectors.js";

const BurgerConstructor: FC = () => {
  const { ingredients, bun, total } = useSelector(
    getIngredientsFromConstructor
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userLoggedIn, requestStart } = useSelector(auth);

  const [isOpenModal, setIsOpenModal] = useState(false);
  function showModalWindow() {
    setIsOpenModal(true);
  }
  function closeModalWindow() {
    setIsOpenModal(false);
  }

  useEffect(() => {
    let sum = 0;
    if (bun) {
      sum = sum + bun.price * 2;
    }
    sum =
      sum +
      ingredients.reduce(
        (sum: number, item: TIngredientConstructor) => sum + item.price,
        0
      );
    dispatch({ type: SET_TOTAL, sum });
  }, [bun, ingredients, dispatch]);

  //перенос компонентов
  const [, dropTargetIngredient] = useDrop({
    accept: ["sauce", "main"],
    drop(item) {
      dispatch(createUniqKeyForIngredientAction(item) as any);
    },
  });

  const [, dropTargetTopBun] = useDrop({
    accept: ["bun"],
    drop(item) {
      dispatch({ type: SET_BUN, item: item });
    },
  });

  const [, dropTargetLowerBun] = useDrop({
    accept: ["bun"],
    drop(item) {
      dispatch({ type: SET_BUN, item: item });
    },
  });

  function deleteIngredient(index: number) {
    dispatch({ type: DELETE_INGREDIENT, index: index });
  }

  const createOrder = useCallback(() => {
    if (requestStart) {
      return;
    }
    if (!userLoggedIn) {
      navigate("/login", { replace: true });
    } else {
      let orderIngredients = [];
      for (let item of ingredients) {
        orderIngredients.push(item._id);
      }
      if (bun) {
        orderIngredients.push(bun._id, bun._id);
      }
      dispatch(createOrderAction(orderIngredients) as any);
    }
    showModalWindow();
  }, [requestStart, userLoggedIn, navigate, ingredients, bun, dispatch]);

  return (
    <section className={styles.section}>
      <div className="mt-25 ml-8">
        <div ref={dropTargetTopBun}>
          {bun ? (
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          ) : (
            <div
              className={`${styles["empty-element"]} constructor-element constructor-element_pos_top ml-8`}
            >
              <div
                className={`${styles["empty-element-text"]} text text_type_main-default`}
              >
                Перетащите булочку
              </div>
            </div>
          )}
        </div>

        <ul className={styles.scroll} ref={dropTargetIngredient}>
          {ingredients && ingredients.length > 0 ? (
            ingredients.map((item: TIngredientConstructor, index: number) => (
              <BurgerConstructorIngredient
                key={item.key}
                item={item}
                index={index}
                onDelete={deleteIngredient}
              />
            ))
          ) : (
            <div
              className={`${styles["empty-element"]} constructor-element constructor-element ml-8`}
            >
              <div
                className={`${styles["empty-element-text"]} text text_type_main-default`}
              >
                Перетащите ингредиенты
              </div>
            </div>
          )}
        </ul>
        <div ref={dropTargetLowerBun}>
          {bun ? (
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          ) : (
            <div
              className={`${styles["empty-element"]} constructor-element constructor-element_pos_bottom ml-8`}
            >
              <div
                className={`${styles["empty-element-text"]} text text_type_main-default`}
              >
                Перетащите булочку
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={`${styles.total} mr-4 mt-10`}>
        <span className="text text_type_main-large mr-2 mb-1">{total}</span>
        <span className={`${styles.icon} mr-10`}>
          <CurrencyIcon type="primary" />
        </span>
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={createOrder}
        >
          Оформить заказ
        </Button>
      </div>
      {isOpenModal && (
        <Modal title={""} onClose={closeModalWindow}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
};

export default BurgerConstructor;
