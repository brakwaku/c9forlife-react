import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { Tabs, Tab } from 'react-bootstrap';
import media from '../utilities/media';
import { listUsers, deleteUser } from '../actions/userActions';
import {
  listActivities,
  deleteActivity,
  createActivity,
  updateActivity,
} from '../actions/activityActions';
import { listActivitySuggestions } from '../actions/activitySuggestionActions';
import {
  listMotivations,
  deleteMotivation,
  createMotivation,
  updateMotivation,
} from '../actions/motivationActions';
// import Skeleton from '@material-ui/lab/Skeleton';
import { Link, useNavigate } from 'react-router-dom';
import User from '../components/User';
import Activity from '../components/Activity';
import Motivation from '../components/Motivation';
import SearchBox from '../components/SearchBox';
import { useScrollToTop } from '../utilities/scrollToTop';

const AdminScreen = () => {
  document.title = 'C9ForLife | Admin';
  useScrollToTop();
  const [activityTitle, setActivityTitle] = useState('');
  const [activityDescription, setActivityDescription] = useState('');
  const [motivationAuthor, setMotivationAuthor] = useState('');
  const [motivationQuote, setMotivationQuote] = useState('');
  const [searchString, setSearchString] = useState('');

  const handleActivityTitle = (e) => {
    setActivityTitle(e.target.value);
    e.preventDefault();
  };

  const handleActivityDescription = (e) => {
    setActivityDescription(e.target.value);
    e.preventDefault();
  };

  const handleMotivationAuthor = (e) => {
    setMotivationAuthor(e.target.value);
    e.preventDefault();
  };

  const handleMotivationQuote = (e) => {
    setMotivationQuote(e.target.value);
    e.preventDefault();
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;

  const activityList = useSelector((state) => state.activityList);
  const {
    loading: loadingActivity,
    error: errorActivity,
    activities,
  } = activityList;

  const activityCreate = useSelector((state) => state.activityCreate);
  const {
    loading: loadingActivityCreate,
    error: errorActivityCreate,
    success: successActivityCreate,
    activity: createdActivity,
  } = activityCreate;

  const activityUpdate = useSelector((state) => state.activityUpdate);
  const {
    loading: loadingActivityUpdate,
    error: errorActivityUpdate,
    success: successActivityUpdate,
  } = activityUpdate;

  const activityDelete = useSelector((state) => state.activityDelete);
  const {
    loading: loadingActivityDelete,
    error: errorActivityDelete,
    success: successActivityDelete,
  } = activityDelete;

  const motivationList = useSelector((state) => state.motivationList);
  const {
    loading: loadingMotivation,
    error: errorMotivation,
    motivations,
  } = motivationList;

  const motivationCreate = useSelector((state) => state.motivationCreate);
  const {
    loading: loadingMotivationCreate,
    error: errorMotivationCreate,
    success: successMotivationCreate,
    motivation: createdMotivation,
  } = motivationCreate;

  const motivationUpdate = useSelector((state) => state.motivationUpdate);
  const {
    loading: loadingMotivationUpdate,
    error: errorMotivationUpdate,
    success: successMotivationUpdate,
  } = motivationUpdate;

  const motivationDelete = useSelector((state) => state.motivationDelete);
  const {
    loading: loadingMotivationDelete,
    error: errorMotivationDelete,
    success: successMotivationDelete,
  } = motivationDelete;

  const activitySuggestionList = useSelector(
    (state) => state.activitySuggestionList
  );
  const { activitySuggestions } = activitySuggestionList;

  const createActivityHandler = async (e) => {
    e.preventDefault();
    dispatch(createActivity(activityTitle, activityDescription));
  };

  const createMotivationHandler = async (e) => {
    e.preventDefault();
    dispatch(createMotivation(motivationAuthor, motivationQuote));
  };

  useEffect(() => {
    if (userInfo === null || !userInfo) {
      navigate('/login');
    } else if (!userInfo.isAdmin) {
      navigate(-1);
    }

    if (
      successActivityCreate ||
      successActivityDelete ||
      successActivityUpdate ||
      successMotivationCreate ||
      successMotivationUpdate ||
      successMotivationDelete
    ) {
      dispatch(listActivities());
      dispatch(listActivitySuggestions());
      dispatch(listMotivations());
      setActivityTitle('');
      setActivityDescription('');
      setMotivationAuthor('');
      setMotivationQuote('');
      document.getElementById('add-activity-btn').click();
      document.getElementById('add-motivation-btn').click();
    } else {
      dispatch(listActivities());
      dispatch(listActivitySuggestions());
      dispatch(listMotivations());
      dispatch(listUsers());
    }
  }, [
    dispatch,
    userInfo,
    navigate,
    successDelete,
    successActivityCreate,
    createdActivity,
    successActivityDelete,
    successActivityUpdate,
    successMotivationCreate,
    createdMotivation,
    successMotivationUpdate,
    successMotivationDelete,
  ]);

  return (
    <MainContainer className="container mb-5">
      <>
        <Tabs defaultActiveKey="users" className="mb-3">
          <Tab eventKey="users" title="USERS">
            <UsersWrapper className="animate__animated animate__fadeInLeft">
              <h3>
                <i className="fas fa-users"></i> USERS
              </h3>
              <hr />
              <div>
                {loadingDelete && <Loader />}
                {errorDelete && (
                  <Message variant="danger">{errorDelete}</Message>
                )}
                {loading ? (
                  <Loader />
                ) : // <Skeleton variant="rect" animation="wave" height={500} />
                error ? (
                  <Message variant="danger">{error}</Message>
                ) : (
                  <>
                    <SearchBox setSearchString={setSearchString} />
                    {users.length > 0 ? (
                      users
                        .filter((user) => {
                          if (searchString === '') {
                            return user;
                          } else if (
                            user.name
                              .toLowerCase()
                              .includes(searchString.toLowerCase())
                          ) {
                            return user;
                          }
                          return false;
                        })
                        .map((user) => (
                          // <User style={{display: user.email === userInfo.email ? 'none' : 'block'}}
                          <User
                            key={user._id}
                            user={user}
                            deleteUser={deleteUser}
                            dispatch={dispatch}
                            currentUser={userInfo}
                          />
                        ))
                    ) : (
                      <center>No data to display</center>
                    )}
                  </>
                )}
              </div>
            </UsersWrapper>
          </Tab>

          <Tab eventKey="activities" title="ACTIVITIES">
            <ActivitiesWrapper className="animate__animated animate__fadeInRight">
              <ActivitiesHeaderWrapper>
                <div>
                  <i className="fas fa-tasks"></i>ACTIVITIES
                  <i
                    className="fas fa-plus"
                    data-toggle="modal"
                    data-target="#myModal"
                  ></i>
                  &nbsp;<span className="vr"></span>
                </div>

                <Link to="/suggestions">
                  IDEAS{' '}
                  <span
                    className={`badge bg-${
                      activitySuggestions.length < 1 ? 'success' : 'danger'
                    } rounded-pill`}
                  >
                    {activitySuggestions.length}
                  </span>
                </Link>
              </ActivitiesHeaderWrapper>
              <hr />
              <div>
                {loadingActivityDelete && <Loader />}
                {errorActivityDelete && (
                  <Message variant="danger">{errorActivityDelete}</Message>
                )}
                {loadingActivityCreate && <Loader />}
                {errorActivityCreate && (
                  <Message variant="danger">{errorActivityCreate}</Message>
                )}
                {loadingActivityUpdate && <Loader />}
                {errorActivityUpdate && (
                  <Message variant="danger">{errorActivityUpdate}</Message>
                )}
                {loadingActivity ? (
                  <Loader />
                ) : errorActivity ? (
                  <Message variant="danger">{errorActivity}</Message>
                ) : (
                  <>
                    {activities.length > 0 ? (
                      activities.map((act) => (
                        <Activity
                          key={act._id}
                          activity={act}
                          deleteActivity={deleteActivity}
                          updateActivity={updateActivity}
                          dispatch={dispatch}
                        />
                      ))
                    ) : (
                      <center>No data to display</center>
                    )}
                  </>
                )}
              </div>
            </ActivitiesWrapper>
          </Tab>

          <Tab eventKey="motivation" title="MOTIVATION">
            <MotivationWrapper className="animate__animated animate__fadeInDown">
              <MotivationHeaderWrapper>
                <i className="fas fa-running"></i>MOTIVATION
                <i
                  className="fas fa-plus"
                  data-toggle="modal"
                  data-target="#myModal2"
                ></i>
              </MotivationHeaderWrapper>
              <hr />
              <div>
                {loadingMotivationDelete && <Loader />}
                {errorMotivationDelete && (
                  <Message variant="danger">{errorMotivationDelete}</Message>
                )}
                {loadingMotivationCreate && <Loader />}
                {errorMotivationCreate && (
                  <Message variant="danger">{errorMotivationCreate}</Message>
                )}
                {loadingMotivationUpdate && <Loader />}
                {errorMotivationUpdate && (
                  <Message variant="danger">{errorMotivationUpdate}</Message>
                )}
                {loadingMotivation ? (
                  <Loader />
                ) : errorMotivation ? (
                  <Message variant="danger">{errorMotivation}</Message>
                ) : (
                  <>
                    {motivations.length > 0 ? (
                      motivations.map((motivation) => (
                        <Motivation
                          key={motivation._id}
                          motivation={motivation}
                          deleteMotivation={deleteMotivation}
                          updateMotivation={updateMotivation}
                          dispatch={dispatch}
                          type="admin"
                        />
                      ))
                    ) : (
                      <center>No data to display</center>
                    )}
                  </>
                )}
              </div>
            </MotivationWrapper>
          </Tab>
        </Tabs>

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
                <h5 className="modal-title">Add New Activity</h5>
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
                <form onSubmit={createActivityHandler}>
                  <div className="form-group">
                    <label htmlFor="title">Name of activity</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Activity name"
                      required
                      value={activityTitle}
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
                      value={activityDescription}
                      onChange={handleActivityDescription}
                    ></textarea>
                  </div>
                  <div className="modal-footer">
                    <button type="submit" className="btn btn-success">
                      Add
                    </button>
                    <button
                      id="add-activity-btn"
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Create Motivation Modal */}
        <div
          className="modal fade"
          id="myModal2"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="myModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Motivation</h5>
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
                <form onSubmit={createMotivationHandler}>
                  <div className="form-group">
                    <label htmlFor="author">Author</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Quote by"
                      required
                      value={motivationAuthor}
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
                      value={motivationQuote}
                      onChange={handleMotivationQuote}
                    ></textarea>
                  </div>
                  <div className="modal-footer">
                    <button type="submit" className="btn btn-success">
                      Add
                    </button>
                    <button
                      id="add-motivation-btn"
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    </MainContainer>
  );
};

