import React from "react";
import {useState} from "react";
import {Link} from 'react-router-dom'
import {sendPasswordResetEmail} from "firebase/auth";
import {auth} from './firebase-config';


export default function Forget() {
    const [email, setemail] = useState("");
    const [sa, setsa] = useState("");

    const forgetpassword = async (event) => {
        event.preventDefault();
        sendPasswordResetEmail(auth, email).then(() => {
            alert("Password reset email sent to your provided email");
        }).catch((error) => {
            const errorCode = error.code;
            setsa(errorCode);
        });

    };

    return (
        <div className="mt-36 mb-56">
            <form onSubmit={forgetpassword}
                className="mx-auto w-50 mt-5 bg-gradient-to-r from-blue-900 via-emerald-900 to-teal-700   border border-dark border border-3 border-opacity-100 rounded">
                <h5 className="text-center m-3 text-white">Forget Password</h5>
                <div className="m-3">
                    <label className="form-label text-white">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                        onChange={
                            (e) => {
                                setemail(e.target.value);
                            }
                        }/>
                </div>
            <p className="m-3 text-warning">
                {sa} </p>
            <p className="m-3">
                <Link to="/login" className="nav-link text-warning">Log in</Link>
            </p>
            <button type="submit" className="btn btn-dark m-3"
                onClick={forgetpassword}>Send reset link</button>
        </form>
    </div>
    );
}