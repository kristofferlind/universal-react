import { apiEndpoints } from '../../config';
import actions from '../../config/actions';
import apiService from '../../components/api.service';

export default {
  loadUser: () => (dispatch) => {
    dispatch({ type: actions.LOAD_USER });
    return apiService.get(apiEndpoints.ME)
      .then(data => dispatch({ type: actions.LOAD_USER_SUCCESS, data }))
      .catch(error => dispatch({ type: actions.LOAD_USER_ERROR, error }));
  }
};
