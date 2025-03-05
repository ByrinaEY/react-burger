import React, { useRef, useEffect, FC } from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsCard from "./burger-ingredients-card/burger-ingredients-card";
import { TIngredient } from "../utils/data-prop-types";
import { useSelector } from "react-redux";
import { loadIngredients } from "../../services/selectors";

const BurgerIngredients: FC = () => {
  const { ingredients } = useSelector(loadIngredients);
  const [current, setCurrent] = React.useState("bun");
  const primaryRef = useRef<any>(null);
  const bunRef = useRef<any>(null);
  const sauceRef = useRef<any>(null);
  const toppingsRef = useRef<any>(null);
  const listBun = ingredients.filter(
    (item: TIngredient) => item.type === "bun"
  );
  const listMain = ingredients.filter(
    (item: TIngredient) => item.type === "main"
  );
  const listSauce = ingredients.filter(
    (item: TIngredient) => item.type === "sauce"
  );

  const setTab = (tab: string) => {
    setCurrent(tab);
    const element = document.getElementById(tab);
    console.log(document.getElementById(tab));
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  function handleScroll() {
    const bunDistance = Math.abs(
      primaryRef.current.getBoundingClientRect().top -
        bunRef.current.getBoundingClientRect().top
    );
    const sauceDistance = Math.abs(
      primaryRef.current.getBoundingClientRect().top -
        sauceRef.current.getBoundingClientRect().top
    );
    const mainDistance = Math.abs(
      primaryRef.current.getBoundingClientRect().top -
        toppingsRef.current.getBoundingClientRect().top
    );
    const minDistance = Math.min(bunDistance, sauceDistance, mainDistance);
    const currentHeader =
      minDistance === bunDistance
        ? "bun"
        : minDistance === sauceDistance
          ? "sauce"
          : "main";
    // setCurrent(prevState => (currentHeader === prevState.current? prevState.current : currentHeader))
    setCurrent((prevState) =>
      currentHeader === prevState ? prevState : currentHeader
    );
  }

  useEffect(() => {
    document.querySelector(`#${current}`)?.scrollIntoView();
  }, [current]);

  return (
    <section className={styles.section}>
      <h1 className={`${styles.h1} text text_type_main-large mt-10 mb-5`}>
        Соберите бургер
      </h1>
      <div className={`${styles.tab} pb-10`}>
        <Tab value="bun" active={current === "bun"} onClick={setTab}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === "sauce"} onClick={setTab}>
          Соусы
        </Tab>
        <Tab value="main" active={current === "main"} onClick={setTab}>
          Ничинки
        </Tab>
      </div>
      <div className={styles.scroll} ref={primaryRef} onScroll={handleScroll}>
        <div ref={bunRef} id="bun">
          <BurgerIngredientsCard title={"Булки"} data={listBun} />
        </div>
        <div ref={sauceRef} id="sauce">
          <BurgerIngredientsCard title={"Соусы"} data={listSauce} />
        </div>
        <div ref={toppingsRef} id="main">
          <BurgerIngredientsCard title={"Начинки"} data={listMain} />
        </div>
      </div>
    </section>
  );
};

export default BurgerIngredients;
