import { useSelector } from "react-redux";
import styled from "styled-components";
import backgoundImage from "../assets/2ix.jpg";
import authorImage from "../assets/w.jpg";
import media from "../utilities/media";
import { useScrollToTop } from '../utilities/scrollToTop';

const HomeScreen = () => {
  document.title = "C9ForLife | Home";
  useScrollToTop();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <MainContainer>
      {userInfo ? (
        <LoggedInWrapper>
          {/* <div className="container">
            <h1>You Are Not Alone</h1>
          </div> */}
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-ride="carousel"
          >
            <ol className="carousel-indicators">
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="0"
                className="active"
              ></li>
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="1"
              ></li>
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="2"
              ></li>
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="3"
              ></li>
            </ol>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src="https://res.cloudinary.com/c9forlife/image/upload/v1642316772/carousel/b_sf2cjo.jpg"
                  className="d-block w-100"
                  alt="..."
                />
                <div className="carousel-caption d-none d-md-block text-primary">
                  <h2 className="text-light">Laugh</h2>
                  <h5 className="text-light">
                    A good laugh heals a lot of hurts and is sunshine in the
                    house.
                  </h5>
                </div>
              </div>
              <div className="carousel-item">
                <img
                  src="https://res.cloudinary.com/c9forlife/image/upload/v1642316772/carousel/e_ckyy2g.jpg"
                  className="d-block w-100"
                  alt="..."
                />
                <div className="carousel-caption d-none d-md-block">
                  <h2 className="text-light">Love</h2>
                  <h5 className="text-light">
                    We are most alive when we love.
                  </h5>
                </div>
              </div>
              <div className="carousel-item">
                <img
                  src="https://res.cloudinary.com/c9forlife/image/upload/v1642316772/carousel/a_sk8okq.jpg"
                  className="d-block w-100"
                  alt="..."
                />
                <div className="carousel-caption d-none d-md-block">
                  <h2 className="text-light">Live</h2>
                  <h5 className="text-light">
                    Cherish your yesterdays, dream your tomorrows and live your
                    todays
                  </h5>
                </div>
              </div>
              <div className="carousel-item">
                <img
                  src="https://res.cloudinary.com/c9forlife/image/upload/v1642316772/carousel/c_o1ijoh.jpg"
                  className="d-block w-100"
                  alt="..."
                />
                <div className="carousel-caption d-none d-md-block">
                  <h2 className="text-light">Create</h2>
                  <h5 className="text-light">
                    Life is about moments: Don't wait for them, create them.
                  </h5>
                </div>
              </div>
            </div>
            <a
              className="carousel-control-prev"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
          <TestimaoniesWrapper>
            <h2>We Are Just Like You</h2>
            <hr className="container" />
            <TestimoniesContainer>
              <PersonCard>
                <img
                  src="https://res.cloudinary.com/c9forlife/image/upload/v1642188502/testimonies/test_e81ulv.png"
                  alt="..."
                />
                <p>"Gather yourself together and report it now"</p>
              </PersonCard>

              <PersonCard>
                <img
                  src="https://res.cloudinary.com/c9forlife/image/upload/v1642188503/testimonies/test1_qyjker.png"
                  alt="Test"
                />
                <p>"Practice saying no with the little things"</p>
              </PersonCard>

              <PersonCard>
                <img
                  src="https://res.cloudinary.com/c9forlife/image/upload/v1642188503/testimonies/test2_hrcrfi.png"
                  alt="Test"
                />
                <p>"Take things at your own pace"</p>
              </PersonCard>

              <PersonCard>
                <img
                  src="https://res.cloudinary.com/c9forlife/image/upload/v1642188503/testimonies/test3_pvijyc.png"
                  alt="Test"
                />
                <p>"Don’t be alone until you are comfortable"</p>
              </PersonCard>

              <PersonCard>
                <img
                  src="https://res.cloudinary.com/c9forlife/image/upload/v1642188503/testimonies/test4_hgizvr.png"
                  alt="Test"
                />
                <p>"Its hard but try to build trust again"</p>
              </PersonCard>

              <PersonCard>
                <img
                  src="https://res.cloudinary.com/c9forlife/image/upload/v1642188503/testimonies/test5_gprz4z.png"
                  alt="Test"
                />
                <p>"I’ve learned a lot, and I am not alone"</p>
              </PersonCard>

              <PersonCard>
                <img
                  src="https://res.cloudinary.com/c9forlife/image/upload/v1642188502/testimonies/test6_l6vsmk.png"
                  alt="Test"
                />
                <p>"I’m beyond grateful for those there for me"</p>
              </PersonCard>

              <PersonCard>
                <img
                  src="https://res.cloudinary.com/c9forlife/image/upload/v1642188504/testimonies/test7_dfntx7.png"
                  alt="Test"
                />
                <p>"My growth came with the help of others"</p>
              </PersonCard>

              <PersonCard>
                <img
                  src="https://res.cloudinary.com/c9forlife/image/upload/v1642188506/testimonies/test8_ezzoat.png"
                  alt="Test"
                />
                <p>"I am glad I stopped hiding"</p>
              </PersonCard>
            </TestimoniesContainer>
          </TestimaoniesWrapper>
        </LoggedInWrapper>
      ) : (
        <NotLoggedInWrapper>
          <div className="container">
            <CaptionWrapper>WELCOME TO HAPPINESS</CaptionWrapper>
            <FrontQuoteWrapper>"Pushing For Cloud 9"</FrontQuoteWrapper>
            <MaddsQuoteWrapper>
              <p>
                This app is to help survivors of Sexual Assault, PTSD, Trauma,
                or other anxiety to help you reach and Stay at Cloud 9. We can
                do this. You can do this. Stay positive and motivated. I hope
                this app helps you in some way.
                <br /> ~ Maddie Glance
              </p>
            </MaddsQuoteWrapper>

            <GetHelpWrapper
              href="https://www.psychologytoday.com/us/therapists"
              target="_blank"
              rel="noreferrer"
            >
              <button className="btn btn-danger get-help">Get Help</button>
            </GetHelpWrapper>

            <AuthorInfoWrapper>
              <AuthorImageWrapper>
                <img src={authorImage} alt="Author" />
              </AuthorImageWrapper>
              <AuthorTextWrapper>
                <p>
                  C9ForLife was created by Maddie Glance a Survivor. See her
                  story at{" "}
                  <a
                    href="https://www.c9forlife.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    www.c9forlife.com
                  </a>
                  . She is on a journey to help other survivors come forward,
                  help people with PTSD, and to fix the justice system in hopes
                  to make a safer world for all those who are survivors of
                  trauma. Remember that you are not alone, there are many others
                  who are here to help you. Together we can get through the
                  anxiety, fear, and move forward to acheive your own Cloud
                  Nine.
                </p>
              </AuthorTextWrapper>
            </AuthorInfoWrapper>
          </div>
        </NotLoggedInWrapper>
      )}
    </MainContainer>
  );
};

