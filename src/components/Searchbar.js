import React from "react";

const Header = props => {
    const {search, onInputChange, onSearchClick }= props;

    return(
       <div className="jumbotron mt-1 bg-green-500 dark:bg-black p-5">
           <h1 className="display-1 text-center text-rose-900 dark:text-white mb-5 font-mono italic font-extrabold " >
Search your mood</h1>
  <form onSubmit={onSearchClick}>
  <div className="input-group  mx-auto">
  <input type="text" className="form-control bg-gradient-to-r from-fuchsia-900 via-slate-400 to-red-500 text-white border rounded-1" placeholder="Lyrics's name" value={search} onChange={onInputChange} aria-label="Recipient's username" aria-describedby="basic-addon2" />
  <button type="button" className=" text-black dark:bg-white btn btn-primary dark:hover:bg-red-500 border border-primary rounded-1" onClick={onSearchClick}>Search</button>
</div>
  </form>
       </div>
    );
};

export default Header;