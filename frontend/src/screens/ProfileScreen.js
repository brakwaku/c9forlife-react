import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Avatar from "../components/ImageCropper/Avatar";
import media from "../utilities/media";
import heroimage from "../assets/arch.jpg";
import { SnackbarContext } from "../components/ImageCropper/RenderSnackBar";
// import axios from "axios";
// import userprofileimage from "../assets/personPlaceholder.png";

const ProfileScreen = () => {
  document.title = "C9ForLife | Profile";
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
    // success: successGetUserDetails,
    error: errorGetUserDetails,
    user,
  } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const [theUser, setTheUser] = useState(userInfo);

  useEffect(() => {
    if (userInfo === null || !userInfo) {
      navigate("/login");
    } else {
      if (!user) {
        dispatch(getUserDetails('profile'));
      } else {
        setTheUser(user);
        setfirstName(user.firstName);
        setlastName(user.lastName);
        setEmail(user.email);
        setPhotoURL(user.photoURL);
        setCloudinaryId(user.cloudinaryId);
      }
    }
  }, [dispatch, userInfo, navigate, user, theUser]);

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
      {/* {success && <Message variant="success">Profile updated</Message>} */}
      {loadingGetUserDetails && <Loader />}
      {/* <h1>User Profile</h1> */}

      <MyForm onSubmit={submitHandler}>
        <FormContentWrapper>
          <HeaderWrapper>
            <HeaderContentWrapper className="container"></HeaderContentWrapper>
            <ProfilePicWrapper>
              {/* <img src={user.photoURL ? user.photoURL : userprofileimage} alt="Profile" /> */}
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
              {/* <InputFile type="file" onChange={uploadFileHandler} />
              {uploading && <Loader />} */}
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
  /* background-image: url(${heroimage}); */
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
  /* margin: 0 auto 0 auto 0; */

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
  /* border-radius: 50%; */
  /* background: #6CC3D5;
  width: 200px;
  height: 200px;
  cursor: pointer;
  justify-self: center; */

  /* > img {
    border-radius: 50%;
    width: 200px;
    height: 200px;
    border: 4px solid #F5F5F5;
    /* position: relative; *
  } */
`;

// const InputFile = styled.input`
//   position: absolute;
//   z-index: 1000;
//   opacity: 0;
//   cursor: pointer;
//   right: 0;
//   top: 0;
//   height: 100%;
//   font-size: 24px;
//   width: 100%;
// `;
