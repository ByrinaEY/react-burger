import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrdersUser } from '../../services/selectors';
import { ORDERS_USER_END, ORDERS_USER_START } from '../../services/actions/orders-user';
import { WS_URL } from '../../components/utils/server';
import styles from './profile-orders.module.css';
import Orders from '../../components/orders/orders';
import { TOrdersList } from '../../components/utils/type';

function ProfileOrders() {
    const dispatch = useDispatch();
    const { connected, error, message } = useSelector(getOrdersUser);

    const messageSorted: TOrdersList | null = useMemo(() => {
        if (!message) {
            return null;
        }
        let orders = [...message.orders];
        return { ...message, orders: orders.sort((a, b) => b.number - a.number) };
    }, [message]);

    useEffect(() => {
        dispatch({ type: ORDERS_USER_START, url: `${WS_URL}/orders`, addToken: true });
        return () => {
            dispatch({ type: ORDERS_USER_END });
        }
    }, [dispatch]);

    return (
        <div className={styles.container}>
            {!connected && <p className={`mb-2 error-text text text_type_main-default`}>loading</p>}
            {!!error && <p className={`mb-2 error-text text text_type_main-default`}>{error}</p>}
            {connected && !!messageSorted && (
                <Orders data={messageSorted!} />
            )}
        </div>
    );
}

export default ProfileOrders;