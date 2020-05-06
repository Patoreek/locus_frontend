import React, {useEffect, useContext} from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';


const FavouritesView = () => {

    const [isAuth, setIsAuth] = useContext(AuthContext);

    let history = useHistory();

    useEffect(() => {
        if (!isAuth) {
                history.replace('/signup');
        }       
    },[]);

    return (
        <div>
            <h1> Favourites Section</h1>
        </div>
    );
};

export default FavouritesView;