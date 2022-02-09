import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserDetails,
  removeActivityFromBucket,
  addActivityToTodo,
  removeActivityFromTodo,
  addActivityToCompleted,
  addActivityToArchive,
} from "../actions/userActions";
import { useNavigate } from "react-router-dom";
import { Tabs, Tab } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import styled from "styled-components";
import Hero from "../components/Hero";
import MyCards from "../components/MyCards";
import heroImage from "../assets/lo.jpg";

const DashboardScreen = () => {
  document.title = "C9ForLife | Dashboard";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userRemoveActivityFromBucket = useSelector(
    (state) => state.userRemoveActivityFromBucket
  );
  const {
    loading: loadingRemoveActivityFromBucket,
    success: successRemoveActivityFromBucket,
    error: errorRemoveActivityFromBucket,
  } = userRemoveActivityFromBucket;

  const userAddActivityToTodo = useSelector(
    (state) => state.userAddActivityToTodo
  );
  const {
    loading: loadingAddActivityToTodo,
    success: successAddActivityToTodo,
    error: errorAddActivityToTodo,
  } = userAddActivityToTodo;

  const userRemoveActivityFromTodo = useSelector(
    (state) => state.userRemoveActivityFromTodo
  );
  const {
    loading: loadingRemoveActivityFromTodo,
    success: successRemoveActivityFromTodo,
    error: errorRemoveActivityFromTodo,
  } = userRemoveActivityFromTodo;

  const userAddActivityToCompleted = useSelector(
    (state) => state.userAddActivityToCompleted
  );
  const {
    loading: loadingAddActivityToCompleted,
    success: successAddActivityToCompleted,
    error: errorAddActivityToCompleted,
  } = userAddActivityToCompleted;

  const userAddActivityToArchive = useSelector(
    (state) => state.userAddActivityToArchive
  );
  const {
    loading: loadingAddActivityToArchive,
    success: successAddActivityToArchive,
    error: errorAddActivityToArchive,
  } = userAddActivityToArchive;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const {
    loading: loadingGetUserDetails,
    error: errorGetUserDetails,
    user,
  } = userDetails;

  useEffect(() => {
    if (userInfo === null || !userInfo) {
      navigate("/login");
    } else {
        dispatch(getUserDetails(userInfo._id));
    }

    if(successRemoveActivityFromBucket ||
      successAddActivityToTodo ||
      successRemoveActivityFromTodo ||
      successAddActivityToCompleted ||
      successAddActivityToArchive) {
        dispatch(getUserDetails(userInfo._id));
      }
  }, [
    dispatch,
    userInfo,
    navigate,
    successRemoveActivityFromBucket,
    successAddActivityToTodo,
    successRemoveActivityFromTodo,
    successAddActivityToCompleted,
    successAddActivityToArchive,
  ]);

  return (
    <>
      <MainWrapper>
        <Hero
          image={heroImage}
          head="DASHBOARD"
          quote="It’s hard to beat a person who never gives up."
          quoteBy="– Babe Ruth"
          rating={true}
          comps={user && user.completed}
          archs={user && user.archive}
        />
      </MainWrapper>
      <MainGridContainer className="container">
        {loadingRemoveActivityFromBucket ||
        loadingAddActivityToTodo ||
        loadingRemoveActivityFromTodo ||
        loadingAddActivityToCompleted ||
        loadingAddActivityToArchive ? (
          <Loader />
        ) : (
          ""
        )}
        {errorRemoveActivityFromBucket ||
        errorAddActivityToTodo ||
        errorRemoveActivityFromTodo ||
        errorAddActivityToCompleted ||
        errorAddActivityToArchive ? (
          <Message variant="danger">
            {errorRemoveActivityFromBucket ||
              errorAddActivityToTodo ||
              errorRemoveActivityFromTodo ||
              errorAddActivityToCompleted ||
              errorAddActivityToArchive}
          </Message>
        ) : (
          ""
        )}

        {loadingGetUserDetails ? (
          <Loader />
        ) : errorGetUserDetails ? (
          <Message variant="danger">{errorGetUserDetails}</Message>
        ) : (
          <>
            <Tabs defaultActiveKey="bucket" className="mb-3">
              <Tab eventKey="bucket" title="BUCKET">
                {loadingGetUserDetails ? (
                  <Loader />
                ) : errorGetUserDetails ? (
                  <Message variant="danger">{errorGetUserDetails}</Message>
                ) : (
                  <>
                    <MyCards
                      head="Activities"
                      dispatch={dispatch}
                      activities={user && user.bucket}
                      tryActivity={addActivityToTodo}
                      removeActivityFromBucket={removeActivityFromBucket}
                      type="normal"
                    />
                  </>
                )}
              </Tab>

              <Tab eventKey="to-do-list" title="TO-DO LIST">
                {loadingGetUserDetails ? (
                  <Loader />
                ) : errorGetUserDetails ? (
                  <Message variant="danger">{errorGetUserDetails}</Message>
                ) : (
                  <>
                    <MyCards
                      head="To-do List"
                      dispatch={dispatch}
                      activities={user && user.toDoList}
                      removeActivityFromTodo={removeActivityFromTodo}
                      completeActivity={addActivityToCompleted}
                      type="toDo"
                    />
                  </>
                )}
              </Tab>

              <Tab eventKey="completed" title="COMPLETED">
                {loadingGetUserDetails || loadingRemoveActivityFromBucket ? (
                  <Loader />
                ) : errorGetUserDetails ? (
                  <Message variant="danger">{errorGetUserDetails}</Message>
                ) : (
                  <>
                    <MyCards
                      head="Completed"
                      dispatch={dispatch}
                      activities={user && user.completed}
                      archiveActivity={addActivityToArchive}
                      type="completed"
                    />
                  </>
                )}
              </Tab>
            </Tabs>
            {/* <MyCards
              head="Activities"
              dispatch={dispatch}
              activities={theUser.bucket}
              tryActivity={addActivityToTodo}
              removeActivityFromBucket={removeActivityFromBucket}
              type="normal"
            /> */}
            {/* <MyCards
              head="To-do List"
              dispatch={dispatch}
              activities={theUser.toDoList}
              removeActivityFromTodo={removeActivityFromTodo}
              completeActivity={addActivityToCompleted}
              type="toDo"
            /> */}
            {/* <MyCards
              head="Completed"
              dispatch={dispatch}
              activities={theUser.completed}
              archiveActivity={addActivityToArchive}
              type="completed"
            /> */}
          </>
        )}
      </MainGridContainer>
    </>
  );
};

export default DashboardScreen;

const MainWrapper = styled.div`
  /* min-height: 75vh; */
`;

const MainGridContainer = styled.div`
  margin-bottom: 2rem;
`;
