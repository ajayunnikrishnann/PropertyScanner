import { Outlet,Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCheckBlockMutation } from "../slices/usersApiSlice";
import { useState,useEffect } from "react";
import { toast } from "react-toastify";

const PrivateRoute = ( ) => {
    const { userInfo } = useSelector((state)=> state.auth)
    const [blocked,setBlocked] = useState(false);
    const [blockCheck] = useCheckBlockMutation();

    useEffect(() => {
        const checkBlocked = async () => {
            try {
                if (userInfo) {
                    const response = await blockCheck({ id: userInfo.id });
                    console.log(response);
                    if (response.data.isBlocked) {
                        setBlocked(true);
                        toast.error("Your account is blocked");
                    }
                } else {
                    <Navigate to='/sign-in' replace />;
                }
            } catch (error) {
                console.error(error);
            }
        };

        checkBlocked();
    }, []);

    if (userInfo && !blocked) {
        return <Outlet />;
    }

    return <Navigate to="/sign-in" replace />;
    // return userInfo ? <Outlet /> : <Navigate to ="/sign-in" />
}

export default PrivateRoute