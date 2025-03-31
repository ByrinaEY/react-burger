import styles from './orders.module.css';
import CardOrder from '../card-order/card-order';
import { FC } from 'react';
import { TOrder, TOrdersList } from '../../components/utils/type';

type TProp = {
  data: TOrdersList,
  isPerson: boolean
};

const Orders: FC<TProp> = ({ data, isPerson }) => {
 
    return (
      <div >
         <div className={styles.scroll}>
        {data.orders && data.orders.map((elem: TOrder, index: number) => 
        <CardOrder key={index} order={elem} isPerson={isPerson} />    )}
     </div>
     </div>
    );
  }
  
  export default Orders;