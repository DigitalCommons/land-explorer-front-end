const DEFAULT_PROPRIETOR_COUNTS = {
  total: 0,
  page: 1,
  pageSize: 10,
};

const initialState = {
  query: "",
  resolvedQuery: "",
  isDropdownOpen: false,
  activeFilter: null,
  loadingProprietors: false,
  proprietorResults: [],
  resultCounts: {
    proprietors: DEFAULT_PROPRIETOR_COUNTS,
  },
};

const SearchReducer = (state = initialState, action: any) => {
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
      return {
        ...state,
        activeFilter: action.payload,
      };

    case "FETCH_PROPRIETORS_STARTED":
      return {
        ...state,
        loadingProprietors: true,
      };

    case "FETCH_PROPRIETORS_SUCCEEDED":
      // Discard stale responses; allow pagination through via resolvedQuery check
      const isCurrentSearch = action.meta?.query === state.query.trim();
      const isPaginationSearch = action.meta?.query === state.resolvedQuery;

      if (!isCurrentSearch && !isPaginationSearch) {
        return state;
      }
      return {
        ...state,
        loadingProprietors: false,
        proprietorResults: action.payload.results,
        resolvedQuery: action.meta?.query || state.resolvedQuery,
        resultCounts: {
          ...state.resultCounts,
          proprietors: {
            total: action.payload.total,
            page: action.meta?.page || 1,
            pageSize: action.meta?.pageSize || 10,
          },
        },
      };

    case "FETCH_PROPRIETORS_FAILED":
      return {
        ...state,
        loadingProprietors: false,
        proprietorResults: [],
        resultCounts: {
          ...state.resultCounts,
          proprietors: DEFAULT_PROPRIETOR_COUNTS,
        },
      };

    case "CLEAR_SEARCH_RESULTS":
      return {
        ...state,
        resolvedQuery: "",
        loadingProprietors: false,
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