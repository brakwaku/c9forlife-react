import {
    MOTIVATION_LIST_REQUEST,
    MOTIVATION_LIST_SUCCESS,
    MOTIVATION_LIST_FAIL,
    MOTIVATION_DETAILS_REQUEST,
    MOTIVATION_DETAILS_SUCCESS,
    MOTIVATION_DETAILS_FAIL,
    MOTIVATION_DELETE_REQUEST,
    MOTIVATION_DELETE_SUCCESS,
    MOTIVATION_DELETE_FAIL,
    MOTIVATION_CREATE_REQUEST,
    MOTIVATION_CREATE_SUCCESS,
    MOTIVATION_CREATE_FAIL,
    MOTIVATION_CREATE_RESET,
    MOTIVATION_UPDATE_REQUEST,
    MOTIVATION_UPDATE_SUCCESS,
    MOTIVATION_UPDATE_FAIL,
    MOTIVATION_UPDATE_RESET,
} from '../constants/motivationConstants';

export const motivationListReducer = (state = { motivations: []}, action) => {
    switch (action.type) {
        case MOTIVATION_LIST_REQUEST:
            return { loading: true, motivations: [] }
        case MOTIVATION_LIST_SUCCESS:
            return {
                loading: false,
                motivations: action.payload.motivations,
                pages: action.payload.pages,
                page: action.payload.page,
            }
        case MOTIVATION_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const motivationDetailsReducer = (state = { motivation: {} }, action) => {
    switch (action.type) {
        case MOTIVATION_DETAILS_REQUEST:
            return { loading: true, ...state }
        case MOTIVATION_DETAILS_SUCCESS:
            return { loading: false, motivation: action.payload }
        case MOTIVATION_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const motivationDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case MOTIVATION_DELETE_REQUEST:
            return { loading: true }
        case MOTIVATION_DELETE_SUCCESS:
            return { loading: false, success: true }
        case MOTIVATION_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const motivationCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case MOTIVATION_CREATE_REQUEST:
            return { loading: true }
        case MOTIVATION_CREATE_SUCCESS:
            return { loading: false, success: true, motivation: action.payload }
        case MOTIVATION_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case MOTIVATION_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const motivationUpdateReducer = (state = { motivation: {} }, action) => {
    switch (action.type) {
        case MOTIVATION_UPDATE_REQUEST:
            return { loading: true }
        case MOTIVATION_UPDATE_SUCCESS:
            return { loading: false, success: true, motivation: action.payload }
        case MOTIVATION_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case MOTIVATION_UPDATE_RESET:
            return { motivation: {} }
        default:
            return state
    }
}