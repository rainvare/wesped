import React from "react";
import Logo from "./minicomponents/Logo";
import Nav from "./minicomponents/Nav";
import { Link } from "react-router-dom";
import { BodyHeader, StyledHeader, LogoSlogan, Slogan, NavContainer } from './StyledHeader'
import LogoAdmin from "./minicomponents/logoAdmin/LogoAdmin";
import { UserContext } from "../../hooks/UseContext";
import { useContext } from "react";


const Header = () => {

  const { loggedUser } = useContext(UserContext)

  const slogan = [
    "Sentite como en tu hogar",
    "Tu mejor descanso en un solo lugar",
    "Encuentra la estadía de tus sueños",
    "Las mejores estadías en un solo lugar",
  ];

  const randomSloganIndex = Math.round(Math.random() * 3);


  return (
    <BodyHeader>
      <StyledHeader>
        <LogoSlogan>
          <Link to="/">
            <Logo />
          </Link>
          <Link to="/">
            <Slogan>{slogan[randomSloganIndex]}</Slogan>
          </Link>
        </LogoSlogan>
        <NavContainer>
          { loggedUser && (loggedUser.rol ==='ROLE_ADMIN') && <LogoAdmin/>} 
          <Nav />
        </NavContainer>
      </StyledHeader>
    </BodyHeader>
  );
};

export default Header;