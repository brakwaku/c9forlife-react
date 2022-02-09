import {
    ACTIVITY_LIST_REQUEST,
    ACTIVITY_LIST_SUCCESS,
    ACTIVITY_LIST_FAIL,
    ACTIVITY_DETAILS_REQUEST,
    ACTIVITY_DETAILS_SUCCESS,
    ACTIVITY_DETAILS_FAIL,
    ACTIVITY_DELETE_REQUEST,
    ACTIVITY_DELETE_SUCCESS,
    ACTIVITY_DELETE_FAIL,
    ACTIVITY_CREATE_REQUEST,
    ACTIVITY_CREATE_SUCCESS,
    ACTIVITY_CREATE_FAIL,
    ACTIVITY_UPDATE_REQUEST,
    ACTIVITY_UPDATE_SUCCESS,
    ACTIVITY_UPDATE_FAIL,
} from '../constants/activityConstants';
import axios from 'axios';

export const listActivities = () => async (dispatch) => {
    try {
        dispatch({ type: ACTIVITY_LIST_REQUEST })

        const { data } = await axios.get(`/api/activities`)

        dispatch({
            type: ACTIVITY_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ACTIVITY_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const listActivityDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: ACTIVITY_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/activities/${id}`)

        dispatch({
            type: ACTIVITY_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ACTIVITY_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const deleteActivity = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ACTIVITY_DELETE_REQUEST, })

        const { userLogin: { userInfo }, } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        await axios.delete(`/api/activities/${id}`, config)

        dispatch({
            type: ACTIVITY_DELETE_SUCCESS
        })
    } catch (error) {
        dispatch({
            type: ACTIVITY_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const createActivity = (activityTitle, activityDescription) => async (dispatch, getState) => {
    try {
        dispatch({ type: ACTIVITY_CREATE_REQUEST, })

        const { userLogin: { userInfo }, } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.post(`/api/activities`, { activityTitle, activityDescription }, config)

        dispatch({
            type: ACTIVITY_CREATE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: ACTIVITY_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const updateActivity = (activity) => async (dispatch, getState) => {
    try {
        dispatch({ type: ACTIVITY_UPDATE_REQUEST, })

        const { userLogin: { userInfo }, } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.put(`/api/activities/${activity._id}`, activity, config)

        dispatch({
            type: ACTIVITY_UPDATE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: ACTIVITY_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}