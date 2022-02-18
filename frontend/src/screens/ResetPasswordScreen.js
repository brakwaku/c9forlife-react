import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import styled from 'styled-components';
import InputField from '../components/InputField';
import { validators } from '../utilities/Validator';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import media from '../utilities/media';
import { updatePassword } from '../actions/userActions';
import { useScrollToTop } from '../utilities/scrollToTop';

const ResetPasswordScreen = () => {
  document.title = 'C9ForLife | Reset Password';
  useScrollToTop();
  const { id } = useParams();
  const { token } = useParams();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userUpdatePassword = useSelector((state) => state.userUpdatePassword);
  const { loading, error, success, user } = userUpdatePassword;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handlePassword = (password) => setPassword(password);
  const handleConfirmPassword = (confirmPassword) =>
    setConfirmPassword(confirmPassword);

  useEffect(() => {
    if (success) {
      navigate(`/login`);
    }

    if (userInfo) {
      navigate('/');
    }
  }, [dispatch, navigate, user, success, error, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(updatePassword({ id: id, password }, token));
    }
  };

  return (
    <MainWrapper>
      {!userInfo && (
        <CardWrapper className="card">
          <div className="card-header">Reset Password</div>
          <div className="card-body">
            {message && <Message variant="danger">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            {success && <Message variant="success">Password updated</Message>}
            {loading && <Loader />}
            <form onSubmit={submitHandler}>
              <InputField
                value={password}
                placeholder="Password"
                type="password"
                validators={[
                  {
                    check: validators.required,
                    message: 'This field is required',
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
                    message: 'This field is required',
                  },
                ]}
                onChange={handleConfirmPassword}
                required
                fontAwesomeIcon="fas fa-key"
              />

              <div className="text-right">
                <button type="submit" className="btn btn-info my-3">
                  Reset
                </button>
              </div>
            </form>
          </div>
        </CardWrapper>
      )}
    </MainWrapper>
  );
};

export default ResetPasswordScreen;

const MainWrapper = styled.div`
  min-height: 80vh;
`;

const CardWrapper = styled.div`
  width: 30%;
  background-color: white;
  border-radius: 10px;
  margin: 6rem auto 3rem auto;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.02), 0 3px 10px 0 rgba(0, 0, 0, 0.02);

  ${media.medium`
    width: 90%;
    margin-top: 3rem;
  `}
`;
