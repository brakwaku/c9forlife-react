import {
    ACTIVITYSUGGESTION_LIST_REQUEST,
    ACTIVITYSUGGESTION_LIST_SUCCESS,
    ACTIVITYSUGGESTION_LIST_FAIL,
    ACTIVITYSUGGESTION_DETAILS_REQUEST,
    ACTIVITYSUGGESTION_DETAILS_SUCCESS,
    ACTIVITYSUGGESTION_DETAILS_FAIL,
    ACTIVITYSUGGESTION_DELETE_REQUEST,
    ACTIVITYSUGGESTION_DELETE_SUCCESS,
    ACTIVITYSUGGESTION_DELETE_FAIL,
    ACTIVITYSUGGESTION_CREATE_REQUEST,
    ACTIVITYSUGGESTION_CREATE_SUCCESS,
    ACTIVITYSUGGESTION_CREATE_FAIL,
    ACTIVITYSUGGESTION_CREATE_RESET,
    ACTIVITYSUGGESTION_UPDATE_REQUEST,
    ACTIVITYSUGGESTION_UPDATE_SUCCESS,
    ACTIVITYSUGGESTION_UPDATE_FAIL,
    ACTIVITYSUGGESTION_UPDATE_RESET,
    ACTIVITYSUGGESTION_APPROVE_REQUEST,
    ACTIVITYSUGGESTION_APPROVE_SUCCESS,
    ACTIVITYSUGGESTION_APPROVE_FAIL,
    ACTIVITYSUGGESTION_APPROVE_RESET,
} from '../constants/activitySuggestionConstants';

export const activitySuggestionListReducer = (state = { activitySuggestions: []}, action) => {
    switch (action.type) {
        case ACTIVITYSUGGESTION_LIST_REQUEST:
            return { loading: true, activitySuggestions: [] }
        case ACTIVITYSUGGESTION_LIST_SUCCESS:
            return {
                loading: false,
                activitySuggestions: action.payload.activitySuggestions,
                pages: action.payload.pages,
                page: action.payload.page,
            }
        case ACTIVITYSUGGESTION_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const activitySuggestionDetailsReducer = (state = { activitySuggestion: {} }, action) => {
    switch (action.type) {
        case ACTIVITYSUGGESTION_DETAILS_REQUEST:
            return { loading: true, ...state }
        case ACTIVITYSUGGESTION_DETAILS_SUCCESS:
            return { loading: false, activitySuggestion: action.payload }
        case ACTIVITYSUGGESTION_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const activitySuggestionDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case ACTIVITYSUGGESTION_DELETE_REQUEST:
            return { loading: true }
        case ACTIVITYSUGGESTION_DELETE_SUCCESS:
            return { loading: false, success: true }
        case ACTIVITYSUGGESTION_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const activitySuggestionCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case ACTIVITYSUGGESTION_CREATE_REQUEST:
            return { loading: true }
        case ACTIVITYSUGGESTION_CREATE_SUCCESS:
            return { loading: false, success: true, activitySuggestion: action.payload }
        case ACTIVITYSUGGESTION_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case ACTIVITYSUGGESTION_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const activitySuggestionUpdateReducer = (state = { activitySuggestion: {} }, action) => {
    switch (action.type) {
        case ACTIVITYSUGGESTION_UPDATE_REQUEST:
            return { loading: true }
        case ACTIVITYSUGGESTION_UPDATE_SUCCESS:
            return { loading: false, success: true, activitySuggestion: action.payload }
        case ACTIVITYSUGGESTION_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case ACTIVITYSUGGESTION_UPDATE_RESET:
            return { activity: {} }
        default:
            return state
    }
}

export const activitySuggestionApproveReducer = (state = { activitySuggestion: {} }, action) => {
    switch (action.type) {
        case ACTIVITYSUGGESTION_APPROVE_REQUEST:
            return { loading: true }
        case ACTIVITYSUGGESTION_APPROVE_SUCCESS:
            return { loading: false, success: true, activitySuggestion: action.payload }
        case ACTIVITYSUGGESTION_APPROVE_FAIL:
            return { loading: false, error: action.payload }
        case ACTIVITYSUGGESTION_APPROVE_RESET:
            return { activity: {} }
        default:
            return state
    }
}