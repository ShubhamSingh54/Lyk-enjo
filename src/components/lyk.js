import React, {useEffect, useState} from "react";
import {doc, setDoc, deleteDoc} from "firebase/firestore";
import {db} from "./firebase-config";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "./firebase-config";
import {getDoc} from "firebase/firestore";
import {Link} from "react-router-dom";


const Lyk = (props) => {
        const {Lyrics} = props;
        const [uid, setuid] = useState("");
        useEffect(() => {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setuid(user.uid);
                } else {
                    setuid("");
                }
            });

        }, [auth.currentUser]);


        return (<div className="row mt-4 mb-72">
            {
            Lyrics.map(Lyrics => (<div className="col-md-3 mt-4  bg-green-500 dark:bg-black">
                <div className="card   border-white/50   text-center bg-white/10 dark:bg-white/25">
                    <div className=" text-end ">
                    {/* <img className="img-fluid w-50 mx-auto p-1 rounded-circle" src={recipe.recipe.image}></img> */}
                    
                    <a href={
                                Lyrics.data.albumOfTrack.sharingInfo.shareUrl
                            }
                            target="_blank"
                            rel="noreferrer noopener">
                            <img className="img-fluid w-50 mx-auto p-1 rounded-circle"
                                src={
                                    Lyrics.data.albumOfTrack.coverArt.sources[0].url
                            }></img>
                            
                        </a>
                        </div>
                        <div className="card-body bg-white/10 dark:bg-white/25 text-white">

                            <h5>{
                                 Lyrics.data.albumOfTrack.name
                            }</h5>
                            
                        </div>

                    <ul className="list-group list-group-flush">

                        <li className="list-group-item  bg-white/10 dark:bg-white/25 text-white">
                            <h6>{
                                Lyrics.data.artists.items[0].profile.name
                            }</h6>
                        </li>
                        <li className="list-group-item  bg-white/10 dark:bg-white/25 text-white">
                            <h6>Id : {
                                Lyrics.data.id
                            }</h6>
                        </li>
                        
                        
                        


                    </ul>
                    <div className="border border-light border  border-opacity-25">
                        <a href={
                                Lyrics.data.albumOfTrack.sharingInfo.shareUrl
                            }
                            className="btn  text-light bg-white/10 dark:bg-white/25 w-100"
                            target="_blank"
                            rel="noreferrer noopener">Go to album &#10148;</a>
                            </div>
                            <div className="border border-light border  border-opacity-25">
                    <Link to="/info"
                        className="btn  text-light bg-white/10 dark:bg-white/25 w-100"
                       
                        rel="noreferrer noopener">Song's information &#10148;</Link>
                        </div>
                            <div className="border border-light border  border-opacity-25">
                    <button  className="btn  text-light bg-white/10 dark:bg-white/25 w-100" onClick={
                       async (e) =>{
                            const docRef = doc(db, uid,Lyrics.data.id );
                            const docSnap = await getDoc(docRef);
                            if (docSnap.exists()) {
                                alert("Already in favourites");
                              } else {
                                setDoc(doc(db,uid,Lyrics.data.id), {
                                    image : Lyrics.data.albumOfTrack.coverArt.sources[0].url,
                                    label : Lyrics.data.albumOfTrack.name,
                                    artist :Lyrics.data.artists.items[0].profile.name,
                                    id : Lyrics.data.id,
                                    url : Lyrics.data.albumOfTrack.sharingInfo.shareUrl 
                                  }
                                  );
                                  alert("Copied in favourites");
                              }
                       }
                    }> add to fav &#9829;</button>
                    </div>
                </div>

            </div>
        )
            )
        } </div>
    );
};

export default Lyk;
