import React, { useRef, useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import media from "../utilities/media";

const Modal = ({
  showModal,
  setShowModal,
  theActivity,
  updateActivity,
  dispatch,
}) => {
  const [title, setTitle] = useState(theActivity.title);
  const [description, setDescription] = useState(theActivity.description);
  const id = theActivity._id;

  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showModal) {
        setShowModal(false);
      }
    },
    [setShowModal, showModal]
  );

  const handleActivityTitle = (e) => {
    setTitle(e.target.value);
    e.preventDefault();
  };

  const handleActivityDescription = (e) => {
    setDescription(e.target.value);
    e.preventDefault();
  };

  const editHandler = async (e) => {
    e.preventDefault();
    dispatch(updateActivity({ id, title, description }));
  };

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  return (
    <>
      {showModal ? (
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
                <h5 className="modal-title">Edit Activity</h5>
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
                <form onSubmit={editHandler}>
                  <div className="form-group">
                    <label htmlFor="title">Name of activity</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Activity name"
                      required
                      value={title}
                      onChange={handleActivityTitle}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                      type="text"
                      className="form-control"
                      placeholder="Description"
                      required
                      value={description}
                      onChange={handleActivityDescription}
                    ></textarea>
                  </div>
                  <input type="text" hidden defaultValue={id} />
                  <div className="modal-footer">
                    <button type="submit" className="btn btn-success">
                      Update
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
      ) : null}
    </>
  );
};

export default Modal;

const Background = styled.div`
  /* width: 100vw; */
  height: 100vh;
  /* top: -6.7vh;
  left: -6.3vw; */
  top: 0vh;
  left: 0vw;
  right: 0vw;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  justify-content: center;
  align-items: center;
  z-index: 99999;
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
