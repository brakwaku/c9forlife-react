import { useContext } from "react";
import { SnackbarContext } from "./ImageCropper/RenderSnackBar";
import styled from "styled-components";

const ActivityUser = ({
  activity,
  dispatch,
  addActivityToBucket,
  removeActivityFromBucket,
  removeActivityFromTodo,
  tryActivity,
  archiveActivity,
  completeActivity,
  type,
  successAddActivityToBucket,
  errorAddActivityToBucket,
}) => {
  const setStateSnackbarContext = useContext(SnackbarContext);

  const addToBucketToast = async () => {
    if (await successAddActivityToBucket) {
      return setStateSnackbarContext(
        true,
        "Activity added to your bucket successfully.",
        "success"
      );
    } else if (await errorAddActivityToBucket) {
      return setStateSnackbarContext(
        true,
        "Sorry, there was an error in adding activity to bucket. Please try again.",
        "warning"
      );
    }

    // if (await errorAddActivityToBucket) {
    //   return setStateSnackbarContext(
    //     true,
    //     "Sorry, there was an error in adding activity to bucket. Please try again.",
    //     "warning"
    //   );
    // }
  }

  const addToBucketHandler = (activityId) => {
    dispatch(addActivityToBucket(activityId));
    // dispatch(addActivityToBucket(`${activityId}12`));
    addToBucketToast();
    
  };

  const removeFromBucketHandler = (activityId) => {
    dispatch(removeActivityFromBucket(activityId));
  };

  const removeFromTodoHandler = (activityId) => {
    dispatch(removeActivityFromTodo(activityId));
  };

  const tryActivityHandler = (activityId) => {
    dispatch(tryActivity(activityId));
  };

  const archiveActivityHandler = (activityId) => {
    dispatch(archiveActivity(activityId));
  };

  const completeActivityHandler = (activityId) => {
    dispatch(completeActivity(activityId));
  };

  return (
    <>
      {type === "normal" ? (
        <MainWrapper className="card border-primary mb-3">
          <HeaderWrapper className="card-header text-white bg-primary">
            {activity.activityId.title}
          </HeaderWrapper>
          <BodyWrapper className="card-body bg-light  rounded-bottom">
            <p className="card-text">{activity.activityId.description}</p>
            <FooterWrapper>
              <>
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => removeFromBucketHandler(activity.activityId._id)}
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Add activity to bucket"
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => tryActivityHandler(activity.activityId._id)}
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Add activity to bucket"
                >
                  <i className="fas fa-plus-circle"></i> Try
                </button>
              </>
            </FooterWrapper>
          </BodyWrapper>
        </MainWrapper>
      ) : type === "toDo" ? (
        <MainWrapper className="card border-info mb-3">
          <HeaderWrapper className="card-header text-white bg-info">
            {activity.toDoId.title}
          </HeaderWrapper>
          <BodyWrapper className="card-body bg-light  rounded-bottom">
            <p className="card-text">{activity.toDoId.description}</p>
            <FooterWrapper>
              <>
                <button
                  className="btn btn-info"
                  type="button"
                  onClick={() => removeFromTodoHandler(activity.toDoId._id)}
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Add activity to bucket"
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
                <button
                  className="btn btn-info"
                  type="button"
                  onClick={() => completeActivityHandler(activity.toDoId._id)}
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Add activity to bucket"
                >
                  <i className="fas fa-check-circle"></i> Done
                </button>
              </>
            </FooterWrapper>
          </BodyWrapper>
        </MainWrapper>
      ) : type === "completed" ? (
        <MainWrapper className="card border-success mb-3">
          <HeaderWrapper className="card-header text-white bg-success">
            {activity.compId.title}
          </HeaderWrapper>
          <BodyWrapper className="card-body bg-light  rounded-bottom">
            <p className="card-text">{activity.compId.description}</p>
            <FooterWrapper>
              <button
                className="btn btn-success"
                type="button"
                onClick={() => archiveActivityHandler(activity.compId._id)}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Add activity to bucket"
              >
                <i className="fas fa-archive"></i> Archive
              </button>
            </FooterWrapper>
          </BodyWrapper>
        </MainWrapper>
      ) : (
        <MainWrapper className="card border-info mb-3">
          <HeaderWrapper className="card-header bg-info text-white">
            {activity.title}
          </HeaderWrapper>
          <BodyWrapper className="card-body">
            <p className="card-text">{activity.description}</p>
            <FooterWrapper>
              <button
                className="btn btn-info"
                type="button"
                onClick={() => addToBucketHandler(activity._id)}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Add activity to bucket"
              >
                <i className="fas fa-calendar-plus"></i> Add to Bucket
              </button>
            </FooterWrapper>
          </BodyWrapper>
        </MainWrapper>
      )}
    </>
  );
};

export default ActivityUser;

const MainWrapper = styled.div``;

const HeaderWrapper = styled.h2`
  font-weight: bold;
  text-align: center;
`;

const BodyWrapper = styled.div``;

const FooterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
