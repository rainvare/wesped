import React from "react";
import Modal from "react-modal";
import { BodyStyle, DivStyle, ImageStyle, H2Style, H3Style } from "./StyledSuccessTemplate";
import logo from "../../ui/success.png";
import Button from "../../components/button/Button";
import { Link } from 'react-router-dom'


const buttonStyles = {
  content: {
    position: "absolute",
    background: "#1DBEB4",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.12)",
    borderRadius: "5px",
  },
};

Modal.setAppElement("#root");

function SuccessTemplate({title, message}) {
  return (
    <BodyStyle >     
        <DivStyle>
          <ImageStyle src={logo} alt="Logo Success" />
          <H2Style>{title}</H2Style>
          <H3Style>{message}</H3Style>
          <Link to={'/'}>
            <Button
              width="10rem"
              theme="secondary"
              style={buttonStyles}
            >
              ok
            </Button>
          </Link>
        </DivStyle>  
    </BodyStyle>
  );
}

export default SuccessTemplate;
