import styled from 'styled-components';
import { useState } from 'react';
import userprofileimage from '../assets/pearl.jpg';
import EmailModal from './EmailModal';
import { Link } from 'react-router-dom';

const User = ({ user, dispatch, deleteUser, currentUser }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure? This action can't be undone")) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <>
      <MainWrapper className={`bg-${user.isAdmin ? 'primary' : 'success'}`}>
        <InnerWrapper>
          <img
            src={user.photoURL !== 'sample' ? user.photoURL : userprofileimage}
            alt="User Profile"
          />
          <NameIconWrapper>
            <div>{user.name}</div>
            <div>
              <button
                className={`btn btn-${user.isAdmin ? 'primary' : 'success'}`}
                type="button"
                onClick={() => deleteHandler(user._id)}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Delete user"
              >
                <i className="fas fa-trash"></i>
              </button>
              <button
                className={`btn btn-${user.isAdmin ? 'primary' : 'success'}`}
                type="button"
                data-target={`#${user._id}`}
                onClick={openModal}
              >
                <i className="fas fa-envelope"></i>
              </button>
              <Link to={`/admin/users/${user._id}/edit`}>
                <button
                  className={`btn btn-${user.isAdmin ? 'primary' : 'success'}`}
                >
                  <i className="fas fa-edit"></i>
                </button>
              </Link>
            </div>
          </NameIconWrapper>
        </InnerWrapper>
      </MainWrapper>
      <EmailModal
        showModal={showModal}
        setShowModal={setShowModal}
        theUser={user}
        currentUser={currentUser}
      />
    </>
  );
};

export default User;

const MainWrapper = styled.div`
  padding: 0.1rem;
  border-radius: 10px;
  margin-bottom: 0.7rem;
`;

const InnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;
  color: white;

  > img {
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }

  > div {
    flex: 1;
  }
`;

const NameIconWrapper = styled.div`
  > div:nth-child(2) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
  }
`;
