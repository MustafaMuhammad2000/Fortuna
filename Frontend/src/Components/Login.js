import React, {useState, useContext} from 'react'
import {AuthContext} from '../Context/auth-context'

export const Login = () => {
    const auth = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [displayErrors, setdisplayErrors] = useState();

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!e.target.checkValidity()) {
          setdisplayErrors(true);
          return;
        }

        try{
            const response = await fetch('http://localhost:5000/api/users/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                name: username,
                password: password
              })
            });

            const responseData = await response.json();
            if(!response.ok){
              throw new Error(responseData.message);
            }
            console.log(responseData);
            console.log("Sign up worked");
            setUsername("");
            setPassword("");
            setdisplayErrors(false);
            auth.login();
        } catch (error) {
            console.log(error);

        }
      };

    return (
        <React.Fragment>
        <h3>Login to record purchases</h3>
        <form
        noValidate
        onSubmit={onSubmit}
        className={displayErrors ? "displayErrors" : ""}
      >
          <div>
              <label>
                  Enter Username
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
              </label>
          </div>
          <div>
              <label>
                Enter Password
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
             </label>
          </div>  
          <button className="button"> Login</button>          
        </form>
        </React.Fragment>
    )
}
