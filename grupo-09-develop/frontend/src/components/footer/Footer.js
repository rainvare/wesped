import { FaFacebook, FaLinkedinIn, FaTwitter, FaInstagram } from "react-icons/fa";
import { BodyFooter, ContainerFooter, FooterBlock, FooterText, FooterIcon } from './FooterStyled'



import React from 'react'

export default function Footer() {
    return (
        <BodyFooter>
            <ContainerFooter>
            <FooterBlock>
                <FooterText> ©2022 Wesped</FooterText>
            </FooterBlock>
            <FooterBlock>
                <FooterIcon href="https://www.linkedin.com/in/wesped-%E3%85%A4-802504250/"><FaLinkedinIn /></FooterIcon>
                <FooterIcon href="https://twitter.com/WespedP"><FaTwitter /></FooterIcon>
                <FooterIcon href="https://www.instagram.com/wespedp/"><FaInstagram /></FooterIcon>
            </FooterBlock>
        </ContainerFooter >
        </BodyFooter>

        

    )
}
