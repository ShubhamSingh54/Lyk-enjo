import React, {useState, useEffect} from "react";
import './index.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from './components/Searchbar';
import Lyk from './components/lyk';
import Foot from "./components/Foot";
import Navbar from "./components/Navbar"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Forget from "./components/Forget"
import Fav from "./components/Fav";
import Axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { auth} from "./components/firebase-config";
import Wishes from './components/Wishes';
import Info from "./components/Info"


function App() {

    const [search, setSearch] = useState("bollywood");
    const [Lyrics, setLyrics] = useState([]);
   
    const [ypt, setypt] = useState(false);
    const [fav, setfav] = useState([]);

 
   


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
       
        setypt(true);
      } else {
        
        setypt(false);
      }
    });
  
    getLyx();
  }, [auth.currentUser]);

  const options = {
    method: 'GET',
    url: 'https://spotify23.p.rapidapi.com/search/',
    params: {
      q:search,
      type: 'multi',
      offset: '0',
      limit: '50',
      numberOfTopResults: '5'
    },
    headers: {
      'X-RapidAPI-Key': '3785e1040cmsh2116fab0aa71fecp107d1bjsn502b9834d619',
      'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
    }
  };

    const getLyx = async () => {
      Axios.request(options).then(function (response) {
        console.log(response.data.tracks.items);
        setLyrics(response.data.tracks.items);
      }).catch(function (error) {
        console.error(error);
      });
    }
    

    const onInputChange = e => {
        setSearch(e.target.value)
    };

  


    const onSearchClick = (event) => {
        event.preventDefault();
        getLyx();
        setSearch("");
    };

   

    return (

      <div className="bg-green-500 dark:bg-black">
        <BrowserRouter>
        <Navbar setfav={setfav} />
        <Wishes />
        
        <Routes>
        <Route path="/login" element={<div>
                <Login />
                <Foot />
            </div>} />
            <Route path="/info" element={<div>
                <Info />
                <Foot />
            </div>} />
            <Route path="/" element={<div className="bg-green-500 dark:bg-black ">
            <div>
                <Header search={search}
                onSubmit={onSearchClick}
                    onInputChange={onInputChange}
                    onSearchClick={onSearchClick}/>
                <> { ypt ? 
                   <div> <div className="container">
                        <Lyk Lyrics={Lyrics}/>
                    </div> <Foot />
                    </div> :
                    <div>
                    <Login />
                    <Foot />
                    </div>
                } </>
            </div>
        </div>} />
         <Route path="/signup" element={
        <div>
        <Signup />
        <Foot /> 
                </div>
        } />
         <Route path="/forget" element={
        <div>
<Forget/>
<Foot /> 
        </div>
        } />
         <Route path="/fav" element={<div>
          <> { ypt ? 
                    <div> <Fav fav={fav}/> <Foot />
                    </div> : <div>
                    <Login />
                    <Foot /> 
                    </div>
                } </>
          
          </div>
          }
           />
        </Routes>
        </BrowserRouter>
        </div>
    );
}

export default App;