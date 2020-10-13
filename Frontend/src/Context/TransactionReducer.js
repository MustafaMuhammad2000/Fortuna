export default (state, action) => {
  switch (action.type) {
    case "DELETE_EXPENSE":
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction.id !== action.payload
        ),
      };
    case "ADD_EXPENSE":
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };
    default:
      return state;
  }
};
