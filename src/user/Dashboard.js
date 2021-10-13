import DashboardNav from "../components/DashboardNav";
import ConnectNav from "../components/ConnectNav";
import { Link } from "react-router-dom";
import { userProductPurchase } from "../actions/products";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import PurchaseCard from "../components/cards/PurchaseCard";

const Dashboard = () => {
  const {
    auth: { token },
  } = useSelector((state) => ({ ...state }));
  const [purchase, setPurchase] = useState([]);

  useEffect(() => {
    loadUserPurchase();
  }, []);

  const loadUserPurchase = async () => {
    const res = await userProductPurchase(token);
    console.log(res);
    setPurchase(res.data);
  };

  return (
    <>
      <div className="container-fluid bg-dark p-5 text-center">
        <ConnectNav />
      </div>

      <div className="container-fluid p4 mt-3">
        <DashboardNav />
      </div>

      <div className="container-fluid mt-3">
        <div className="row mb-">
          <div className="col-md-10">
            <h2>Vos achats</h2>
          </div>
          <div className="col-md-2">
            <Link to="/" className="btn btn-dark">
              Chercher des articles
            </Link>
          </div>
        </div>
      </div>
      <div className="row">
        {purchase.map((p) => (
          <PurchaseCard 
            key={p._id} 
            product={p.product} 
            session={p.session} 
          />
        ))}
      </div>
    </>
  );
};
export default Dashboard;
