export default ({ entity, listProperty }) => ({
  [`UPDATE_${entity}`]: (state, action) => {
    const index = state[listProperty].map(item => item._id).indexOf(action.item._id);
    if (index !== -1) {
      return {
        ...state,
        [listProperty]: [
          ...state[listProperty].slice(0, index),
          {
            ...action.item
          },
          ...state[listProperty].slice(index + 1)
        ]
      };
    }
    return {
      ...state,
      [listProperty]: [...state[listProperty], action.item]
    };
  },
  [`DELETE_${entity}`]: (state, action) => ({
    ...state,
    [listProperty]: state[listProperty].filter(item => item._id !== action.item._id)
  })
});
