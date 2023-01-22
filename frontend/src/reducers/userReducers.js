import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_RESET,
    USER_DETAILS_RESET,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_RESET,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_PASSWORD_RESET_EMAIL_REQUEST,
    USER_PASSWORD_RESET_EMAIL_SUCCESS,
    USER_PASSWORD_RESET_EMAIL_FAIL,
    USER_UPDATE_PASSWORD_REQUEST,
    USER_UPDATE_PASSWORD_SUCCESS,
    USER_UPDATE_PASSWORD_FAIL,
    USER_ADD_ACTIVITY_TO_BUCKET_REQUEST,
    USER_ADD_ACTIVITY_TO_BUCKET_SUCCESS,
    USER_ADD_ACTIVITY_TO_BUCKET_FAIL,
    USER_REMOVE_ACTIVITY_FROM_BUCKET_REQUEST,
  USER_REMOVE_ACTIVITY_FROM_BUCKET_SUCCESS,
  USER_REMOVE_ACTIVITY_FROM_BUCKET_FAIL,
  USER_ADD_ACTIVITY_TO_TODO_REQUEST,
  USER_ADD_ACTIVITY_TO_TODO_SUCCESS,
  USER_ADD_ACTIVITY_TO_TODO_FAIL,
  USER_REMOVE_ACTIVITY_FROM_TODO_REQUEST,
  USER_REMOVE_ACTIVITY_FROM_TODO_SUCCESS,
  USER_REMOVE_ACTIVITY_FROM_TODO_FAIL,
  USER_ADD_ACTIVITY_TO_COMPLETED_REQUEST,
  USER_ADD_ACTIVITY_TO_COMPLETED_SUCCESS,
  USER_ADD_ACTIVITY_TO_COMPLETED_FAIL,
  USER_ADD_ACTIVITY_TO_ARCHIVE_REQUEST,
  USER_ADD_ACTIVITY_TO_ARCHIVE_SUCCESS,
  USER_ADD_ACTIVITY_TO_ARCHIVE_FAIL,
} from '../constants/userConstants';

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true }
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true }
        case USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return { ...state, loading: true }
        case USER_DETAILS_SUCCESS:
            return { loading: false, success: true, user: action.payload }
        case USER_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        case USER_DETAILS_RESET:
            return { user: {} }
        default:
            return state
    }
}

export const userUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_PROFILE_REQUEST:
            return { loading: true }
        case USER_UPDATE_PROFILE_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload }
        case USER_UPDATE_PROFILE_FAIL:
            return { loading: false, error: action.payload }
        case USER_UPDATE_PROFILE_RESET:
            return { userInfo: {} }
        default:
            return state
    }
}

export const userListReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case USER_LIST_REQUEST:
            return { loading: true }
        case USER_LIST_SUCCESS:
            return { loading: false, users: action.payload }
        case USER_LIST_FAIL:
            return { loading: false, error: action.payload }
        case USER_LIST_RESET:
            return { users: [] }
        default:
            return state
    }
}

export const userDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_DELETE_REQUEST:
            return { loading: true }
        case USER_DELETE_SUCCESS:
            return { loading: false, success: true }
        case USER_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const userUpdateReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_UPDATE_REQUEST:
            return { loading: true }
        case USER_UPDATE_SUCCESS:
            return { loading: false, success: true }
        case USER_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case USER_UPDATE_RESET:
            return { user: {} }
        default:
            return state
    }
}

export const userPasswordResetEmailReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_PASSWORD_RESET_EMAIL_REQUEST:
            return { loading: true }
        case USER_PASSWORD_RESET_EMAIL_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload }
        case USER_PASSWORD_RESET_EMAIL_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const userUpdatePasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_PASSWORD_REQUEST:
            return { loading: true }
        case USER_UPDATE_PASSWORD_SUCCESS:
            return { loading: false, success: true, user: action.payload }
        case USER_UPDATE_PASSWORD_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const userAddActivityToBucketReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_ADD_ACTIVITY_TO_BUCKET_REQUEST:
            return { loading: true }
        case USER_ADD_ACTIVITY_TO_BUCKET_SUCCESS:
            return { loading: false, success: true, user: action.payload }
        case USER_ADD_ACTIVITY_TO_BUCKET_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const userRemoveActivityFromBucketReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REMOVE_ACTIVITY_FROM_BUCKET_REQUEST:
            return { loading: true }
        case USER_REMOVE_ACTIVITY_FROM_BUCKET_SUCCESS:
            return { loading: false, success: true, user: action.payload }
        case USER_REMOVE_ACTIVITY_FROM_BUCKET_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const userAddActivityToTodoReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_ADD_ACTIVITY_TO_TODO_REQUEST:
            return { loading: true }
        case USER_ADD_ACTIVITY_TO_TODO_SUCCESS:
            return { loading: false, success: true, user: action.payload }
        case USER_ADD_ACTIVITY_TO_TODO_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const userRemoveActivityFromTodoReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REMOVE_ACTIVITY_FROM_TODO_REQUEST:
            return { loading: true }
        case USER_REMOVE_ACTIVITY_FROM_TODO_SUCCESS:
            return { loading: false, success: true, user: action.payload }
        case USER_REMOVE_ACTIVITY_FROM_TODO_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const userAddActivityToCompletedReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_ADD_ACTIVITY_TO_COMPLETED_REQUEST:
            return { loading: true }
        case USER_ADD_ACTIVITY_TO_COMPLETED_SUCCESS:
            return { loading: false, success: true, user: action.payload }
        case USER_ADD_ACTIVITY_TO_COMPLETED_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const userAddActivityToArchiveReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_ADD_ACTIVITY_TO_ARCHIVE_REQUEST:
            return { loading: true }
        case USER_ADD_ACTIVITY_TO_ARCHIVE_SUCCESS:
            return { loading: false, success: true, user: action.payload }
        case USER_ADD_ACTIVITY_TO_ARCHIVE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}