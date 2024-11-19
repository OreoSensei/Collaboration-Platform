import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PrivateRoute({ children }) {
    const isAuthenticated = useSelector((state) => state.auth.isAuthentcated);

    return isAuthenticated ? children : <Navigate to="/" />;
}

export default PrivateRoute;