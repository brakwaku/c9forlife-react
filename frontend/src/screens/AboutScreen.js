import styled from "styled-components";
import backgroungImg from "../assets/fam.jpg";

const AboutScreen = () => {
  document.title = "C9ForLife | About";
  return (
    <MainWrapper>
      <ContentWrapper className="container">
        <h1>WE ARE FAMILY!!</h1>
        <div className="card border-primary">
          <p>
            C9ForLife was created by Maddie Glance a Survivor. See her story at{" "}
            <a
              href="https://www.c9forlife.com"
              target="_blank"
              rel="noreferrer"
            >
              www.c9forlife.com
            </a>
            . She is on a journey to help other survivors come forward, help
            people with PTSD, and to fix the justice system in hopes to make a
            safer world for all those who are survivors of trauma. Remember that
            you are not alone, there are many others who are here to help you.
            Together we can get through the anxiety, fear, and move forward to
            acheive your own Cloud Nine.
          </p>
        </div>
        <a
          href="https://www.psychologytoday.com/us/therapists"
          target="_blank"
          rel="noreferrer"
          className="btn btn-danger"
        >
          Get Help
        </a>
      </ContentWrapper>
    </MainWrapper>
  );
};

export default AboutScreen;

const MainWrapper = styled.div`
  min-height: 80vh;
  background-image: url(${backgroungImg});
  background-attachment: fixed;
  /* Full height */
  height: auto;
  /* Center and scale the image nicely */
  width: 100;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  color: white;
`;

const ContentWrapper = styled.div`
  > h1 {
    font-size: 10vw;
    font-weight: bold;
    text-align: center;
    color: rgb(9, 175, 180);
  }

  > div {
    background-color: rgba(245, 245, 245, 0.604);
    padding: 2rem;
    font-weight: bold;
    max-width: 85%;
    margin: auto;
    color: rgb(65, 65, 65);
  }

  > a {
      margin-top: 2.5rem;
      margin-bottom: 2.5rem;
      margin-left: 48%;
  }
`;
