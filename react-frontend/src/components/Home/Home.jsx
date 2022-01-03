import React, {useEffect, useState} from 'react';
import axios from "axios";

const Home = () => {
    const [meme, setMeme] = useState('');
    const [users, setUsers] = useState('');
    const [home, setHome] = useState('');

    useEffect(() => {
        axios.get("http://localhost:5000/home")
            .then(function (response) {
                setHome(response.data)
            })
    }, [])

    async function postMeme(e) {
        e.preventDefault()

        try {
            await axios.post("http://localhost:5000/post_meme", {
                meme
            })
            console.log(meme);
        } catch (error) {
            console.log(error);
        }
    }

    return (<>
        <form onSubmit={postMeme}>
            <input type="text" value={meme} onChange={(e) => setMeme(e.target.value)}/>
            <button type="submit">Send Meme</button>
        </form>
        <div>
            <h1>Memes</h1>
            {home}
        </div>
    </>)
};

export default Home;
