import React from "react";
import {useState} from "react";
import {Link} from 'react-router-dom'
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from './firebase-config';
import {signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import {FcGoogle} from "react-icons/fc";


export default function Login() {
    const [LoginEmail, setaLoginEmail] = useState("");
    const [LoginPassword, setLoginPassword] = useState("");
    const [sk, setsk] = useState("");
    const [sh, setsh] = useState("");

    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    auth.languageCode = 'it';
    provider.setCustomParameters({'login_hint': 'user@example.com'});

    const sum = async (event) => {
        signInWithPopup(auth, provider).then((result) => { // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // ...
        }).catch((error) => { // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });

    };

    const login = async (event) => {
        event.preventDefault();
        signInWithEmailAndPassword(auth, LoginEmail, LoginPassword).then((userCredential) => { // Signed in
            const user = userCredential.user;
            setsh("user signed in successfully")
            // ...
        }).catch((error) => {
            const errorCode = error.code;
            setsk(errorCode);
        });
        
    };

    return (
        <div className="mt-36 mb-56">
            <p className="mt-5 text-warning text-center">
                {sh} </p>
            <form onSubmit={login}
                className="mx-auto w-50 mt-5 bg-gradient-to-r from-blue-900 via-emerald-900 to-teal-700  border border-dark border border-3 border-opacity-100 rounded">
                <h5 className="text-center m-3 text-white">Log in</h5>
                <a className=" btn  text-1xl text-center text-light bg-light  bg-opacity-10  w-100 flex items-center justify-center" rel="noreferrer noopener" onClick={sum}>
                    Log in with
                    <span className="mx-1 text-3xl">
                        <FcGoogle/>
                    </span>
                </a>
                <h5 className="text-center m-3 text-light text-2xl">OR</h5>
                <div className="m-3">
                    <label className="form-label text-white">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                        onChange={
                            (e) => {
                                setaLoginEmail(e.target.value);
                            }
                        }/>
                </div>
            <div className="m-3">
                <label className="form-label text-white">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1"
                    onChange={
                        (e) => {
                            setLoginPassword(e.target.value);
                        }
                    }/>
            </div>
            <p className="m-3">
            <Link to="/forget" className="nav-link text-warning">Forget Password</Link>
        </p>
        <p className="m-3 text-warning">
            {sk} </p>
        <p className="m-3 text-white">If you don't have an account :
            <Link to="/signup" className="nav-link text-warning">Sign up</Link>
        </p>
        <button type="submit" className="btn btn-dark m-3"
            onClick={login}>Log in</button>
    </form>
</div>
    );
}

