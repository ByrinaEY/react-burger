import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients-element.module.css";
import { TIngredient } from "../../utils/data-prop-types.js";
import {useSelector } from '../../../components/hook/redux';
import { useDrag } from "react-dnd";
import { getIngredientsFromConstructor } from "../../../services/selectors.js";
import { useMemo } from "react";
import { FC } from "react";

type TProps = {
  dataItem: TIngredient;
};

const BurgerIngredientElement: FC<TProps> = ({ dataItem }) => {
  const { ingredients, bun } = useSelector(getIngredientsFromConstructor);

  const count = useMemo(() => {
    if (bun && bun._id === dataItem._id) {
      return 2;
    } else {
      return ingredients.filter(
        (item: TIngredient) => item._id === dataItem._id
      ).length;
    }
  }, [bun, ingredients]);

  //перенос компонентов
  const [, dragRef] = useDrag({
    type: dataItem.type,
    item: dataItem,
  });
  return (
    <div>
      <div className={`${styles.element} ml-4 mr-4 mt-6 mb-8`} ref={dragRef}>
        <img
          className={`${styles.image} ml-4 mb-1`}
          src={dataItem.image}
          alt={dataItem.name}
        />
        {count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
        <div className={`${styles.price} mb-1`}>
          <span className="text text_type_main-default mr-4">
            {dataItem.price}
          </span>
          <span>
            <CurrencyIcon type="primary" />
          </span>
        </div>
        <p className={`${styles.caption} text text_type_main-default mb-4`}>
          {dataItem.name}
        </p>
      </div>
    </div>
  );
};

export default BurgerIngredientElement;
