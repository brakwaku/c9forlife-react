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
    ACTIVITYSUGGESTION_UPDATE_REQUEST,
    ACTIVITYSUGGESTION_UPDATE_SUCCESS,
    ACTIVITYSUGGESTION_UPDATE_FAIL,
    ACTIVITYSUGGESTION_APPROVE_REQUEST,
    ACTIVITYSUGGESTION_APPROVE_SUCCESS,
    ACTIVITYSUGGESTION_APPROVE_FAIL,
} from '../constants/activitySuggestionConstants';
import axios from 'axios';

export const listActivitySuggestions = () => async (dispatch) => {
    try {
        dispatch({ type: ACTIVITYSUGGESTION_LIST_REQUEST })

        const { data } = await axios.get(`/api/activitySuggestions`)

        dispatch({
            type: ACTIVITYSUGGESTION_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ACTIVITYSUGGESTION_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const listActivitySuggestionDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: ACTIVITYSUGGESTION_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/activitySuggestions/${id}`)

        dispatch({
            type: ACTIVITYSUGGESTION_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ACTIVITYSUGGESTION_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const deleteActivitySuggestion = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ACTIVITYSUGGESTION_DELETE_REQUEST, })

        const { userLogin: { userInfo }, } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        await axios.delete(`/api/activitySuggestions/${id}`, config)

        dispatch({
            type: ACTIVITYSUGGESTION_DELETE_SUCCESS
        })
    } catch (error) {
        dispatch({
            type: ACTIVITYSUGGESTION_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const createActivitySuggestion = (activitySuggestionTitle, activitySuggestionDescription) => async (dispatch, getState) => {
    try {
        dispatch({ type: ACTIVITYSUGGESTION_CREATE_REQUEST, })

        const { userLogin: { userInfo }, } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.post(`/api/activitySuggestions`, { activitySuggestionTitle, activitySuggestionDescription }, config)

        dispatch({
            type: ACTIVITYSUGGESTION_CREATE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: ACTIVITYSUGGESTION_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const updateActivitySuggestion = (activity) => async (dispatch, getState) => {
    try {
        dispatch({ type: ACTIVITYSUGGESTION_UPDATE_REQUEST, })

        const { userLogin: { userInfo }, } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.put(`/api/activitySuggestions/${activity._id}`, activity, config)

        dispatch({
            type: ACTIVITYSUGGESTION_UPDATE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: ACTIVITYSUGGESTION_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const approveActivitySuggestion = (activitySuggestionId) => async (dispatch, getState) => {
    try {
        dispatch({ type: ACTIVITYSUGGESTION_APPROVE_REQUEST, })

        const { userLogin: { userInfo }, } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.post(`/api/activitySuggestions/${activitySuggestionId}`, {}, config)

        dispatch({
            type: ACTIVITYSUGGESTION_APPROVE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: ACTIVITYSUGGESTION_APPROVE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}