export default HomeScreen;

const MainContainer = styled.div`
  min-height: 80vh;
`;

const LoggedInWrapper = styled.div`
  color: white;
`;

const NotLoggedInWrapper = styled.div`
  /* min-height: 90vh; */
  background-image: url(${backgoundImage});
  background-attachment: fixed;
  width: 100;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  color: white;
  padding-bottom: 80px;
`;

const CaptionWrapper = styled.h1`
  font-size: 10vw;
  font-weight: bold;
  text-align: right;
  color: white;
`;

const FrontQuoteWrapper = styled.h4`
  text-align: right;
  font-size: 1.5em;
  font-weight: bold;
  color: white;
`;

const MaddsQuoteWrapper = styled.div`
  background-color: #229cb28c;
  border-radius: 10px;
  font-weight: bold;
  color: white;
  padding: 1.5rem;
  margin: 3rem auto 0 auto;
`;

const GetHelpWrapper = styled.a`
  margin-left: 65vw;

  > button {
    margin-top: 2rem;
    background-color: #dc3545 !important;
    border-color: #dc3545 !important;
    font-weight: bold;

    :hover {
      background-color: #c82333 !important;
    }
  }
`;

const AuthorInfoWrapper = styled.div`
  margin: 3rem 0 0 0;
  display: flex;
  gap: 1rem;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  ${media.medium`
    flex-direction: column;
    width: 100%;
  `}
`;

const AuthorImageWrapper = styled.div`
  width: 160px;
  height: 160px;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
  > img {
    margin-left: -25%;
    height: 100%;
    width: auto;
  }
`;

const AuthorTextWrapper = styled.div`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  padding: 1rem;

  > p > a {
    text-decoration: none;

    :hover {
      text-decoration: underline;
    }
  }
`;

const TestimaoniesWrapper = styled.div`
  > h2 {
    text-align: center;
    padding: 1rem 0 0 0;
    font-weight: bolder;
    color: grey;
  }

  > hr {
    color: grey;
    width: 80%;
  }
`;

const TestimoniesContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 0 2rem 1rem 2rem;

  ${media.medium`
    flex-direction: column;
    gap: 0rem;
  `}
`;

const PersonCard = styled.div`
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  width: 13vw;
  margin: 2rem auto 2rem auto;

  > img {
    border-radius: 10px;
    width: 13vw;

    ${media.medium`
      width: 100%;
    `}
  }

  > p {
    padding: 0.5rem;
    color: grey;
  }

  ${media.medium`
    width: 100%;
  `}
`;
