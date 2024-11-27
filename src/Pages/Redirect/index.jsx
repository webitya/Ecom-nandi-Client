import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Redirecting = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');

        console.log("redirecting page-", token)

        if (token) {
            try {
                localStorage.setItem('token', token);
                navigate('/')
            } catch (storageError) {
                console.error('Error storing token:', storageError);
                navigate('/login');
            }
        } else {
            console.error('No token found, redirecting to login');
            navigate('/login');
        }
    }, []);

    return <div>Redirecting...</div>;
};

export default Redirecting;