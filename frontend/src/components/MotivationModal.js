import React, { useRef, useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import media from "../utilities/media";

const MotivationModal = ({
  showModal,
  setShowModal,
  theMotivation,
  updateMotivation,
  dispatch,
}) => {
  const [author, setAuthor] = useState(theMotivation.author);
  const [quote, setQuote] = useState(theMotivation.quote);
  const id = theMotivation._id;

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

  const handleMotivationAuthor = (e) => {
    setAuthor(e.target.value);
    e.preventDefault();
  };

  const handleMotivationQuote = (e) => {
    setQuote(e.target.value);
    e.preventDefault();
  };

  const editHandler = async (e) => {
    e.preventDefault();
    dispatch(updateMotivation({ id, author, quote }));
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
                <h5 className="modal-title">Edit Motivation</h5>
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
                    <label htmlFor="author">Author</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Author of quote"
                      required
                      value={author}
                      onChange={handleMotivationAuthor}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="quote">Quote</label>
                    <textarea
                      type="text"
                      className="form-control"
                      placeholder="Quote"
                      required
                      value={quote}
                      onChange={handleMotivationQuote}
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

export default MotivationModal;

const Background = styled.div`
  width: 100%;
  height: 100%;
  /* top: -6.7vh;
  left: -6.3vw; */
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  /* justify-content: center;
  align-items: center; */
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
