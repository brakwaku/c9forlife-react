import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <FooterWrapper>
      <MenuWrapper>
        <NavLink to="/"> Home</NavLink> |<NavLink to="/about"> About</NavLink> | <a target="_blank" rel="noreferrer" href="mailto:Mads@c9ForLife.com">
          Email
        </a>
      </MenuWrapper>
      <PhoneNumberWrapper>
      <a target="_blank" rel="noreferrer" href="tel:1‪(801)923-8133‬">Call: ‪(801)923-8133‬</a> | <a target="_blank" rel="noreferrer" href="sms:1‪(801)923-8133‬">Text: ‪(801)923-8133‬</a>
      </PhoneNumberWrapper>

      <MySignWrapper>C9forlife &copy; 2020 | Developed by Kwaku Appau-Nkansah</MySignWrapper>
    </FooterWrapper>
  );
};

export default Footer;

const FooterWrapper = styled.footer`
  background-color: #343a40;
  width: 100%;
  text-align: left;
  font-family: sans-serif;
  font-weight: bold;
  font-size: 16px;
  padding: 20px;
  margin-top: -16px;
  text-align: center;
  color: white;
`;

const MenuWrapper = styled.p`
  margin: 20px 0 12px;
  padding: 0;

  > a {
    text-decoration: none;
  }
`;

const PhoneNumberWrapper = styled.p`
  > a {
    text-decoration: none;
  }
`;

const MySignWrapper = styled.p`
  color: rgb(185, 185, 185);
  font-weight: lighter;
  font-size: .7rem;
  opacity: .5;
`;
