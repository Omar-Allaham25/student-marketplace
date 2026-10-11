import {Navigate,useLocation,Outlet} from 'react-router-dom';
import {useAppSelector} from '../../store/hooks';

export const ProtectedRoute=()=>{
    const {isAuthenticated}=useAppSelector((state)=>state.auth);
    const location=useLocation();
    if(!isAuthenticated){
        return <Navigate to="/login" state={{from:location}} replace/>
    }
    return <Outlet/>;
}