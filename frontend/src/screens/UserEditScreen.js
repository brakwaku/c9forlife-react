import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUser } from '../actions/userActions';
import { useScrollToTop } from '../utilities/scrollToTop';
import { USER_UPDATE_RESET } from '../constants/userConstants';

const UserEditScreen = () => {
  document.title = 'C9ForLife | Edit User';
  useScrollToTop();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const userId = location.pathname.split('/')[3];

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (userInfo === null || !userInfo) {
      navigate('/login');
    } else if (!userInfo.isAdmin) {
      navigate(-1);
    }

    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      navigate('/admin');
    } else {
      if (!user || !user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, navigate, userId, user, userInfo, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, firstName, lastName, email, isAdmin }));
  };

  return (
    <MainWrapper className="container">
      <Link to="/admin" className="btn btn-light my-3">
        <i className="far fa-arrow-alt-circle-left"></i> Go Back
      </Link>
      <>
        <h1 className="text-center">Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <form onSubmit={submitHandler}>
            <div>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                placeholder="First Name"
                className="form-control"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                placeholder="Last Name"
                className="form-control"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div>
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <br />

            <fieldset>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckChecked"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                />
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckChecked"
                >
                  Is an Admin?
                </label>
              </div>
            </fieldset>

            <UpdateButton type="submit" className="btn btn-primary">
              Update
            </UpdateButton>
          </form>
        )}
      </>
    </MainWrapper>
  );
};

export default UserEditScreen;

const MainWrapper = styled.div`
  min-height: 75vh;
`;

const UpdateButton = styled.button`
  margin-top: 2rem;
`;
