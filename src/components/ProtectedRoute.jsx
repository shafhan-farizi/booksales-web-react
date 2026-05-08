import { Navigate } from "react-router-dom";
import { useDecodeToken } from "../_services/auth";

const ProtectedRoute = ({ children, allowedRole }) => {
	const token = localStorage.getItem("accessToken");
	const decodedData = useDecodeToken(token);
	const userInfo = JSON.parse(localStorage.getItem("userInfo") || {});

    // cek validitas token
	if (!token || !decodedData || !decodedData.success) {
		return <Navigate to={'/login'} replace />
	}
    
    // cek role apakah bukan admin, jika bukan akan ditendang ke halaman beranda
    if(allowedRole && userInfo?.role !== allowedRole) {
        return <Navigate to={'/'} replace />
    }
    
    return children
};

export default ProtectedRoute;