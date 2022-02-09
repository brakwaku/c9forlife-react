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
    MOTIVATION_UPDATE_REQUEST,
    MOTIVATION_UPDATE_SUCCESS,
    MOTIVATION_UPDATE_FAIL,
} from '../constants/motivationConstants';
import axios from 'axios';

export const listMotivations = () => async (dispatch) => {
    try {
        dispatch({ type: MOTIVATION_LIST_REQUEST })

        const { data } = await axios.get(`/api/motivations`)

        dispatch({
            type: MOTIVATION_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: MOTIVATION_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const listMotivationDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: MOTIVATION_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/motivations/${id}`)

        dispatch({
            type: MOTIVATION_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: MOTIVATION_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const deleteMotivation = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: MOTIVATION_DELETE_REQUEST, })

        const { userLogin: { userInfo }, } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        await axios.delete(`/api/motivations/${id}`, config)

        dispatch({
            type: MOTIVATION_DELETE_SUCCESS
        })
    } catch (error) {
        dispatch({
            type: MOTIVATION_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const createMotivation = (motivationAuthor, motivationQuote) => async (dispatch, getState) => {
    try {
        dispatch({ type: MOTIVATION_CREATE_REQUEST, })

        const { userLogin: { userInfo }, } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.post(`/api/motivations`, { motivationAuthor, motivationQuote }, config)

        dispatch({
            type: MOTIVATION_CREATE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: MOTIVATION_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const updateMotivation = (motivation) => async (dispatch, getState) => {
    try {
        dispatch({ type: MOTIVATION_UPDATE_REQUEST, })

        const { userLogin: { userInfo }, } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.put(`/api/motivations/${motivation._id}`, motivation, config)

        dispatch({
            type: MOTIVATION_UPDATE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: MOTIVATION_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}