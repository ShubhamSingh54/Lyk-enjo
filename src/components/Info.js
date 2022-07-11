import React, {useEffect, useState} from "react";
import Axios from "axios";


const Info = () => {

    const [ser, setser] = useState("0WdbnNKO0Jt4BZACSDQh44");
    const [Credit, setCredit] = useState([]);
    const [Cre, setCre] = useState("");


    useEffect(() => {


        getCredit();
    }, []);

    const options = {
        method: 'GET',
        url: 'https://spotify23.p.rapidapi.com/track_credits/',
        params: {
            id:ser
        },
        headers: {
            'X-RapidAPI-Key': '3785e1040cmsh2116fab0aa71fecp107d1bjsn502b9834d619',
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
    };


    const getCredit = async () => {
        Axios.request(options).then(function (response) { // console.log(response.data);

            setCre(response.data.trackTitle);
            console.log(Cre)
            setCredit(response.data.roleCredits);
            console.log(Credit);

        }).catch(function (error) {
            console.error(error);
        });
    }

    const onInputChange = e => {
        setser(e.target.value)
    };


    const onSearchClick = (event) => {
        event.preventDefault();
        getCredit();
        setser("");
    };

    return (
        <div>
            <form className="m-5"
                onSubmit={onSearchClick}>
                <div className="input-group  mx-auto">
                    <input type="text-white" className="form-control bg-gradient-to-r from-fuchsia-900 via-slate-400 to-red-500 text-white border rounded-1" placeholder="Song's id"
                        value={ser}
                        onChange={onInputChange}
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"/>
                    <button type="button" className=" text-black dark:bg-white btn btn-primary dark:hover:bg-red-500 border border-primary rounded-1"
                        onClick={onSearchClick}>Search</button>
                </div>
            </form>


            <div className="mt-36 mb-56">
                <div className="row m-4">
                    {
                    Credit.map(Credit => (
                        <div className="col-md-3 mt-4">
                            <div className="card  border-white/50  text-center bg-white/10 dark:bg-white/25">
                                {/* <img className="img-fluid w-50 mx-auto p-1 rounded-circle" src={recipe.recipe.image}></img> */}

                                <div className="card-body bg-white/10 dark:bg-white/25 text-white">

                                    <h5>
                                        Song : {Cre}</h5>
                                </div>
                                <ul className="list-group list-group-flush">

                                    <li className="list-group-item  bg-white/10 dark:bg-white/25 text-white">
                                        <h6>Role : {
                                            Credit.roleTitle
                                        }</h6>
                                    </li>
                                    <li className="list-group-item  bg-white/10 dark:bg-white/25 text-white">
                                        <h6>Artist : {
                                            Credit.artists[0].name
                                        }</h6>
                                    </li>
                                    <li className="list-group-item  bg-white/10 dark:bg-white/25 text-white">
                                        <h6>Subrole : {
                                            Credit.artists[0].subroles
                                        }</h6>
                                    </li>

                                    </ul>


                            </div>
                        </div>
                    ))
                } </div>
            </div>


        </div>
    );
};

export default Info;
