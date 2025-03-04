import img from '../../images/done.png';
import PropTypes from 'prop-types';
import { getOrderDetails } from '../../services/selectors.js'
import { useSelector } from 'react-redux';
import {FC } from 'react';

const OrderDetails: FC = () =>{
    const { orderNumber, isLoading, hasError } = useSelector(getOrderDetails);  
    return (
        <div>
            {(isLoading || hasError) ?
                (<p>
                    {isLoading ? 'Загрузка...' : hasError ? 'Произошла ошибка' : undefined}</p>) :
                orderNumber && (
                    <div>
                        <p className='text text_type_digits-large'>{orderNumber}</p>
                        <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
                        <img src={img} className='mt-15' />
                        <p className='text text_type_main-default mt-15'>Ваш заказ начали готовить</p>
                        <p className='text text_type_main-default text_color_inactive mt-2 mb-30'>Дождитесь готовности на орбитальной станции</p>
                    </div>)}

        </div>)

}
OrderDetails.propTypes = {
    orderNumber: PropTypes.string
}


export default OrderDetails;