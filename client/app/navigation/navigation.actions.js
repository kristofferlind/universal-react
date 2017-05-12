import { push } from 'connected-react-router';
import { baseURL } from '../../config';

let shouldUpdate = false;

export const triggerUpdate = () => {
  shouldUpdate = true;
};

const navigationActions = {
  navigate: path => (dispatch) => {
    if (shouldUpdate) {
      window.location.replace(baseURL + path);
      shouldUpdate = false;
    } else {
      dispatch(push(path));
    }
  }
};

export default navigationActions;
