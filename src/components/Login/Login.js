import React, { useContext, useState } from 'react'



import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInUserWithEmailPassword } from './LoginManager';



initializeLoginFramework();

function Login() {

  
 

  const [user, setUser] = useState({
    isSignIn: false,
    name: '',
    email: '',
    photo: ''
  });

  const [fb,setFb]=useState({
    isSignIn: false,
    photo: ''
  })

  const [loggedInUser,setLoggedInUser] = useContext(UserContext)

  const history= useHistory();

  const location =useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  const [newUser, setNewUser] = useState(false);

  

  
  const handleBlur = (event) => {



    let isFieldValid = true;

    if (event.target.name === 'email') {

      //console.log(event.target.value);
      const isEmailValid = /\S+@\S+\.\S+/

      isFieldValid &= isEmailValid.test(event.target.value);

      // console.log(isEmailValid.test(event.target.value));
    }
    else if (event.target.name === 'password') {

      const isPasswordValid = event.target.value.length > 6;

      const passHasNumber = /\d{1}/.test(event.target.value);

      isFieldValid &= isPasswordValid && passHasNumber;

      // console.log(isPasswordValid&&passHasNumber);
    }


    if (isFieldValid) {
      const newUserInfo = { ...user };

      newUserInfo[event.target.name] = event.target.value;

      setUser(newUserInfo);
    }



  }
  const handleSubmit = (e) => {

    e.preventDefault();

    if (newUser && user.email && user.password) {

      createUserWithEmailAndPassword(user.name,user.email,user.password)
      .then((res) => {
        handleResponse(res,true);
      })
      
    }

    if (!newUser && user.email && user.password) {

      

      signInUserWithEmailPassword(user.email, user.password)
      .then(res=>{

        handleResponse(res,true);

      })
     
    }
    


  }

  const googleSignIn=()=>{

    handleGoogleSignIn()
    .then(res=>{
      handleResponse(res,true);
    });
  }

  const signOut=()=>{

    handleSignOut()
    .then(res=>{

      handleResponse(res,false);

    })
  }

  const fbSignIn=()=>
  {
        handleFbSignIn()
        .then(res=>{

          handleResponse(res,true);
    
        })

  }

  const handleResponse =(res,redirect)=>{

    setUser(res)
    setLoggedInUser(res);
    redirect && history.replace(from);

  
  }
  

  return (
    <div style={{textAlign: 'center'}}>
     

      {
        user.isSignIn ? <button onClick={signOut} >Sign out</button>
          : <button onClick={googleSignIn}>Sign in</button>
      }

      <br/>
      <button onClick={fbSignIn}>Sign in using Facebook</button>
      {
        user.isSignIn && <div>

          <h1>Welcome to : {user.name}</h1>
          <img src={user.photo}></img>
          <h3>Email : {user.email}</h3>
        </div>
      }
       {
        fb.isSignIn && <div>

          <h1>ok</h1>
          <img src={fb.photo}></img>
          
        </div>
      }

      <h1>Our Own Authentication</h1>
      <input type="checkbox" onChange={() => setNewUser(!newUser)} name='newUser' id='' />
      <label htmlFor='newUser'>New User SignUp</label>
     
      <form onSubmit={handleSubmit}>
        {newUser && <input name='name' onBlur={handleBlur} type='text' placeholder='Your Name' required></input>
        }<br />
        <input type="text" onBlur={handleBlur} name='email' placeholder="your email address" required />
        <br />
        <input type="password" placeholder='your password' name='password' onBlur={handleBlur} id=' ' required />
        <br />
        <input type='submit' value={newUser?'Sign up' : 'Sign in'}/>
      </form>

      {
        user.success ? <p style={{ color: 'green' }}>user {newUser ? 'created' : 'Logged In'} successfully</p> : <p style={{ color: 'red' }}>Error : {user.error}</p>
      }


    </div>
  );
}

export default Login;
