import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import InputField from "../components/InputField";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { validators } from "../utilities/Validator";
import { register } from "../actions/userActions";
import media from "../utilities/media";

const SignupScreen = () => {
  document.title = "C9ForLife | Register";
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [magicWord, setMagicWord] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const handleFirstName = (firstName) => setFirstName(firstName);
  const handleLastName = (lastName) => setLastName(lastName);
  const handleEmail = (email) => setEmail(email);
  const handlePassword = (password) => setPassword(password);
  const handleConfirmPassword = (confirmPassword) =>
    setConfirmPassword(confirmPassword);
  const handleMagicWord = (magicWord) => setMagicWord(magicWord);

  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.state ? location.state : "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(register(firstName, lastName, email, password, magicWord));
    }
  };

  return (
    <MainWrapper>
      <CardWrapper className="card">
        <div className="card-header">Secure Signup</div>
        <div className="card-body">
          {message && <Message variant="danger">{message}</Message>}
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          <form onSubmit={submitHandler}>
            <InputField
              value={firstName}
              placeholder="First Name"
              type="text"
              validators={[
                {
                  check: validators.required,
                  message: "This field is required",
                },
              ]}
              onChange={handleFirstName}
              required
              fontAwesomeIcon="fas fa-user-plus"
            />
            <InputField
              value={lastName}
              placeholder="Last Name"
              type="text"
              validators={[
                {
                  check: validators.required,
                  message: "This field is required",
                },
              ]}
              onChange={handleLastName}
              required
              fontAwesomeIcon="fas fa-user-tie"
            />
            <InputField
              value={email}
              placeholder="Email Address"
              type="email"
              validators={[
                {
                  check: validators.email,
                  message: "Please enter a valid email address",
                },
                {
                  check: validators.required,
                  message: "This field is required",
                },
              ]}
              onChange={handleEmail}
              required
              fontAwesomeIcon="fas fa-envelope"
            />
            <InputField
              value={password}
              placeholder="Password"
              type="password"
              validators={[
                {
                  check: validators.required,
                  message: "This field is required",
                },
              ]}
              onChange={handlePassword}
              required
              fontAwesomeIcon="fas fa-key"
            />
            <InputField
              value={confirmPassword}
              placeholder="Confirm Password"
              type="password"
              validators={[
                {
                  check: validators.required,
                  message: "This field is required",
                },
              ]}
              onChange={handleConfirmPassword}
              required
              fontAwesomeIcon="fas fa-key"
            />
            <InputField
              value={magicWord}
              placeholder="Magic Word"
              type="text"
              onChange={handleMagicWord}
              fontAwesomeIcon="fas fa-lock"
            />
            <div className="text-right">
              <ButtonWrapper type="submit" className="btn btn-info">
                Submit
              </ButtonWrapper>
            </div>
          </form>
          <div>
            Have an Account?{" "}
            <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
              Login
            </Link>
          </div>
        </div>
      </CardWrapper>
    </MainWrapper>
  );
};

export default SignupScreen;

const MainWrapper = styled.div`
  min-height: 80vh;
`;

const CardWrapper = styled.div`
  width: 30%;
  background-color: white;
  border-radius: 10px;
  margin: 3rem auto 3rem auto;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.02), 0 3px 10px 0 rgba(0, 0, 0, 0.02);

  ${media.medium`
    width: 90%;
    margin-top: 3rem;
  `}
`;

const ButtonWrapper = styled.button`
  font-weight: bold;
`;
