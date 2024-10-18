import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } from './Secrets';
import axios from 'axios';

export default function AuthPage() {

    const location = useLocation();
    const navigate = useNavigate();
    const  state = location.state;
  
    useEffect(() => {
      const getAccessToken = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const receivedState = urlParams.get('state');
  
        if (receivedState !== state) {
            console.log(receivedState, state);
            console.error('State parameter does not match. Possible CSRF attack.');
            return;
        }
  
        if (code) {
          const clientId = CLIENT_ID;
          const clientSecret = CLIENT_SECRET;
          const redirectUri = REDIRECT_URI;
  
          try {
            const response = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', null, {
              params: {
                grant_type: 'authorization_code',
                code,
                redirect_uri: redirectUri,
                client_id: clientId,
                client_secret: clientSecret,
              },
            });
            const accessToken = response.data.access_token;
            console.log('Access Token:', accessToken);
          } catch (error) {
            console.error('Error fetching access token:', error);
          }
        }
        navigate('/');
      };
      getAccessToken();
    }, [navigate, state]);
  
    return <div>Redirecting...</div>;
}
