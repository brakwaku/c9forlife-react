import styled from "styled-components";
import ActivityUser from "../components/ActivityUser";
import { Link } from "react-router-dom";

// Has a lot of props to make it reuseable by different types of renders and actions.
// All the props are also being used in the ActivityUser component
const MyCards = ({
  head,
  activities,
  dispatch,
  addActivityToBucket,
  removeActivityFromBucket,
  removeActivityFromTodo,
  tryActivity,
  archiveActivity,
  completeActivity,
  type,
}) => {
  return (
    <MainGridItem className={type === 'normal' ? 'container animate__animated animate__fadeInLeft' : type === 'completed' ? 'container animate__animated animate__fadeInRight' : 'container animate__animated animate__fadeInDown'}>
      <h3>{head}</h3>
      <NextCon className="container">
        <>
          {!activities ? (<center><h5>No items in here yet. Click on "Activities" in the navigation to add activities.</h5></center>) : activities.length > 0 ? activities.map((act) => (
            <ActivityUser
              key={act._id}
              activity={act}
              dispatch={dispatch}
              addActivityToBucket={addActivityToBucket}
              removeActivityFromBucket={removeActivityFromBucket}
              tryActivity={tryActivity}
              removeActivityFromTodo={removeActivityFromTodo}
              archiveActivity={archiveActivity}
              completeActivity={completeActivity}
              type={type}
            />
          )) : <center><h5>No items in here yet. They will show once they are added.</h5></center>}
          {type === 'completed' ? (<Link to='/archive'><button className='btn btn-warning mt-5 font-weight-bold'>My Archives</button></Link>) : ''}
        </>
      </NextCon>
    </MainGridItem>
  );
};

export default MyCards;

const MainGridItem = styled.div`
  border-radius: 10px;
  background-color: #ffffff;
  border: solid 2px #949494;
  max-height: 100vh;
  min-height: 70vh;
  padding-bottom: 7px;

  > h3 {
    background-color: #eeeeee;
    text-align: center;
    border-radius: 0px 0px 7px 7px;
    font-weight: bold;
    padding: 5px;
  }
`;

const NextCon = styled.div`
  overflow: scroll;
  max-height: 86vh;
  min-height: 70vh;
`;