export default AdminScreen;

const MainContainer = styled.div`
  position: relative;
`;

const UsersWrapper = styled.div`
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

const ActivitiesWrapper = styled.div`
  min-height: 80vh;
  border: solid 2px #2ca6ba;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  background-color: rgb(247, 247, 247);
  max-height: 90vh;
  padding: 0.4rem;

  > div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    overflow: scroll;
    max-height: 77vh;
    border-radius: 10px;

    ${media.small`
    display: flex;
    flex-direction: column;
  `}
  }
`;

const MotivationWrapper = styled.div`
  min-height: 80vh;
  border: solid 2px #2ca6ba;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  background-color: rgb(247, 247, 247);
  max-height: 90vh;
  padding: 0.4rem;

  > div {
    overflow: scroll;
    max-height: 77vh;
    border-radius: 10px;
  }
`;

const MotivationHeaderWrapper = styled.h3`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;

  > i:nth-child(2) {
    color: lightgreen;
    margin-left: 2rem;

    :hover {
      color: green;
      cursor: pointer;
    }
  }

  > i:nth-child(1) {
    margin-right: 0.5rem;
  }
`;

const ActivitiesHeaderWrapper = styled.h3`
  display: flex;
  justify-content: center;
  align-items: center;

  > div {
    > i:nth-child(2) {
      color: lightgreen;
      margin-left: 2rem;
      margin-right: 3.5rem;

      :hover {
        color: green;
        cursor: pointer;
      }
    }

    > span {
      ${media.small`
    display: none;
  `}
    }
  }

  > a {
    margin-left: 3.5rem;
    text-decoration: none;
    color: #5a5a5a;

    :hover {
      color: green;
    }
  }
`;
