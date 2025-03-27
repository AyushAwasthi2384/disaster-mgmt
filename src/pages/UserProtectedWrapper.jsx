import axios from "axios";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../context/UserContext.jsx";

const UserProtectedWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const { setUser } = useContext(UserDataContext);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/api/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.status) {
            setUser(response.data.user);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.log("Error in Fetching User Profile:", error);
          localStorage.removeItem("token");
          navigate("/login");
        });
    }
  }, [token, navigate, setUser]);

  if (isLoading) {
    return <div className="text-center text-3xl">Loading...</div>;
  }

  return <>{children}</>;
};

UserProtectedWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProtectedWrapper;
