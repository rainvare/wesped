import styled from 'styled-components';

//General
export const ContainerSearchBlock = styled.div`
  z-index:5;
  /* position:fixed; */
  width: 100%;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
 
  
  @media (max-width: 768px) {
    position: static;
    /* padding-top: 80px; */
  } 
`

export const BoxStyle = styled.div`
  padding: 10px;
   /* background-color: rgba(0, 0, 0, 0.5); */
   background-color: rgb(134 129 129 / 44%);
   max-width: 1366px;
 margin: 0 auto;
 width: 100%;
      
  `

;
//title
export const SearchBlockTitle = styled.h1`

  color: #fff;
  font-weight: 780;
  font-size: 36px;
  line-height: 42px;
  text-align: center;
  padding: 0.5em;

  @media (max-width: 847px){
    font-size: 30px;
  }

`;

//Bar 
export const SearchBar = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 0px 20px 20px 20px;

  @media(max-width: 760px){
    flex-direction: column;
    align-items: flex-end;
   
  }
`;

export const ButtonStyle = styled.div`
min-width: 254px;
height: 40px;

@media (max-width: 760px) {
  width:100%;
}
`

//Icons
export const Icon = styled.div`
  display: flex;
  margin-left: 1em;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
