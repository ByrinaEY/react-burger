import styles from './orders-in-progress.module.css';
import {TOrdersList, TOrder } from "../../components/utils/type";
import { FC, useMemo } from "react";

type TProp = {
    data: TOrdersList
};

const OrdersInProgress: FC<TProp> = ({data}) => {
    const countRowInColumn = 10;

    const doneOrders = useMemo(
        () => data.orders.filter((elem: TOrder) => elem.status === 'done')
          .map((elem: TOrder) => elem.number),
        [data.orders]
      );

      const pendingOrders = useMemo(
        () => data.orders.filter((elem: TOrder) => elem.status === 'pending')
          .map((elem: TOrder) => elem.number),
        [data.orders]
      );
    const doneOrdersFirstColumn = useMemo(
        () => doneOrders.slice(0, countRowInColumn),
        [doneOrders]
      );
      const doneOrdersSecondColumn = useMemo(
        () => doneOrders.slice(countRowInColumn, 2 * countRowInColumn),
        [doneOrders]
      );
      const pendingOrdersFirstColumn = useMemo(
        () => pendingOrders.slice(0, countRowInColumn),
        [pendingOrders]
      );
      const pendingOrdersSecondColumn = useMemo(
        () => pendingOrders.slice(countRowInColumn, 2 * countRowInColumn),
        [pendingOrders]
      );

    return (
        <div className={styles.main}>
            <div className={styles.grid}>
            <div className={styles.column}>
            <p className="text text_type_main-medium mb-6 mt-25">Готовы:</p>
            <div className={`${styles.list_number_orders} ${styles.ready_orders}`}>
                        <ul className={styles.ul_orders}>
                            {doneOrdersFirstColumn.map((item, index) =>
                                <li key={index} className="mt-2 mr-8">
                                    <span className="text text_type_digits-default">{item}</span>
                                </li>
                            )}
                        </ul>
                        <ul className={styles.ul_orders}>
                            {doneOrdersSecondColumn.map((item, index) =>
                                <li key={index} className="mt-2 mr-8">
                                   <span className="text text_type_digits-default">{item}</span>
                                </li>
                            )}
                        </ul>
                    </div> 
            </div>
           <div className={styles.column}>
           <p className="text text_type_main-medium mb-6 mt-25">В работе:</p>
           <div className={`${styles.list_number_orders}`}>
                        <ul className={styles.ul_orders}>
                            {pendingOrdersFirstColumn.map((item, index) =>
                                <li key={index} className="mt-2 mr-8">
                                    <span className="text text_type_digits-default">{item}</span>
                                </li>
                            )}
                        </ul>
                        <ul className={styles.ul_orders}>
                            {pendingOrdersSecondColumn.map((item, index) =>
                                <li key={index} className="mt-2 mr-8">
                                   <span className="text text_type_digits-default">{item}</span>
                                </li>
                            )}
                        </ul>
                    </div> 
           </div>
           </div>
           
            <p className="text text_type_main-medium mt-15">Выполнено за все время:</p>
            <p className="text text_type_digits-large mb-15">{data.total}</p>
            <p className="text text_type_main-medium">Выполнено за сегодня:</p>
            <p className="text text_type_digits-large">{data.totalToday}</p>
        </div>
    )

}

export default OrdersInProgress;