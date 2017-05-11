// heavily based on redux-optimist, rewritten to improve understanding, give it an api i like and allow modifications

import TRANSACTION from './transaction.constants';

const initialTransactions = [];
const isTransaction = (action, id) => action.transaction && action.transaction.id === id;
const splitState = (state) => {
  if (state) {
    const { transactions = initialTransactions, ...baseState } = state;
    return { transactions, baseState };
  }
  return { transactions: initialTransactions, baseState: state };
};

const transactionMiddleware = (store) => {
  const base = (transactions, state, action) => {
    let updatedTransactions = [{}];
    if (transactions.length) {
      updatedTransactions = [...transactions, { action }];
    }
    const baseState = store(state, action);
    return { transactions: updatedTransactions, ...baseState };
  };
  const begin = (state, action) => {
    let { transactions, baseState } = splitState(state);  // eslint-disable-line prefer-const
    transactions = [...transactions, { beforeState: baseState, action }];
    const newState = store(state, action);
    return { transactions, ...newState };
  };
  const commit = (state, action) => {
    let { transactions, baseState } = splitState(state);  // eslint-disable-line prefer-const
    const updatedTransactions = [];
    let started = false;
    let committed = false;

    transactions.forEach((transaction) => {
      const transactionId = action.transaction.id;
      if (started) {
        if (transaction.beforeState && isTransaction(transaction.action, transactionId)) {
          committed = true;
          updatedTransactions.push({ action: transaction.action });
        } else {
          updatedTransactions.push(transaction);
        }
      } else {
        if (transaction.beforeState) {  // eslint-disable-line no-lonely-if
          if (isTransaction(transaction.action, transactionId)) {
            committed = true;
          } else {
            started = true;
            updatedTransactions.push(transaction);
          }
        }
      }
    });
    if (!committed) {
      console.error(`${action.transaction.id}  does not exist, cannot commit`); // eslint-disable-line no-console
    }
    return base(updatedTransactions, baseState, action);
  };
  const rollback = (state, action) => {
    const { transactions, baseState } = splitState(state);
    const updatedTransactions = [];
    let foundOtherTransaction = false;
    let foundInitialState = false;
    let currentState = baseState;
    transactions.forEach((transaction) => {
      const transactionId = action.transaction.id;
      if (transaction.beforeState && isTransaction(transaction.action, transactionId)) {
        currentState = transaction.beforeState;
        foundInitialState = true;
      }
      if (!isTransaction(transaction.action, transactionId)) {
        if (transaction.beforeState) {
          foundOtherTransaction = true;
        }
        if (foundOtherTransaction) {
          if (foundInitialState && transaction.beforeState) {
            // need to update other transactions beforeState with currently calculated state
            updatedTransactions.push({ beforeState: currentState, action: transaction.action });
          } else {
            updatedTransactions.push(transaction);
          }
        }
        if (foundInitialState) {
          // apply action to current state
          currentState = store(currentState, transaction.action);
        }
      }
    });
    if (!foundInitialState) {
      console.error(`${action.transaction.id} does not exist, cannot rollback`); // eslint-disable-line no-console
    }
    return base(updatedTransactions, currentState, action);
  };
  return (state, action) => {
    if (action.transaction) {
      switch (action.transaction.type) {
        case TRANSACTION.BEGIN:
          return begin(state, action);
        case TRANSACTION.COMMIT:
          return commit(state, action);
        case TRANSACTION.ROLLBACK:
          return rollback(state, action);
        default:
          throw new Error('action.transaction.type needs to be BEGIN, COMMIT or REVERT');
      }
    }
    const { transactions, baseState } = splitState(state);
    return base(transactions, baseState, action);
  };
};

export default transactionMiddleware;
