import { Modal } from "antd";

const OrderModal = ({ session, orderedBy, showModal, setShowModal }) => {
  return (
    <Modal
      visible={showModal}
      title="Détails de l'achat"
      onCancel={() => setShowModal(!showModal)}
    >
      <p>N° de paiement : {session.payment_intent}</p>
      <p>Status du paiement : {session.payment_status}</p>
      <p>
        Montant Total : {session.currency.toUpperCase()}{" "}
        {session.amount_total / 100}
      </p>
      <p>Votre customer ID : {session.customer}</p>
      {/* <p>Customer: {orderedBy.name}</p> */}
    </Modal>
  );
};

export default OrderModal;
