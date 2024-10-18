import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import './App.css'
import { CLIENT_ID, REDIRECT_URI } from './Secrets';



function App() {
  const navigate = useNavigate();

  const handleLinkedInLogin = () => {
    const clientId = CLIENT_ID;
    const redirectUri = REDIRECT_URI;
    const scope = 'openid%20profile%20email';
    const responseType = 'code';

    const state = nanoid(10);

    window.location.href = 
    `https://www.linkedin.com/oauth/v2/authorization?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`;
    
    navigate(`/auth/linkedin`, { state: state });
  
  };

  return (
    <div>
      <h1>Login with LinkedIn</h1>
      <button onClick={handleLinkedInLogin}>Login with LinkedIn</button>
    </div>
  );
}

export default App
