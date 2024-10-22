import { useEffect } from 'react';
//import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } from './Secrets';
//import axios from 'axios';
import Cookies from 'js-cookie';
//import qs from 'qs';


export default function AuthPage() {
    //const navigate = useNavigate();

    useEffect(() => {
        const getAccessToken = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');
            const receivedState = urlParams.get('state');

            const cookieState = Cookies.get('linkedin_auth_state');
            if (receivedState !== cookieState) {
                console.log(receivedState, cookieState);
                console.error('State parameter does not match. Possible CSRF attack.');
                return;
            }
            console.log(code);

            if (code) {
                try {
                    const response = await fetch('http://localhost:8080/auth_code', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            auth_code: code
                        }),
                    });
                    const data = await response.json();
                    console.log(data);
                } catch (error) {
                    console.log("Error sending data to backend", error)
                }
            }
            Cookies.remove("linkedin_auth_state");
            //navigate('/');
        };
        getAccessToken();
    }, []);

    return <div>Auth Componet</div>;
}
