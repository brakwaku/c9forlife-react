import styled from "styled-components";
import { useScrollToTop } from '../utilities/scrollToTop';

const ContactScreen = () => {
  document.title = "C9ForLife | Contact";
  useScrollToTop();
  return (
    <ContactWrapper className="jumbotron text-center contacts">
      <div className="container">
        <br />
        <h1 id="contacts">CONTACTS</h1>
        <h5>
          Reach us via email at{" "}
          <a target="_blank" rel="noreferrer" href="mailto:Mads@c9ForLife.com">
            mads@c9forlife.com
          </a>
          ,{" "}
        </h5>
        <h5>
          Via text at{" "}
          <a target="_blank" rel="noreferrer" href="sms:1‪(801)923-8133‬">
            ‪(801)923-8133‬
          </a>
          ,
        </h5>
        <h5>
          Call us at{" "}
          <a target="_blank" rel="noreferrer" href="tel:1‪(801)923-8133‬">
            ‪(801)923-8133‬
          </a>
        </h5>
      </div>
      <a
        href="https://www.psychologytoday.com/us/therapists"
        target="_blank"
        rel="noreferrer"
      >
        <button className="btn btn-danger">Get Help!</button>
      </a>
    </ContactWrapper>
  );
};

export default ContactScreen;

const ContactWrapper = styled.div`
  height: 80vh;

  > div > h1 {
    font-size: 10vw;
    font-weight: bold;
    color: rgb(9, 175, 180);
  }

  > div > h5 > a {
    text-decoration: none;
  }

  > a > button {
    margin-top: 2rem;
    background-color: #dc3545 !important;
    border-color: #dc3545 !important;
    font-weight: bold;

    :hover {
      background-color: #c82333 !important;
    }
  }
`;
