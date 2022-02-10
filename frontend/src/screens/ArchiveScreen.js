import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getUserDetails } from "../actions/userActions";
import heroImage from "../assets/arch.jpg";
import Hero from "../components/Hero";
import styled from "styled-components";
import { useScrollToTop } from '../utilities/scrollToTop';

const ArchiveScreen = () => {
  document.title = "C9ForLife | Archive";
  useScrollToTop();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const {
    loading: loadingGetUserDetails,
    success: successGetUserDetails,
    error: errorGetUserDetails,
    user,
  } = userDetails;

  const [theUser, setTheUser] = useState(userInfo);

  useEffect(() => {
    if (userInfo === null || !userInfo) {
      navigate("/login");
    } else {
      if (!user) {
        dispatch(getUserDetails(userInfo._id));
      } else {
        setTheUser(user);
      }
    }
  }, [dispatch, userInfo, navigate, successGetUserDetails, user]);

  return (
    <MainWrapper>
      <div>
        <Hero image={heroImage} head="ARCHIVES" primary="white" />
      </div>
      <div className="pt-3">
        {loadingGetUserDetails && <Loader />}
        {errorGetUserDetails && (
          <Message variant="danger">{errorGetUserDetails}</Message>
        )}
        {theUser.archive.length > 0 ? theUser.archive.map((activity) => (
            <div className="container" key={activity._id}>
            <h5 className="font-weight-bold">{activity.archId.title}</h5>
            <h6><b>Description:</b><br /> {activity.archId.description}</h6><hr />
            </div>
        )) : <center><h5>No items in here yet. They will show once they are archived by you.</h5></center>}
      </div>
    </MainWrapper>
  );
};

export default ArchiveScreen;

const MainWrapper = styled.div`
  min-height: 75vh;
`;
