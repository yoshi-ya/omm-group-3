import Header from "./components/Header/Header";



function App() {


    return (<div className="App">
        <Header/>
        </div>);
/*
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
*/
}


export default App;
