import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
    activityListReducer,
    activityDetailsReducer,
    activityDeleteReducer,
    activityCreateReducer,
    activityUpdateReducer,
} from './reducers/activityReducers';

import {
    activitySuggestionListReducer,
    activitySuggestionDetailsReducer,
    activitySuggestionDeleteReducer,
    activitySuggestionCreateReducer,
    activitySuggestionUpdateReducer,
    activitySuggestionApproveReducer,
} from './reducers/activitySuggestionReducers';

import {
    motivationListReducer,
    motivationDetailsReducer,
    motivationDeleteReducer,
    motivationCreateReducer,
    motivationUpdateReducer,
} from './reducers/motivationReducers';

import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userListReducer,
    userDeleteReducer,
    userUpdateReducer,
    userPasswordResetEmailReducer,
    userUpdatePasswordReducer,
    userAddActivityToBucketReducer,
    userRemoveActivityFromBucketReducer,
    userAddActivityToTodoReducer,
    userRemoveActivityFromTodoReducer,
    userAddActivityToCompletedReducer,
    userAddActivityToArchiveReducer,
} from './reducers/userReducers';

const reducer = combineReducers({
    activityList: activityListReducer,
    activityDetails: activityDetailsReducer,
    activityDelete: activityDeleteReducer,
    activityCreate: activityCreateReducer,
    activityUpdate: activityUpdateReducer,
    activitySuggestionList: activitySuggestionListReducer,
    activitySuggestionDetails: activitySuggestionDetailsReducer,
    activitySuggestionDelete: activitySuggestionDeleteReducer,
    activitySuggestionCreate: activitySuggestionCreateReducer,
    activitySuggestionUpdate: activitySuggestionUpdateReducer,
    activitySuggestionApprove: activitySuggestionApproveReducer,
    motivationList: motivationListReducer,
    motivationDetails: motivationDetailsReducer,
    motivationDelete: motivationDeleteReducer,
    motivationCreate: motivationCreateReducer,
    motivationUpdate: motivationUpdateReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    userPasswordResetEmail: userPasswordResetEmailReducer,
    userUpdatePassword: userUpdatePasswordReducer,
    userAddActivityToBucket: userAddActivityToBucketReducer,
    userRemoveActivityFromBucket: userRemoveActivityFromBucketReducer,
    userAddActivityToTodo: userAddActivityToTodoReducer,
    userRemoveActivityFromTodo: userRemoveActivityFromTodoReducer,
    userAddActivityToCompleted: userAddActivityToCompletedReducer,
    userAddActivityToArchive: userAddActivityToArchiveReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
const userDetailsFromStorage = localStorage.getItem('userDetails') ? JSON.parse(localStorage.getItem('userDetails')) : null;

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
    userDetails: { userDetails: userDetailsFromStorage },
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store
