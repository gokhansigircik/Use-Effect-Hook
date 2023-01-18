import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [post, setPost] = useState(null);
  const [id, setId] = useState(1);
  //first argument is a callback second argument is an array
  //any variables that you are watching in the dependecny array
  //must always be primitive (scales) data types. (number string or boolean )where [id]
  useEffect(() => {
    const controller = new AbortController(); //abort- when u abort u avoid the memory leaks, we made our application leaner
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        signal: controller.signal, //abort - when u abort u avoid the memory leaks- we made our application leaner
      })
      .then((res) => {
        console.log(res.data);
        setPost(res.data);
      }) //specific for axios
      .catch((err) => console.log(err));
      return()=> controller.abort(); //abort - when u abort u avoid the memory leaks, we made our application leaner
  }, [id]); // if you put post nect to id u will get a infinite loop-no-no

  return (
    <div className="container">
      <h1>Use Effect Hook</h1>
      <p>
        We can hook into the following component lifecycle events with useEffect
      </p>
      <ul>
        {/* use effect hook can at the following times right after the component mounts 
        these are the 3 life cycle events that our use effect hook allaows us to hook into*/}
        <li>Component Did Mount</li>
        <li>Component Did Update</li>
        <li>Component Will Unmount</li>
      </ul>
      <form>
        <input
          type="number"
          name="id"
          id="id"
          className="form-control"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
      </form>
      {/* to get rid of the err turnary(?:) these 2 lines below are the same */}
      {/* <h2>Post: {post ? post.title : ''}</h2> */}
      <h2>Post: {post && post.title}</h2>
      <p>{post && post.body}</p>
    </div>
  );
}

export default App;
