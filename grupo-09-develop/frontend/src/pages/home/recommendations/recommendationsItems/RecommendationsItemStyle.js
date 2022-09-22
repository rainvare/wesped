import styled from "styled-components";
import { Link } from "react-router-dom";


export const ItemRecommendationStyle = styled.div`
display:flex;
flex-flow: row nowrap;
height: 100%;

@media (max-width: 414px){
    flex-direction: column;   
}

@media (min-width: 415px) and (max-width: 768px) {
  width: 100%;
  justify-content: space-between;
}
`

export const ImageWrapperStyle = styled.div`
width: 50%;
@media (min-width: 415px) and (max-width: 768px) {
  width: calc(50% - 10px);
  flex: 1;
}

@media (max-width: 414px){
  width: 100%;
}
`

export const ImageRecommendationStyle = styled.img`
width:100%;
height:100%;
/* border-radius:8px 8px 0 0; */
object-fit: cover;

@media (max-width: 414px) {
  width: 100%;
  height: 100%;
}

@media (min-width: 415px) and (max-width: 768px) {
  object-fit: cover;
  width: 100%;
}

`;

export const InfoRecommendationsStyle = styled.div`
padding: 20px;
display: flex;
flex-direction: column;
justify-content: space-between;
flex: 1;
gap:15px;
width: 50%;

@media (max-width: 414px){
  width: 100%;
}
`;

export const CategoryStyle = styled.h3`
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
  opacity: 0.5;
  text-transform: uppercase;
  color:${props => (props.theme.text_secondary)}
`;

export const TitleStyle = styled.h2`
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  color: ${props => (props.theme.text_secondary)};
`;
export const LocationTextStyle = styled.p`
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  color:${props => (props.theme.text_secondary)}

`
export const DescriptionStyle = styled.p`
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  color:${props => (props.theme.text_secondary)};
  display: -webkit-box;
  max-height: 50px;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  
`

export const LinkStyle =styled(Link)`
 color:#fff;
 text-decoration: none;
`
;

export const IconStyle = styled.div`
display:flex;
font-size: 18px;
gap: 25px;
opacity: 0.8;
color:${props => (props.theme.primary)} ;

`