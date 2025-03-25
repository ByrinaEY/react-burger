import styles from "./card-order.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector } from "react-redux";
import { loadIngredients } from "../../services/selectors";
import { TIngredient, TOrder } from "../../components/utils/type";
import { FC, useMemo } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

type TProp = {
  order: TOrder;
  isPerson?: boolean;
};

const CardOrder: FC<TProp> = ({ order, isPerson }) => {
  const location = useLocation(); 
  const countItemsMax = 6;
  const { ingredients } = useSelector(loadIngredients);

  const orderStatus = useMemo(
    () => order.status === 'done'
      ? 'Выполнен' 
      : order.status === 'created' 
        ? 'Создан'
        : 'Готовится'
    , [order]
  );

  const colorStatus = useMemo(
    () => order.status === 'done' ? styles.status_done : styles.status_default
    , [order]
  );

  const orderIngredients = useMemo(
    () => order.ingredients.map((elemId: string) => {
      return ingredients!.find((elem: TIngredient) => elem._id === elemId)
    }), [ingredients, order]
  );

  const firstSixItems = useMemo(
    () => orderIngredients.slice(0, countItemsMax)
    , [orderIngredients]
  );

  const orderAmount = useMemo(
    () => orderIngredients.reduce( (amount: number, elem: TIngredient | undefined) => elem!.price + amount, 0)
    , [orderIngredients]
  );


  return (
    <Link className={`${styles.main}`}
    to={`${location.pathname}/${order.number}`}
    state={{ location: location }}
  > 
    <div className="m-6">
      <div className={styles.main}>
        <div className={styles.order_header}>
          <p className="text text_type_digits-default m-6">#{order.number}</p>
          <FormattedDate
            date={new Date(order.createdAt)}
            className="text text_type_main-default text_color_inactive m-6"
          />
        </div>
        <p className={`${styles.title_order} text text_type_main-medium ml-6`}>
          {order.name}
        </p>
        {isPerson && orderStatus &&
          <p className={`${styles.status_order} ${colorStatus} text text_type_main-default`}>
            {orderStatus}
          </p>
        }

        <div className={styles.filling}>
          <div className={styles.images_selection}>
            {firstSixItems && firstSixItems.map((item: TIngredient | undefined, i: number) => {
              let right = -2 * 10;
              let countHide = order.ingredients.length - countItemsMax;
              return (
                <li
                  key={i}
                  style={{ marginRight: right }}
                  className={styles.image_fill}>
                  <img
                      style={{ opacity: countItemsMax === (i + 1) && countHide > 0 ? '0.4' : '1' }}
                      src={item!.image_mobile}
                      alt={item!.name}
                      className={styles.image_position} />
                  {countHide > 0 && i === (countItemsMax - 1) &&
                    <span className={`${styles.count_hidden} text text_type_main-default`}>+{countHide}</span>
                  }
                </li>
              )
            })}
          </div>
          <div className={styles.price}>
            <span className={`text text_type_digits-default`}>{orderAmount}</span>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </div>
     </Link>
  );
};

export default CardOrder;
