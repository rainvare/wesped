import styled from "styled-components";

export const BodyHeader = styled.header`
background-color: #fff;
box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.2);
position: fixed;
z-index: 2;
width: 100%;

`

export const StyledHeader = styled.div`
  height: 80px;
  display: flex;
  justify-content: space-between;
  max-width: 1366px;
  margin: 0 auto;

`;

export const Slogan = styled.span`
  color: #545776;
  font-size: 20px;
  font-style: italic;
  animation: fadeIn 2s;

  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }

  @media (max-width: 800px) {
    display:none;
  }
`;

export const LogoSlogan = styled.div`
  display: flex;
  align-items: center;
  a {
    text-decoration: none;
  }

  @media only screen and (max-width: 414px) {
    span {
      display: none;
    }
  }
`;

export const NavContainer = styled.div`
display: flex;
align-items: center;

`
