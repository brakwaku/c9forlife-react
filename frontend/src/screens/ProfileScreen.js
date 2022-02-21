import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Avatar from "../components/ImageCropper/Avatar";
import media from "../utilities/media";
import { SnackbarContext } from "../components/ImageCropper/RenderSnackBar";
import { useScrollToTop } from '../utilities/scrollToTop';

const ProfileScreen = () => {
  document.title = "C9ForLife | Profile";
  useScrollToTop();
  const [message, setMessage] = useState(null);
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [cloudinaryId, setCloudinaryId] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const setStateSnackbarContext = useContext(SnackbarContext);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const {
    loading: loadingGetUserDetails,
    error: errorGetUserDetails,
    user,
  } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;


  useEffect(() => {
    if (userInfo === null || !userInfo) {
      navigate("/login");
    } else {
      if (!user || user.email !== userInfo.email) {
        dispatch(getUserDetails('profile'));
      } else {
        setfirstName(user.firstName);
        setlastName(user.lastName);
        setEmail(user.email);
        setPhotoURL(user.photoURL);
        setCloudinaryId(user.cloudinaryId);
      }
    }
  }, [dispatch, userInfo, navigate, user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          firstName,
          lastName,
          email,
          password,
          photoURL,
          cloudinaryId,
        })
      );
    }

    if (await success) {
      return setStateSnackbarContext(
        true,
        "Profile updated successfully",
        "success"
      );
    }
  };

  return (
    <MainWrapper>
      {message && <Message variant="danger">{message}</Message>}
      {errorGetUserDetails && (
        <Message variant="danger">{errorGetUserDetails}</Message>
      )}
      {loadingGetUserDetails && <Loader />}

      <MyForm onSubmit={submitHandler}>
        <FormContentWrapper>
          <HeaderWrapper>
            <HeaderContentWrapper className="container"></HeaderContentWrapper>
            <ProfilePicWrapper>
              <input
                type="text"
                hidden
                defaultValue={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
              />
              <input
                type="text"
                hidden
                defaultValue={cloudinaryId}
                onChange={(e) => setCloudinaryId(e.target.value)}
              />
              <Avatar
                setPhotoURL={setPhotoURL}
                setCloudinaryId={setCloudinaryId}
                photoURL={photoURL}
                oldId={userInfo.cloudinaryId}
                userId={userInfo._id}
              />
            </ProfilePicWrapper>
          </HeaderWrapper>

          <BodyWrapper className="container">
            <BodyInput
              required
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setfirstName(e.target.value)}
            />
            <BodyInput
              required
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setlastName(e.target.value)}
            />
            <BodyInput
              required
              type="email"
              placeholder="Email"
              readOnly
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <BodyInput
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <BodyInput
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <UpdateButton type="submit" className="btn btn-primary">
              Update
            </UpdateButton>
          </BodyWrapper>
        </FormContentWrapper>
      </MyForm>
    </MainWrapper>
  );
};

export default ProfileScreen;

const MainWrapper = styled.div`
  min-height: 75vh;
`;

const FormContentWrapper = styled.div``;

const UpdateButton = styled.button`
  margin-top: 2rem;
`;

const HeaderWrapper = styled.div`
  max-height: 22vh;
  min-height: 20vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  /* ff 3.6+ */
  background: -moz-linear-gradient(
    90deg,
    rgba(83, 253, 185, 1) 0%,
    rgba(110, 225, 227, 1) 48%,
    rgba(250, 120, 81, 1) 100%
  );

  /* safari 5.1+,chrome 10+ */
  background: -webkit-linear-gradient(
    90deg,
    rgba(83, 253, 185, 1) 0%,
    rgba(110, 225, 227, 1) 48%,
    rgba(250, 120, 81, 1) 100%
  );

  /* opera 11.10+ */
  background: -o-linear-gradient(
    90deg,
    rgba(83, 253, 185, 1) 0%,
    rgba(110, 225, 227, 1) 48%,
    rgba(250, 120, 81, 1) 100%
  );

  /* ie 6-9 */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#FA7851', endColorstr='#53FDB9', GradientType=0 );

  /* ie 10+ */
  background: -ms-linear-gradient(
    90deg,
    rgba(83, 253, 185, 1) 0%,
    rgba(110, 225, 227, 1) 48%,
    rgba(250, 120, 81, 1) 100%
  );

  /* global 94%+ browsers support */
  background: linear-gradient(
    90deg,
    rgba(83, 253, 185, 1) 0%,
    rgba(110, 225, 227, 1) 48%,
    rgba(250, 120, 81, 1) 100%
  );
`;

const HeaderContentWrapper = styled.div`
  max-height: 25vh;
  min-height: 20vh;
`;

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 7rem;
  width: 60%;

  ${media.small`
  width: 100%;
  `}
`;

const BodyInput = styled.input`
  border: none;
  border-radius: 5px;
  margin-bottom: 8px;
  height: 40px;
  text-align: center;
`;

const MyForm = styled.form`
  min-height: 100vh;
`;

const ProfilePicWrapper = styled.div`
  position: relative;
`;
