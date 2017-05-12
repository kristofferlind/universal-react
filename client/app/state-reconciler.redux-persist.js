const isStatePlainEnough = state => (state && typeof state === 'object');

// redux-optimist stateReconciler, slightly modified
const stateReconciler = (state, inboundState, reducedState, log) => {
  const newState = { ...reducedState };

  Object.keys(inboundState).forEach((key) => {
    // if initialState does not have key, skip auto rehydration
    if (!state.hasOwnProperty(key)) { // eslint-disable-line
      return;
    }

    // if initial state is an object but inbound state is null/undefined, skip
    if (typeof state[key] === 'object' && !inboundState[key]) {
      if (log) {
        console.log('redux-persist/autoRehydrate: sub state for key `%s` is falsy but initial state is an object, skipping autoRehydrate.', key); // eslint-disable-line
      }
      return;
    }

    // if reducer modifies substate, skip auto rehydration (need to allow this for transactions)
    if (key !== 'transactions' && state[key] !== reducedState[key]) {
      if (log) {
        console.log('redux-persist/autoRehydrate: sub state for key `%s` modified, skipping autoRehydrate.', key); // eslint-disable-line
      }
      newState[key] = reducedState[key];
      return;
    }

    // otherwise take the inboundState
    if (isStatePlainEnough(inboundState[key]) && isStatePlainEnough(state[key])) {
      newState[key] = { ...state[key], ...inboundState[key] }; // shallow merge
    } else {
      newState[key] = inboundState[key]; // hard set
    }

    if (log) {
      console.log('redux-persist/autoRehydrate: key `%s`, rehydrated to ', key, newState[key]); // eslint-disable-line
    }
  });
  return newState;
};

export default stateReconciler;
