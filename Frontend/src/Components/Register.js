import React, {useState, useContext} from 'react'
import {AuthContext} from '../Context/auth-context'

export const Register = () => {
    const auth = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("")
    const [displayErrors, setdisplayErrors] = useState(false);
    const [error, setError] = useState();

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!e.target.checkValidity()) {
          setdisplayErrors(true);
          return;
        }
        if(password !== confirmpassword){
            setdisplayErrors(true)
            setUsername("");
            setPassword("");
            setConfirmPassword("");
            return
        }
        try{
          const response = await fetch('http://localhost:5000/api/users/signup', {
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
          setConfirmPassword("")
          setdisplayErrors(false);
          auth.login(responseData.userId, responseData.token);
        } catch (error) {
          console.log(error);
          setError(error.message)
        }
      };

    return (
        <React.Fragment>
        <h3>Make an account to record purchases</h3>
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
          <div>
              <label>
                Confirm Password
                <input
                    type="password"
                    value={confirmpassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
             </label>
          </div> 
          <button className="button">Register</button>          
        </form>
        </React.Fragment>
    )
}
