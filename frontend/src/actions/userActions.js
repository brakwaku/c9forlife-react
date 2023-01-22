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
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_REQUEST,
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
} from "../constants/userConstants";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    dispatch({
        type: USER_DETAILS_SUCCESS,
        payload: data,
      });

    localStorage.setItem("userInfo", JSON.stringify(data));
    localStorage.setItem("userDetails", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("userDetails");
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: USER_UPDATE_PROFILE_RESET });
  dispatch({ type: USER_LIST_RESET });
};

export const register =
  (firstName, lastName, email, password, magicWord) => async (dispatch) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/users",
        { firstName, lastName, email, password, magicWord },
        config
      );

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      });

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      localStorage.setItem("userDetails", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/${id}`, config);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/users/profile`, user, config);

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users`, config);

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/users/${id}`, config);

    dispatch({ type: USER_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/users/${user._id}`, user, config);

    dispatch({ type: USER_UPDATE_SUCCESS });

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const passwordResetEmail = (email) => async (dispatch) => {
  try {
    dispatch({ type: USER_PASSWORD_RESET_EMAIL_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/resetpassword",
      { email },
      config
    );

    dispatch({ type: USER_PASSWORD_RESET_EMAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_PASSWORD_RESET_EMAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updatePassword = (user, token) => async (dispatch) => {
  try {
    dispatch({ type: USER_UPDATE_PASSWORD_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(
      `/api/users/reset/${user.id}`,
      user,
      config
    );

    dispatch({
      type: USER_UPDATE_PASSWORD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PASSWORD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addActivityToBucket = (activityId) => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_ADD_ACTIVITY_TO_BUCKET_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/users/bucket/${activityId}`,
        userInfo,
        config
      );

      dispatch({
        type: USER_ADD_ACTIVITY_TO_BUCKET_SUCCESS,
        payload: data,
      });

      dispatch({
        type: USER_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_ADD_ACTIVITY_TO_BUCKET_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const removeActivityFromBucket = (activityId) => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_REMOVE_ACTIVITY_FROM_BUCKET_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      // Axios delete does not have a body param
      const { data } = await axios.delete(`/api/users/bucket/${activityId}`, {headers: config.headers,  data: userInfo});

      dispatch({
        type: USER_REMOVE_ACTIVITY_FROM_BUCKET_SUCCESS,
        payload: data,
      });

      dispatch({
        type: USER_DETAILS_SUCCESS,
        payload: data,
      });

    } catch (error) {
      dispatch({
        type: USER_REMOVE_ACTIVITY_FROM_BUCKET_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const addActivityToTodo = (activityId) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_ADD_ACTIVITY_TO_TODO_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/users/todo/${activityId}`,
      userInfo,
      config
    );

    dispatch({
      type: USER_ADD_ACTIVITY_TO_TODO_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: USER_ADD_ACTIVITY_TO_TODO_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeActivityFromTodo = (activityId) => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_REMOVE_ACTIVITY_FROM_TODO_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.delete(`/api/users/todo/${activityId}`, { headers: config.headers,  data: userInfo });

      dispatch({
        type: USER_REMOVE_ACTIVITY_FROM_TODO_SUCCESS,
        payload: data,
      });

      dispatch({
        type: USER_DETAILS_SUCCESS,
        payload: data,
      });

    } catch (error) {
      dispatch({
        type: USER_REMOVE_ACTIVITY_FROM_TODO_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const addActivityToCompleted = (activityId) => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_ADD_ACTIVITY_TO_COMPLETED_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.post(
        `/api/users/complete/${activityId}`,
        userInfo,
        config
      );
  
      dispatch({
        type: USER_ADD_ACTIVITY_TO_COMPLETED_SUCCESS,
        payload: data,
      });

      dispatch({
        type: USER_DETAILS_SUCCESS,
        payload: data,
      });

    } catch (error) {
      dispatch({
        type: USER_ADD_ACTIVITY_TO_COMPLETED_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const addActivityToArchive = (activityId) => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_ADD_ACTIVITY_TO_ARCHIVE_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.post(
        `/api/users/archive/${activityId}`,
        userInfo,
        config
      );
  
      dispatch({
        type: USER_ADD_ACTIVITY_TO_ARCHIVE_SUCCESS,
        payload: data,
      });

      dispatch({
        type: USER_DETAILS_SUCCESS,
        payload: data,
      });

    } catch (error) {
      dispatch({
        type: USER_ADD_ACTIVITY_TO_ARCHIVE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };