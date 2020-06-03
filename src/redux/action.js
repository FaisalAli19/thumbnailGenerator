import {
  UPDATING_THUMBNAIL,
  UPDATING_THUMBNAIL_FAILED,
  UPDATING_THUMBNAIL_SUCCESS,
  FETCHING_VIDEOS,
  FETCHING_SUCCESS,
  FETCHING_FAILED,
  UPDATE_CURRENT_VIDEO,
} from './constant';

import { getVideos, updateThumbnailApi } from '../api';

export const getAllPosts = (token, id) => (dispatch) => {
  dispatch({ type: FETCHING_VIDEOS });
  getVideos(token, id)
    .then((res) => {
      if (res.success) {
        console.log(res.data.video);
        dispatch({
          type: FETCHING_SUCCESS,
          payload: res.data.video,
        });
      } else {
        dispatch({ type: FETCHING_FAILED, payload: 'Failed to fetch' });
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: FETCHING_FAILED, payload: 'Failed to fetch' });
    });
};

export const updateThumbnail = (token, data) => (dispatch) => {
  dispatch({ type: UPDATING_THUMBNAIL });
  updateThumbnailApi(token, data).then((res) => {
    console.log(res);
    if (res.success) {
      dispatch({ type: UPDATING_THUMBNAIL_SUCCESS });
      dispatch({ type: UPDATE_CURRENT_VIDEO });
    }
  });
};

export const nextVideo = () => ({
  type: UPDATE_CURRENT_VIDEO,
});
