import { nanoid } from 'nanoid';
import './App.css'
import { CLIENT_ID } from './Secrets';
import Cookies from 'js-cookie';
import FacebookLogin from 'react-facebook-login';
import { useState } from 'react';


function App() {
  const [userData, setUserData] = useState({});

  const handleLinkedInLogin = () => {
    const clientId = CLIENT_ID;
    const redirectUri = encodeURIComponent("http://localhost:5173/auth/linkedin");
    const scope = 'openid%20profile%20email';
    const responseType = 'code';
    //alert(redirectUri);
    const state = nanoid(10);
    Cookies.set('linkedin_auth_state', state, { expires: 1 / 24 });
    window.location.href =
      `https://www.linkedin.com/oauth/v2/authorization?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`;

  };

  const responseFacebook = (response) => {
    console.log(response);
    setUserData({
      name: response.name,
      email: response.email,
      picture: response.picture.data.url,
      accessToken: response.accessToken,
    })
  }

  return (
    <div>
      <h1>Login with LinkedIn</h1>
      <button onClick={handleLinkedInLogin}>Login with LinkedIn</button>
      <br />
      <br />
      <div>
        {userData.name ? (
          <div>
            <img src={userData.picture} alt={userData.name} />
            <p>Welcome, {userData.name}</p>
            <p>Email: {userData.email}</p>
            <p>Access Token: {userData.accessToken}</p>
          </div>
        ) : (
          <FacebookLogin
            appId="469405356115253"
            autoLoad={false}
            fields="name, email, picture"
            callback={responseFacebook}
          />
        )}
      </div>
    </div>
  );
}

export default App
