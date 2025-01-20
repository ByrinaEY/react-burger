import PropTypes from 'prop-types';
import {data} from './data.js'

export const dataPropTypes = PropTypes.shape({
    _id: PropTypes.string.isRequired,
       name: PropTypes.string.isRequired,
       type: PropTypes.string.isRequired,
       proteins: PropTypes.number.isRequired,
       fat: PropTypes.number.isRequired,
       carbohydrates: PropTypes.number.isRequired,
       calories: PropTypes.number.isRequired,
       price: PropTypes.number.isRequired,
       image: PropTypes.string.isRequired,
       image_mobile: PropTypes.string,
       image_large: PropTypes.string,
       __v: PropTypes.number

});
const dataType = {data: PropTypes.arrayOf(dataPropTypes).isRequired}
const props = {data: data};
PropTypes.checkPropTypes(dataType, props);