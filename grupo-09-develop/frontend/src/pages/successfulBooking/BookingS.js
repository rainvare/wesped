import React from "react";
import SuccessTemplate from "../../components/successTemplate/SuccessTemplate";
// import Modal from "react-modal";
// import { BodyStyle, DivStyle, ImageStyle, H2Style, H3Style } from "./BookingSStyled";
// import logo from "../../ui/success-booking.png";
// import ButtonC from "../../components/button/Button";
// import { Link } from 'react-router-dom'


// const buttonStyles = {
//   content: {
//     position: "absolute",
//     background: "#1DBEB4",
//     boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.12)",
//     borderRadius: "5px",
//   },
// };

// Modal.setAppElement("#root");

function BookingS() {
  return (
    <SuccessTemplate  title={"¡Muchas Gracias!"} message={"Su reserva se ha realizado con éxito"}/>
  );
}

export default BookingS;
