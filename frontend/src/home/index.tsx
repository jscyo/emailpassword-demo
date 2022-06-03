
import { useSessionContext } from 'supertokens-auth-react/recipe/session'; 
import {useEffect, useState} from "react"
import { signOut } from "supertokens-auth-react/recipe/session"

function Home() {
  let {userId, accessTokenPayload} = useSessionContext();
  let [state, setState] = useState({
    userId,
    email: ""
  });

  useEffect(() => {
    setState({
      ...state,
      userId,
      email: accessTokenPayload.email
    })
  }, [])

  async function signOutUser(){
    await signOut()
    window.location.reload()
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Home Screen
          <br/>
          Userid: {state.userId}
          <br/>
          Email: {state.email}
          <br/>
          <button onClick={signOutUser}> Sign Out</button>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default Home;
