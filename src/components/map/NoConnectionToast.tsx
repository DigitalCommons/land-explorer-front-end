import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/react-redux';
import { setOnline, setOffline } from '../../actions/ConnectivityActions'

const NoConnectionToast = () => {
    const isOnline = useAppSelector((state) => state.connectivity.isOnline);

    const dispatch = useAppDispatch();

    useEffect(() => {
        window.addEventListener('online', handleConnectionChange);
        window.addEventListener('offline', handleConnectionChange);
        dispatch(setOnline());

        return () => {
            window.removeEventListener('online', handleConnectionChange);
            window.removeEventListener('offline', handleConnectionChange);
        };
    }, []);

    const handleConnectionChange = () => {
        if (navigator.onLine) {
            console.log('Internet connection has returned');
            dispatch(setOnline());
        } else {
            console.log('Internet connection lost');
            dispatch(setOffline());
        }
    };

    return <div className="toast" style={{ display: isOnline ? 'none' : 'block' }}>
        <p className="toast-text">
            Read-only mode. Trying to connect...
        </p>
    </div>;
}

export default NoConnectionToast;
