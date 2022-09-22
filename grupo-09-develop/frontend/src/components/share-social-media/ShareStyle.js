const { default: styled } = require("styled-components");

export const ContainerShareStyle = styled.div`
    display: ${props => props.showShare ? "flex " : "none"};
    flex-direction: column;
    align-items: center;
    gap: 5px;
    position: absolute;
    left: 20px;
    top:50px;
    z-index: 1;
    background: #fff;
    padding: 5px;
    box-shadow: 0 0px 4px #bebebe;
    border-radius: 4px;
    `