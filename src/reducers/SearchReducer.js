const DEFAULT_PROPRIETOR_COUNTS = {
  total: 0,
  visible: 5,
  page: 1,
  pageSize: 10,
};

const getVisibleCount = (total, isProprietorFilterActive) =>
  Math.min(total, isProprietorFilterActive ? 10 : 5);

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
    proprietors: DEFAULT_PROPRIETOR_COUNTS,
  },
};

const SearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SEARCH_QUERY":
      return {
        ...state,
        query: action.payload,
      };

    case "SET_DROPDOWN_OPEN":
      return {
        ...state,
        isDropdownOpen: action.payload,
      };

    case "SET_SEARCH_FILTER":
      const isProprietorFilterActive = action.payload === "proprietor";
      return {
        ...state,
        activeFilter: action.payload,
        resultCounts: {
          ...state.resultCounts,
          proprietors: {
            ...state.resultCounts.proprietors,
            visible: getVisibleCount(
              state.resultCounts.proprietors.total,
              isProprietorFilterActive,
            ),
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
            visible: getVisibleCount(
              action.payload.total,
              state.activeFilter === "proprietor",
            ),
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
          proprietors: DEFAULT_PROPRIETOR_COUNTS,
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
          proprietors: DEFAULT_PROPRIETOR_COUNTS,
        },
      };

    case "RESET_SEARCH_STATE":
      return initialState;

    default:
      return state;
  }
};

export default SearchReducer;
