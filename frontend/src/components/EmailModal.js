import React, { useRef, useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import media from '../utilities/media';
import axios from 'axios';

const Backdrop = ({ showModal, setShowModal, theUser, currentUser }) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const id = theUser._id;

  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false);
      }
    },
    [setShowModal, showModal]
  );

  const handleSubject = (e) => {
    setSubject(e.target.value);
    e.preventDefault();
  };

  const handleMessage = (e) => {
    setMessage(e.target.value);
    e.preventDefault();
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${currentUser.token}`,
      },
    };

    const emailData = { subject, email: theUser.email, message };

    await axios.post(`/api/users/email`, emailData, config);

    setShowModal(false);
  };

  useEffect(() => {
    document.addEventListener('keydown', keyPress);
    return () => document.removeEventListener('keydown', keyPress);
  }, [keyPress]);

  return (
    <Background
      className="animate__animated animate__fadeIn"
      onClick={closeModal}
      ref={modalRef}
    >
      <ModalWrapper
        className="animate__animated animate__fadeInDown"
        showModal={showModal}
      >
        <div>
          <div className="modal-header">
            <h5 className="modal-title">Email to {theUser.email}</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => setShowModal((prev) => !prev)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div className="modal-body">
            <form onSubmit={submitHandler}>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email subject"
                  required
                  value={subject}
                  onChange={handleSubject}
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  type="text"
                  className="form-control"
                  placeholder="message"
                  required
                  value={message}
                  onChange={handleMessage}
                ></textarea>
              </div>
              <input type="text" hidden defaultValue={id} />
              <div className="modal-footer">
                <button type="submit" className="btn btn-success">
                  <i className="fas fa-paper-plane"></i> Send
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  aria-label="Close modal"
                  onClick={() => setShowModal((prev) => !prev)}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </ModalWrapper>
    </Background>
  );
};

const MotivationModal = ({ showModal, setShowModal, theUser, currentUser }) => {
  return (
    <>
      {showModal
        ? createPortal(
            <Backdrop
              showModal={showModal}
              setShowModal={setShowModal}
              theUser={theUser}
              currentUser={currentUser}
            />,
            document.getElementById('modal-root')
          )
        : null}
    </>
  );
};

export default MotivationModal;

const Background = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  z-index: 9999;
  padding: 2rem;
`;

const ModalWrapper = styled.div`
  width: 600px;
  height: auto;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  position: relative;
  z-index: 999;
  border-radius: 10px;
  margin: auto;

  ${media.small`
    width: 90vw;
  `}
`;
