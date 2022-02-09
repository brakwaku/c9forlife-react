import styled from "styled-components";
import { useState } from "react";
import Modal from "./Modal";

const ActivitySuggestion = ({ activitySuggestion, dispatch, deleteActivitySuggestion, updateActivitySuggestion, approveActivitySuggestion }) => {
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure? This action can't be undone")) {
      dispatch(deleteActivitySuggestion(id));
    }
  };

  const approveHandler = (id) => {
      dispatch(approveActivitySuggestion(id));
  };


  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(prev => !prev);
  };

  return (
    <>
      <MainWrapper className="card border-primary mb-3">
        <HeaderWrapper className="card-header">{activitySuggestion.title}</HeaderWrapper>
        <BodyWrapper className="card-body">
          <p className="card-text">{activitySuggestion.description}</p>
          <FooterWrapper>
            <button
              className="btn btn-success"
              type="button"
              // data-bs-toggle="modal"
              data-target={`#${activitySuggestion._id}`}
              onClick={() => approveHandler(activitySuggestion._id)}
            >
              <i className="fas fa-check"></i> Approve
            </button>
            <button
              className="btn btn-success"
              type="button"
              // data-bs-toggle="modal"
              data-target={`#${activitySuggestion._id}`}
              onClick={openModal}
            >
              <i className="fas fa-pencil-alt"></i> Edit
            </button>
            <button
              className="btn btn-success"
              type="button"
              onClick={() => deleteHandler(activitySuggestion._id)}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Delete Suggestion"
            >
              <i className="fas fa-trash-alt"></i> Delete
            </button>
          </FooterWrapper>
        </BodyWrapper>
      </MainWrapper>
      <Modal showModal={showModal} setShowModal={setShowModal} theActivity={activitySuggestion} dispatch={dispatch} updateActivity={updateActivitySuggestion} />
    </>
  );
};

export default ActivitySuggestion;

const MainWrapper = styled.div``;

const HeaderWrapper = styled.h6`
  font-weight: bold;
  text-align: center;
`;

const BodyWrapper = styled.div``;

const FooterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;