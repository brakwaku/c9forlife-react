import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  listActivitySuggestions,
  deleteActivitySuggestion,
  updateActivitySuggestion,
  approveActivitySuggestion,
} from '../actions/activitySuggestionActions';
import { useNavigate } from 'react-router-dom';
import ActivitySuggestion from '../components/ActivitySuggestion';
import { useScrollToTop } from '../utilities/scrollToTop';

const ActivitySuggestionsScreen = () => {
  document.title = "C9ForLife | Activity Suggestion";
  useScrollToTop();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const activitySuggestionList = useSelector(
    (state) => state.activitySuggestionList
  );
  const { loading, error, activitySuggestions } = activitySuggestionList;

  const activitySuggestionUpdate = useSelector(
    (state) => state.activitySuggestionUpdate
  );
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = activitySuggestionUpdate;

  const activitySuggestionApprove = useSelector(
    (state) => state.activitySuggestionApprove
  );
  const {
    loading: loadingApprove,
    error: errorApprove,
    success: successApprove,
  } = activitySuggestionApprove;

  const activitySuggestionDelete = useSelector(
    (state) => state.activitySuggestionDelete
  );
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = activitySuggestionDelete;

  useEffect(() => {
    if ((userInfo && !userInfo.isAdmin) || userInfo === null || !userInfo) {
      navigate('/login');
    }

    if (successDelete || successUpdate || successApprove) {
      dispatch(listActivitySuggestions());
        // setActivitySuggestionTitle('');
        // setActivitySuggestionDescription('');
    } else {
      dispatch(listActivitySuggestions());
    }
  }, [dispatch, userInfo, navigate, successDelete, successUpdate, successApprove]);

  return (
    <MainContainer className="container">
      <ContentWrapper className="animate__animated animate__fadeInDown">
        <h3>
          <i className="fas fa-users"></i> SUGGESTIONS
        </h3>
        <hr />
        <div>
          {(loadingDelete || loadingUpdate || loadingApprove) && <Loader />}
          {errorDelete && <Message variant="danger">{errorDelete}</Message>}
          {errorApprove && <Message variant="danger">{errorApprove}</Message>}
          {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              {activitySuggestions.length > 0 ? (
                activitySuggestions.map((suggestion) => (
                    <ActivitySuggestion
                    key={suggestion._id}
                    activitySuggestion={suggestion}
                    deleteActivitySuggestion={deleteActivitySuggestion}
                    updateActivitySuggestion={updateActivitySuggestion}
                    approveActivitySuggestion={approveActivitySuggestion}
                    dispatch={dispatch}
                  />
                ))
              ) : (
                <center>No data to display</center>
              )}
            </>
          )}
        </div>
      </ContentWrapper>
    </MainContainer>
  );
};

export default ActivitySuggestionsScreen;

const MainContainer = styled.div`
  position: relative;
  margin-top: 2rem;
  margin-bottom: 2.5rem;
`;

const ContentWrapper = styled.div`
  min-height: 80vh;
  border: solid 2px #2ca6ba;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  background-color: rgb(247, 247, 247);
  max-height: 90vh;
  padding: 0.4rem;

  > h3 {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  > h3 > i {
    margin-right: 0.5rem;
  }

  > div:nth-child(3) {
    max-height: 78vh;
    overflow: scroll;
    border-radius: 10px;
  }
`;
