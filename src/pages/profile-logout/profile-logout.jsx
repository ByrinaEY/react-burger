import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { authLogoutAction, AUTH_CLEAR_ERRORS } from '../../services/actions/auth';
import { auth } from '../../services/selectors';




export function ProfileLogout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { requestError, requestSuccess, userLoggedIn } = useSelector(auth);

    useEffect(() => {
        if (userLoggedIn) {
            dispatch(authLogoutAction());
            setStarted(true);
        }
    }, [userLoggedIn, dispatch]);

    const [started, setStarted] = useState(false);

    useEffect(() => {
        if (started && requestError) {
            alert(`[Выход] ${requestError}`);
            dispatch({type: AUTH_CLEAR_ERRORS});
            setStarted(false);
        } else if (started && requestSuccess) {
            navigate("/login", { replace: true });
        }
    }, [dispatch, started, requestError, requestSuccess, navigate]);

    return (
        <div >
            {started && <p >loading</p>}
        </div>
    );
}

