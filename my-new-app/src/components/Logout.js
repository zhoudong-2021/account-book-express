import React from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import { LOGIN_URL } from '../utility';

const Logout = () => {
    const history = useHistory();

    const onLogout = async ()=> {
        const result = await axios.put(LOGIN_URL);
        if(result){
            history.push('/login');
        }
        
 }    
 
    return (

        <div className="text-center clear-fix mt-4 Logout">
            <button type="button" className="btn btn-primary float-end"
                onClick={() => onLogout()}>
                Log Out
            </button>
        </div>


    )
}

export default Logout;