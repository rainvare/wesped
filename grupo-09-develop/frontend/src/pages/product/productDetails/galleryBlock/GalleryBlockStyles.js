import styled from "styled-components";


export const ContainerStyles = styled.section`
// max-width: 1366px;
// margin: 0 auto;
padding: 0 30px;
position: relative;

//grid
display: grid;
grid-template-columns: 1fr 1fr;
gap: 10px;

@media (max-width: 768px) {
    display: none;
  }
`
export const ContainerImageRight = styled.div`
//grid
display:grid;
grid-template-columns: repeat(2, 1fr);
gap: 10px;

`
export const CardLeft = styled.div`
height:100%;
border-radius: 8px;
overflow: hidden;
`
export const CardRight = styled.div`
height:100%;
position:relative;
border-radius: 8px;
overflow: hidden;
`

export const ImageLeft = styled.img`
max-width: 100%;
height:100%;
width: 100%;
`
export const ImageRight = styled.img`
min-width: 100%;
max-width: 100%;
height:100%;
`

export const LinkStyles = styled.p`
position:absolute;
color: #fff;
bottom:20px;
right:50px;
font-size: 18px;
font-weight: 700;
cursor:pointer;
text-decoration: underline;
`
export const ModalStyle = styled.div`
background-color: rgba(0,0,0,0.8);
height:100%;
min-height: 100vh;
width:100%;
position: absolute;
top:81px;
left: 0px;
padding-top:120px;
display: ${props => props.isOpen ? " " : "none"};
/* min-height: 800px; */
z-index: 1;


div .carousel.carousel-slider{
  width: 960px !important;
  height: 600px;
 margin: 0 auto;
}
.carousel .thumbs-wrapper {
    display: none;
}

.carousel .slider-wrapper {
 height: 800px;
  width: 1000px;
}

.carousel .carousel-status{
  display:none
}

.carousel .control-arrow, .carousel.carousel-slider .control-arrow{
  opacity: 1.0px;
  font-size: 40px;
}

@media (max-width: 768px){
  display:none;
}

`
export const CloseModalStyle = styled.div`
top: 79px;
right: 114px;
font-size: 30px;
font-weight:600;
color: white;
position: absolute;
cursor:pointer;


`




