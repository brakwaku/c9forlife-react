import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getUserDetails } from '../actions/userActions';
import heroImage from '../assets/arch.jpg';
import Hero from '../components/Hero';
import styled from 'styled-components';
import { useScrollToTop } from '../utilities/scrollToTop';

const ArchiveScreen = () => {
  document.title = 'C9ForLife | Archive';
  useScrollToTop();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const {
    loading: loadingGetUserDetails,
    error: errorGetUserDetails,
    user,
  } = userDetails;

  useEffect(() => {
    if (userInfo === null || !userInfo) {
      navigate('/login');
    } else {
      dispatch(getUserDetails(userInfo._id));
    }
  }, [dispatch, userInfo, navigate]);

  return (
    <MainWrapper>
      <div>
        <Hero image={heroImage} head="ARCHIVES" primary="white" />
      </div>
      <Link to="/dashboard" className="btn btn-light my-3">
        <i className="far fa-arrow-alt-circle-left"></i> Go Back
      </Link>
      <div className="pt-3">
        {loadingGetUserDetails && <Loader />}
        {errorGetUserDetails && (
          <Message variant="danger">{errorGetUserDetails}</Message>
        )}
        {user && user.archive.length > 0 ? (
          user.archive.map((activity) => (
            <div className="container" key={activity._id}>
              <h5 className="font-weight-bold">{activity.archId.title} {activity.quantity > 1 ? `(${activity.quantity} times)` : ''}</h5>
              <h6>
                <b>Description:</b>
                <br /> {activity.archId.description}
              </h6>
              <hr />
            </div>
          ))
        ) : (
          <center>
            <h5>
              No items in here yet. They will show once they are archived by
              you.
            </h5>
          </center>
        )}
      </div>
    </MainWrapper>
  );
};

export default ArchiveScreen;

const MainWrapper = styled.div`
  min-height: 75vh;
`;
