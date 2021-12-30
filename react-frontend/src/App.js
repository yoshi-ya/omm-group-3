import './App.css';
import {React, useEffect, useState} from 'react';
import axios from 'axios';
import {Meme} from './Meme/Meme';
import {MemeGenerated} from './MemeGenerated/MemeGenerated';
import {Route, Routes} from 'react-router-dom';

function App() {
  const [meme, setMeme] = useState('');
  const [users, setUsers] = useState('');
  const [home, setHome] = useState('');

  useEffect(() => {
    // Runs after the first render() lifecycle

    axios.get("http://localhost:5000/home")
      .then(function (response){
        setHome(response.data)
      })
  }, [])

  async function postMeme(e){
    e.preventDefault()

    try{
      await axios.post("http://localhost:5000/post_meme", {
        meme       
      }
      )
      console.log(meme);
    }catch (error){
        console.log(error);
    }
  }

  return (
    <div className="App">
      <form onSubmit={postMeme}>
          <input type="text" value={meme} onChange={(e) => setMeme(e.target.value)} />
          <button type="submit">Send Meme</button>
        </form>
      <div>
        <h1>Meme Generator</h1>
        {home}
        <Routes>
          <Route exact path='/' element={<Meme/>}/>    
          <Route exact path='/generated' element={<MemeGenerated/>}/>
        </Routes>
      </div>
    </div>
  );
}


export default App;
