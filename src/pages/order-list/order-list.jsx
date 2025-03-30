import Orders from "../../components/orders/orders";
import OrdersInProgress from "../../components/orders-in-progress/orders-in-progress";
import styles from "./order-list.module.css";
import { useDispatch, useSelector } from "react-redux";
import { ORDERS_ALL_END, ORDERS_ALL_START } from '../../services/actions/orders-all';
import { WS_URL } from '../../components/utils/server';
import { getOrdersAll } from '../../services/selectors';
import { useEffect } from 'react';


function OrderList() {
  const dispatch = useDispatch();
  const { connected, error, message } = useSelector(getOrdersAll);

  useEffect(() => {
      dispatch({ type: ORDERS_ALL_START, url: `${WS_URL}/orders/all` });
      return () => {
          dispatch({ type: ORDERS_ALL_END });
      }
  }, [dispatch]);
  return (
    <div className={styles.main}>
            {!error && <p className={`mb-2 error-text text text_type_main-default`}>{error}</p>}
            { !!message && (
              
      <div className={styles.div}>
        <Orders data={message} isPerson={false} />
        <OrdersInProgress data={message} /> 
      </div>)}
    </div>
  );
}

export default OrderList;
