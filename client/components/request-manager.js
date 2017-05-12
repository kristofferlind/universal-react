import { store } from '../app/store';

const tryRequest = (request, tries = 1) =>
  request()
    .catch((error) => {
      if (tries >= 3) {
        throw new Error('failed 3 times, giving up, error: ', error);
      }
      const updatedTries = tries + 1;
      return tryRequest(request, updatedTries);
    });

const requestManager = request =>
  new Promise((resolve, reject) => {
    const { isOnline } = store.getState().app;
    if (isOnline) {
      tryRequest(request)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    }

    // TODO: sequence requests for better compatibility
    // on connection event do request
    document.addEventListener('app:connect', () => {
      tryRequest(request)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  });

export default requestManager;
