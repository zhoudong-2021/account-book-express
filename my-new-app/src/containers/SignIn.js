import React, { useRef, useState } from 'react';
import AlertMessage from '../components/AlertMessage';
import { LOGIN_URL } from '../utility';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


function SignIn() {
    const emailInput = useRef(null);
    const passwdInput = useRef(null);
    const [message, setMessage] = useState(null);

    let methodOption = "POST";
    const history = useHistory();

    const submitLogin = () => {
        let email = emailInput.current.value.toString();
        let passwd = passwdInput.current.value.toString();
        // Check empty fields.
        if (!(email && passwd)) {
            setMessage("All fields must be filled.");
            return;
        }
        setMessage(null);

        // Send login info to server.
        const username = email;
        const password = passwd;
        postInfo({ username, password });
    }


    // GET method
    const postInfo = async (item) => {

        let result = {};
        if (methodOption === "GET") {
            const url = LOGIN_URL + "?username=" + item.username + "&&password=" + item.password;
            result = await axios.get(url, item);
        }
        else if (methodOption === "POST") {
            result = await axios.post(LOGIN_URL, item);
        }
        // console.log(result);
        if (result.data === true) {
            history.push("/");
        }
        else if(result.data === "REGISTERED"){
            setMessage("User has already registered, please login.");
        }
        else if(result.data === "SUCCESS"){
            setMessage("You have registered successfully, please login.");
        }
        else {
            setMessage("Wrong username or password, please check again.");
        }

    }
    return (
        <React.Fragment>
            <main className="form-signin mt-5 text-center ">

                <h1 className="h3 mb-3 fw-normal">Please sign in or register</h1>

                <div className="form-floating">
                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"
                        ref={emailInput} />
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                        ref={passwdInput} />
                    <label htmlFor="floatingPassword">Password</label>
                </div>

                {/* <div className ="checkbox mb-3">
                <label>
                <input type ="checkbox" value="remember-me"/> Remember me
                </label>
                </div> */}
                <button className="w-100 mt-2 btn btn-lg btn-primary" type="submit"
                    onClick={() => { methodOption = "GET"; submitLogin() }}
                >Sign in</button>
                <button className="w-100 mt-2 btn btn-lg btn-primary" type="submit"
                    onClick={() => { methodOption = "POST"; submitLogin() }}
                >Register</button>
                <p className="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
            </main>
            <AlertMessage
                message={message}
            />
        </React.Fragment>
    );
}

export default SignIn;