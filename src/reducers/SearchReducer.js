const initialState = {
  query: "",
  requestedQuery: "",
  resolvedQuery: "",
  isDropdownOpen: false,
  activeFilter: null,
  loadingProprietors: false,
  proprietorError: null,
  proprietorResults: [],
  resultCounts: {
    proprietors: {
      total: 0,
      visible: 5,
      page: 1,
      pageSize: 10,
    },
  },
};

const SearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SEARCH_QUERY":
      return {
        ...state,
        query: action.payload,
      };

    case "OPEN_SEARCH_DROPDOWN":
      return {
        ...state,
        isDropdownOpen: true,
      };

    case "CLOSE_SEARCH_DROPDOWN":
      return {
        ...state,
        isDropdownOpen: false,
      };

    case "SET_SEARCH_FILTER":
      return {
        ...state,
        activeFilter: action.payload,
        resultCounts: {
          ...state.resultCounts,
          proprietors: {
            ...state.resultCounts.proprietors,
            visible:
              action.payload === "proprietor"
                ? Math.min(state.resultCounts.proprietors.total, 10)
                : Math.min(state.resultCounts.proprietors.total, 5),
          },
        },
      };

    case "CLEAR_SEARCH_FILTER":
      return {
        ...state,
        activeFilter: null,
        resultCounts: {
          ...state.resultCounts,
          proprietors: {
            ...state.resultCounts.proprietors,
            visible: Math.min(state.resultCounts.proprietors.total, 5),
          },
        },
      };

    case "FETCH_PROPRIETORS_STARTED":
      return {
        ...state,
        loadingProprietors: true,
        proprietorError: null,
        requestedQuery: action.payload,
      };

    case "FETCH_PROPRIETORS_SUCCEEDED":
      return {
        ...state,
        loadingProprietors: false,
        proprietorError: null,
        proprietorResults: action.payload.results,
        resolvedQuery: action.meta?.query || state.resolvedQuery,
        resultCounts: {
          ...state.resultCounts,
          proprietors: {
            total: action.payload.total,
            visible: action.payload.visible,
            page: action.meta?.page || 1,
            pageSize: action.meta?.pageSize || 10,
          },
        },
      };

    case "FETCH_PROPRIETORS_FAILED":
      return {
        ...state,
        loadingProprietors: false,
        proprietorError: action.payload,
        proprietorResults: [],
        resultCounts: {
          ...state.resultCounts,
          proprietors: {
            total: 0,
            visible: 5,
            page: 1,
            pageSize: 10,
          },
        },
      };

    case "CLEAR_SEARCH_RESULTS":
      return {
        ...state,
        requestedQuery: "",
        resolvedQuery: "",
        loadingProprietors: false,
        proprietorError: null,
        proprietorResults: [],
        resultCounts: {
          proprietors: {
            total: 0,
            visible: 5,
            page: 1,
            pageSize: 10,
          },
        },
      };

    case "RESET_SEARCH_STATE":
      return initialState;

    default:
      return state;
  }
};

export default SearchReducer;
