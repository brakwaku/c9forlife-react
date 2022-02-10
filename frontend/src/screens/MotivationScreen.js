import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { listMotivations } from "../actions/motivationActions";
import Motivation from "../components/Motivation";
import Message from "../components/Message";
import Loader from "../components/Loader";
import heroImage from "../assets/gotThis.jpg";
import { useScrollToTop } from "../utilities/scrollToTop";

const MotivationScreen = () => {
  document.title = "C9ForLife | Motivation";
  useScrollToTop();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const motivationList = useSelector((state) => state.motivationList);
  const { loading, error, motivations } = motivationList;

  useEffect(() => {
    if (userInfo === null || !userInfo) {
      navigate("/login");
    }
    dispatch(listMotivations());
  }, [dispatch, userInfo, navigate]);
  return (
    <MainWrapper>
      <HeroWrapper></HeroWrapper>
      <ContentWrapper className="container">
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            {motivations.length > 0 ? (
              motivations.map((motivation) => (
                <Motivation
                  key={motivation._id}
                  motivation={motivation}
                  type="user"
                />
              ))
            ) : (
              <center>No data to display</center>
            )}
          </>
        )}
      </ContentWrapper>
    </MainWrapper>
  );
};

export default MotivationScreen;

const MainWrapper = styled.div`
  min-height: 80vh;
`;

const HeroWrapper = styled.div`
  background-image: url(${heroImage});
  max-height: 40vh;
  min-height: 30vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
`;

const ContentWrapper = styled.div`
  margin-top: 1rem;
  margin-bottom: 2.5rem;
`;
