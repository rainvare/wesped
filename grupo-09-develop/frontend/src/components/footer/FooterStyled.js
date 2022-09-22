import styled from 'styled-components';

export const BodyFooter = styled.footer`
background-color: #fff;
box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.2);
z-index:2;
position: fixed;
bottom:0;
width: 100%;

`

export const ContainerFooter = styled.div`
/* background:${props => props.theme.primary};
opacity: .9; */
height: 50px;
display: flex;
 align-items: center;
justify-content: space-between; 
padding:20px;
max-width: 1366px;
margin: 0 auto;
bottom:0;
z-index:2;

@media (min-width:769px){
  width:100%;
}

`
export const FooterBlock = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.theme.primary};
  padding:18px 0 18px 10px;


`
export const FooterText = styled.p`
  font-weight: 600;
  font-size: 20px;
  @media (max-width: 768px){
    font-size:18px;
  }


`;


export const FooterIcon = styled.a`
  padding-right:10px;
  font-size: 20px;
  align-items: center;
  line-height: 0;
  cursor: pointer;
  color: inherit;
  
  @media (max-width: 414px) {
    display: none;
  }

  @media (max-width: 600px) {
    display: none;
  }


`

