import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { listActivities } from '../actions/activityActions';
import { createActivitySuggestion } from '../actions/activitySuggestionActions';
import { addActivityToBucket } from '../actions/userActions';
import { useNavigate } from 'react-router-dom';
import ActivityUser from '../components/ActivityUser';
// import { SnackbarContext } from "../components/ImageCropper/RenderSnackBar";
import media from '../utilities/media';
import backImage from '../assets/loginii.jpg';
import { useScrollToTop } from '../utilities/scrollToTop';

const ActivitiesScreen = () => {
  document.title = "C9ForLife | Activities";
  useScrollToTop();
  const [activitySuggestionTitle, setActivitySuggestionTitle] = useState('');
  const [activitySuggestionDescription, setActivitySuggestionDescription] =
    useState('');

  const handleActivityTitle = (e) => {
    setActivitySuggestionTitle(e.target.value);
    e.preventDefault();
  };

  const handleActivityDescription = (e) => {
    setActivitySuggestionDescription(e.target.value);
    e.preventDefault();
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const activityList = useSelector((state) => state.activityList);
  const {
    loading: loadingActivity,
    error: errorActivity,
    activities,
  } = activityList;

  const userAddActivityToBucket = useSelector(
    (state) => state.userAddActivityToBucket
  );
  const {
    success: successAddActivityToBucket,
    error: errorAddActivityToBucket,
  } = userAddActivityToBucket;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const activitySuggestionCreate = useSelector(
    (state) => state.activitySuggestionCreate
  );
  const {
    loading: loadingActivitySuggestionCreate,
    error: errorActivitySuggestionCreate,
    success: successActivitySuggestionCreate,
  } = activitySuggestionCreate;

  // const setStateSnackbarContext = useContext(SnackbarContext);

  const createSuggestionHandler = async (e) => {
    e.preventDefault();
    dispatch(
      createActivitySuggestion(
        activitySuggestionTitle,
        activitySuggestionDescription
      )
    );
  };

  useEffect(() => {
    if (userInfo === null || !userInfo) {
      navigate('/login');
    } else {
      dispatch(listActivities());
    }

    if (successActivitySuggestionCreate) {
      setActivitySuggestionTitle('');
      setActivitySuggestionDescription('');
      document.getElementById('add-suggestion-btn').click();
    }

    // eslint-disable-next-line
  }, [dispatch, userInfo, navigate, successActivitySuggestionCreate]);

  return (
    <MainWrapper>
      {userInfo && !userInfo.isAdmin ? <SuggestActivityButton
        className="btn btn-success"
        data-toggle="modal"
        data-target="#myModal"
      >
        Suggest Activity
      </SuggestActivityButton> : ''}
      
      <ContentWrapper className="container">
        {loadingActivitySuggestionCreate && <Loader />}
        {errorActivitySuggestionCreate && (
          <Message variant="danger">{errorActivitySuggestionCreate}</Message>
        )}
        {loadingActivity ? (
          <Loader />
        ) : errorActivity ? (
          <Message variant="danger">{errorActivity}</Message>
        ) : (
          <>
            {activities.map((act) => (
              <ActivityUser
                key={act._id}
                activity={act}
                addActivityToBucket={addActivityToBucket}
                dispatch={dispatch}
                successAddActivityToBucket={successAddActivityToBucket}
                errorAddActivityToBucket={errorAddActivityToBucket}
              />
            ))}
          </>
        )}
      </ContentWrapper>

      <div
        className="modal fade"
        id="myModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">What is your idea?</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={createSuggestionHandler}>
                <div className="form-group">
                  <label htmlFor="title">Name of activity</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Activity name"
                    required
                    value={activitySuggestionTitle}
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
                    value={activitySuggestionDescription}
                    onChange={handleActivityDescription}
                  ></textarea>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-success">
                    Submit
                  </button>
                  <button
                    id="add-suggestion-btn"
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </MainWrapper>
  );
};

export default ActivitiesScreen;

const MainWrapper = styled.div`
  min-height: 95vh;
  background-image: url(${backImage});
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
`;

const ContentWrapper = styled.div`
  padding: 2rem;
  min-height: 90vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1rem;

  ${media.small`
    display: flex;
    flex-direction: column;
  `}

  > div:nth-child(even) {
    /* background: #F0F1F2; */
    background: #f0f1f2d9;
    color: #4b4b4b;
  }

  > div:nth-child(odd) {
    /* background: #F0F1F2; */
    background: #ffffffd9;
    color: #4b4b4b;
  }
`;

const SuggestActivityButton = styled.div`
  margin-top: 20vh;
  right: -65px;
  position: fixed;
  transform: rotate(-90deg);
  -webkit-transform: rotate(-90deg);
  -moz-transform: rotate(-90deg);
  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3); //For IE support
  z-index: 99;
`;
