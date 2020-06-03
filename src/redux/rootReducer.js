import { combineReducers } from 'redux';
import {
  UPDATING_THUMBNAIL,
  UPDATING_THUMBNAIL_FAILED,
  UPDATING_THUMBNAIL_SUCCESS,
  FETCHING_VIDEOS,
  FETCHING_SUCCESS,
  FETCHING_FAILED,
  UPDATE_CURRENT_VIDEO,
} from './constant';

const initialState = {
  videos: {},
  fetching: false,
};

const videoState = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCHING_VIDEOS:
      return { ...state, fetching: true };
    case UPDATING_THUMBNAIL:
      return { ...state, fetching: true };
    case UPDATING_THUMBNAIL_FAILED:
      return { ...state, fetching: false, error: payload };
    case FETCHING_FAILED:
      return { ...state, fetching: false, error: payload };
    case UPDATING_THUMBNAIL_SUCCESS:
      return { ...state, fetching: false };
    case FETCHING_SUCCESS: {
      return { ...state, fetching: false, videos: payload };
    }
    case UPDATE_CURRENT_VIDEO:
      return { ...state, fetching: false, currentVideo: state.currentVideo + 1 };
    default:
      return state;
  }
};

export default combineReducers({
  video: videoState,
});
