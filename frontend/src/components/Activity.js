import styled from "styled-components";
import { useState } from "react";
import Modal from "./Modal";

const Activity = ({ activity, dispatch, deleteActivity, updateActivity }) => {
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure? This action can't be undone")) {
      dispatch(deleteActivity(id));
    }
  };


  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(prev => !prev);
  };

  return (
    <>
      <MainWrapper className="card border-primary mb-3">
        <HeaderWrapper className="card-header">{activity.title}</HeaderWrapper>
        <BodyWrapper className="card-body">
          <p className="card-text">{activity.description}</p>
          <FooterWrapper>
            <button
              className="btn btn-success"
              type="button"
              onClick={() => deleteHandler(activity._id)}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Delete activity"
            >
              <i className="fas fa-trash-alt"></i> Delete
            </button>
            <button
              className="btn btn-success"
              type="button"
              data-target={'#' + activity._id}
              onClick={openModal}
            >
              <i className="fas fa-edit"></i> Edit
            </button>
          </FooterWrapper>
        </BodyWrapper>
      </MainWrapper>
      <Modal showModal={showModal} setShowModal={setShowModal} theActivity={activity} dispatch={dispatch} updateActivity={updateActivity} />
    </>
  );
};

export default Activity;

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
