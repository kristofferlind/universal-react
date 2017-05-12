// strategies for files and routes
import * as offlinePlugin from 'offline-plugin/runtime';
import { triggerUpdate } from './navigation/navigation.actions';

const noop = () => {};
const prepareHardRefreshRoute = () => {
  // notify navigation actions, making next navigate event a hard refresh
  console.log('next navigate should do hard refresh'); // eslint-disable-line no-console
  offlinePlugin.applyUpdate();
  triggerUpdate();
};

const updateStrategy = {
  onUpdating: noop,
  onUpdateReady: prepareHardRefreshRoute,
  onUpdated: noop,
  onUpdateFailed: noop
};

offlinePlugin.install(updateStrategy);
