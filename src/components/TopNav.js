import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const TopNav = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => ({ ...state }));
  const history = useHistory();

  const logout = () => {
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    window.localStorage.removeItem("auth");
    history.push("/login");
  };

  return (
    <div className="nav bg-dark d-flex justify-content-between">
      <Link className="nav-link text-light" to="/">
        Home
      </Link>

      {auth !== null && (
          <Link className="nav-link text-light" to="/dashboard">
            Dashboard
          </Link>
          
      )}

      {auth != null && (
        <a className="nav-link pointer text-light" onClick={logout}>
          Logout
        </a>
      )}
      {auth === null && (
        <>
          <Link className="nav-link text-light" to="/login">
            Login
          </Link>
          <Link className="nav-link text-light" to="/register">
            Register
          </Link>
        </>
      )}
    </div>
  );
};

export default TopNav;
