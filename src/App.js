import { useState , useEffect } from "react";
import "./App.css";
import AddNewMovie from "./Components/AddNewMovie";
import MovieList from "./Components/MovieList";
import Search from "./Components/Search";
//import { moviesData } from "./data";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Detail from "./Components/Detail";
import axios from 'axios'; 

function App() {
  
  const [data, setData] = useState();
  const [textSearch, setTextSearch] = useState("")
  const [rating, setRating] = useState("")
  const handleSearch=(x)=>setTextSearch(x)
  const handleRating=(x)=>setRating(x)
  const handleDelete=(x)=>
  
  {
    console.log("louy louay ",x)
/*methode delete*/
axios
.delete("http://127.0.0.1:3000/deltelfilm", {
  id:x
} )
.then((data) => {
  console.log(data.data)
})
.catch((err) => {
  console.log(err);
});
setData(data.data)
  }

  
  const handleAdd=(newMovie)=>setData([...data,newMovie])
  const handleEdit=(editedMovie)=>
  
  { 
  /*methode put*/
axios
.put("http://127.0.0.1:3000/putFilm", {
  id:editedMovie
} )
.then((data) => {
  console.log("aaaaaaaaaaaaaaaaaaaaa",data.data)
})
.catch((err) => {
  console.log(err);
});
setData(data.data)
//setData(data.map(el=>el._id===editedMovie.id?editedMovie:el))
  }
  
  
  
  
  
  useEffect(() => {
    axios
      .get("http://127.0.0.1:3000/getallfilm")
      .then((data) => {
        console.log(data.data)
        setData(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="App">
      <Router>
      <Search textSearch={textSearch} rating={rating} handleSearch={handleSearch} handleRating={handleRating}/>
      <AddNewMovie handleAdd={handleAdd}/>
       <Routes>
       {console.log("************************" , data)}
       <Route path="/" element={

        <MovieList list={data?.filter( (el, index) =>el?.name.toLowerCase().includes(textSearch.toLowerCase())&&el.rating>=rating)} handleDelete={handleDelete} handleEdit={handleEdit} />

       } />
       <Route path="/Detail/:id" element={<Detail list={data}/>} />
       </Routes>
      </Router>
    </div>
  );
}

export default App;