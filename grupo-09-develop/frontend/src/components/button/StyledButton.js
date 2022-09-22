import styled from "styled-components";

export const StyledButton = styled.button`
  border-radius: 5px;
  color: #0073A3;
  padding: 10px;
  width: ${(props) => props.width};
  cursor: pointer;
  ${(props) =>
        props.theme === "primary"
            ? `background-color: #fff;
   height: 2.5rem;
   font-size: 1rem;
   font-family: 'Roboto', sans-serif;
   border: 1px solid #0073A3;
   &:hover {
   background-color: #0073A3;
   color: #fff;
   }
   &:active {
   background-color: #0073A3;
   }`
            : `background-color: #f3776b;
   color: #fff;
   border: none;
   height: 2.5rem;
   font-size: 1rem;
   font-family: 'Roboto', sans-serif;
   box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.15);
   &:hover {
    background-color: #fa6657;
    color: #fff;
  }
  &:active {
    background-color: #f3776b;
  }
  `}
`;