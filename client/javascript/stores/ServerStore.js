import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import ServerActions from '../actions/ServerActions';
import BaseStore from './BaseStore';
import EventTypes from '../constants/EventTypes';

class ServerStoreClass extends BaseStore {
    constructor() {
        super();
        this.stats = {};
    }

    getDiskStats() {
        return this.stats;
    }

    fetchDiskStats(){
        ServerActions.fetchDiskStats();
    }

    handleGetDiskStatsError(error) {
        // this.emit(EventTypes.SERVER_FETCH_DISK_STATS_ERROR);
    }

    handleFetchDiskStatsSuccess(data) {
        this.stats = data;
        this.emit(EventTypes.SERVER_FETCH_DISK_STATS_SUCCESS);
    }
}

let ServerStore = new ServerStoreClass();

ServerStore.dispatcherID = AppDispatcher.register((payload) => {
  const {action, source} = payload;

  switch (action.type) {
    case ActionTypes.SERVER_FETCH_DISK_STATS_SUCCESS:
      ServerStore.handleFetchDiskStatsSuccess(action.data);
      break;
  case ActionTypes.SERVER_FETCH_DISK_STATS_ERROR:
      ServerStore.handleGetDiskStatsError(action.error);
      break;
  }
});

export default ServerStore;
