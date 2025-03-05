import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import propTypes from 'prop-types';
import { auth } from '../../services/selectors';
import { authGetUserAction } from '../../services/actions/auth';



function ProtectedRoute({ element }) {
    const { requestStart, requestError, user } = useSelector(auth);

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        if (user.name === "") {
            dispatch(authGetUserAction());
        }
    }, [dispatch, user.name]);

    useEffect(() => {
        if (requestError) {
            navigate("/login", { replace: true, state: { from: location } });
            return undefined;
        }
    }, [requestError, navigate, location]);

   

    return requestStart || user.name === "" ? <p >Загрузка...</p>: element;
}

ProtectedRoute.propTypes = {
    element: propTypes.element.isRequired
}

export default ProtectedRoute;