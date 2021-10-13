import { Link } from "react-router-dom";

const DashboardNav = () => {
  const active = window.location.pathname;
  // console.log(active);
  return (
    <ul className="nav nav-tabs mb-3">
      <li className="nav-item">
        <Link
          className={`nav-link link-dark ${active === "/dashboard" && "active"}`}
          to="/dashboard"
        >
          Vos achats
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className={`nav-link link-dark bold ${active === "/dashboard/seller" && "active"}`}
          to="/dashboard/seller"
        >
          Vendre
        </Link>
      </li>
    </ul>
  );
};

export default DashboardNav;
