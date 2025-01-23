import styles from './order-details.module.css';
import img from '../../images/done.png';
import PropTypes from 'prop-types';


function OrderDetails({numberOfOrder}) {
    return (
        <div>
            <p className='text text_type_digits-large'>{numberOfOrder}</p>
            <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
            <img src={img} className='mt-15'/> 
            <p className='text text_type_main-default mt-15'>Ваш заказ начали готовить</p>
            <p className='text text_type_main-default text_color_inactive mt-2 mb-30'>Дождитесь готовности на орбитальной станции</p>

        </div>)

}
OrderDetails.propTypes ={
    numberOfOrder: PropTypes.string.isRequired  
}


export default OrderDetails;