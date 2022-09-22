import styled from "styled-components";
import { Link } from "react-router-dom";


export const FormBodyStyle = styled.section`
    padding: 2rem 2.5rem 6rem 2.5rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100vw;
    margin: 0 auto;
    max-width: 1366px;  
`
export const TitleContainer = styled.h3`
padding-bottom:20px;
`

export const BoxHeaderStyle = styled.section`
height:80px;
  background-color:${props => props.theme.primary};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`

export const HeaderStyle = styled.div`
  color: #fff;
  padding: 20px 20px 0px 40px;
  
  display:flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1366px;
 margin: 0 auto;
 
`

export const Title = styled.div`
    display:flex;
    flex-direction:column;

      h2{
          font-size: 25px;
          line-height: 28px;
      }

      @media (max-width:426px){
        h4{
          font-size: 15px;  
          font-weight:300;
          padding-bottom:5px;
      }

      h2{
          font-size: 20px;
          line-height: 28px;
      }
      }
`;

export const Arrow = styled.div`
  font-size: 30px;
`
export const LinkStyle = styled(Link)`
  color: #fff;
  cursor:pointer;
`