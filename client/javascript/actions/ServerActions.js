import axios from 'axios';

import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import ConfigStore from '../stores/ConfigStore';

const baseURI = ConfigStore.getBaseURI();

let ServerActions = {
  fetchDiskStats: (property) => {
    return axios.get(`${baseURI}auth/usage-stats`)
      .then((json = {}) => {
        return json.data;
      })
      .then((data) => {
        AppDispatcher.dispatchServerAction({
            type: ActionTypes.SERVER_FETCH_DISK_STATS_SUCCESS,
            data
        });
      }, (error) => {
        AppDispatcher.dispatchServerAction({
            type: ActionTypes.SERVER_FETCH_DISK_STATS_ERROR,
            error
        });
      });
  }
};

export default ServerActions;
