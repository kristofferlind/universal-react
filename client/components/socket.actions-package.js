const DEFAULT_MODIFIER_DURATION = 1000;

export default ({ entity, modifierDuration = DEFAULT_MODIFIER_DURATION }) => ({
  saved: item => (dispatch) => {
    dispatch({
      type: `UPDATE_${entity}`,
      item: { socket: { type: 'UPDATE' }, ...item }
    });
    setTimeout(() => {
      dispatch({
        type: `UPDATE_${entity}`,
        item
      });
    }, modifierDuration);
  },
  removed: item => (dispatch) => {
    dispatch({
      type: `UPDATE_${entity}`,
      item: { socket: { type: 'DELETE' }, ...item }
    });
    setTimeout(() => {
      dispatch({
        type: `DELETE_${entity}`,
        item
      });
    }, modifierDuration);
  }
});
