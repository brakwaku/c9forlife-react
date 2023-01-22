import styled from "styled-components";
import { useState } from "react";
import MotivationModal from "./MotivationModal";

const Motivation = ({
  motivation,
  dispatch,
  deleteMotivation,
  updateMotivation,
  type,
}) => {
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure? This action can't be undone")) {
      dispatch(deleteMotivation(id));
    }
  };

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <>
      <MainWrapper className={`card border-primary mb-3 ${type !== 'admin' && 'bg-success text-white shadow border-light'}`}>
        <BodyWrapper className="card-body">
          <p className="card-text">{`"${motivation.quote}"`}</p>
          <p>~ {motivation.author}</p>
          {type === "admin" ? (
            <FooterWrapper>
              <button
                className="btn btn-success"
                type="button"
                onClick={() => deleteHandler(motivation._id)}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Delete motivation"
              >
                <i className="fas fa-trash-alt"></i> Delete
              </button>
              <button
                className="btn btn-success"
                type="button"
                data-target={"#" + motivation._id}
                onClick={openModal}
              >
                <i className="fas fa-edit"></i> Edit
                {/* <i className="fas fa-pencil-alt"></i> Edit */}
              </button>
            </FooterWrapper>
          ) : (
            ""
          )}
        </BodyWrapper>
      </MainWrapper>
      <MotivationModal
        showModal={showModal}
        setShowModal={setShowModal}
        theMotivation={motivation}
        dispatch={dispatch}
        updateMotivation={updateMotivation}
      />
    </>
  );
};

export default Motivation;

const MainWrapper = styled.div``;

const BodyWrapper = styled.div``;

const FooterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
