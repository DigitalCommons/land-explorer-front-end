import { getRequest } from "./RequestActions";
import { fetchRelatedProperties } from "./LandOwnershipActions";

const DEFAULT_PROPRIETOR_PAGE = 1;
const DEFAULT_PROPRIETOR_PAGE_SIZE = 10;
const MAX_SEARCH_TERM_LENGTH = 200;
const DEFAULT_VISIBLE_PROPRIETOR_RESULTS = 5;
const FILTERED_VISIBLE_PROPRIETOR_RESULTS = 10;

export const setSearchQuery = (query) => {
  return (dispatch) => {
    dispatch({
      type: "SET_SEARCH_QUERY",
      payload: query,
    });
  };
};

export const openSearchDropdown = () => {
  return (dispatch) => {
    dispatch({
      type: "OPEN_SEARCH_DROPDOWN",
    });
  };
};

export const closeSearchDropdown = () => {
  return (dispatch) => {
    dispatch({
      type: "CLOSE_SEARCH_DROPDOWN",
    });
  };
};

export const setSearchFilter = (filter) => {
  return (dispatch) => {
    dispatch({
      type: "SET_SEARCH_FILTER",
      payload: filter,
    });
  };
};

export const clearSearchFilter = () => {
  return (dispatch) => {
    dispatch({
      type: "CLEAR_SEARCH_FILTER",
    });
  };
};

export const toggleSearchFilter = (filter) => {
  return (dispatch, getState) => {
    const { search } = getState();
    const currentFilter = search?.activeFilter || null;

    if (currentFilter === filter) {
      dispatch(clearSearchFilter());
      return;
    }

    dispatch(setSearchFilter(filter));
  };
};

export const clearSearchResults = () => {
  return (dispatch) => {
    dispatch({
      type: "CLEAR_SEARCH_RESULTS",
    });
  };
};

export const resetSearchState = () => {
  return (dispatch) => {
    dispatch({
      type: "RESET_SEARCH_STATE",
    });
  };
};

export const fetchProprietors = (
  query,
  page = DEFAULT_PROPRIETOR_PAGE,
  pageSize = DEFAULT_PROPRIETOR_PAGE_SIZE,
) => {
  return async (dispatch, getState) => {
    const rawQuery = query ?? "";
    const trimmedQuery = rawQuery.trim();

    dispatch(setSearchQuery(rawQuery));

    if (!trimmedQuery) {
      dispatch(clearSearchResults());
      dispatch(closeSearchDropdown());
      return;
    }

    const safeQuery = trimmedQuery.slice(0, MAX_SEARCH_TERM_LENGTH);

    dispatch(openSearchDropdown());

    dispatch({
      type: "FETCH_PROPRIETORS_STARTED",
      payload: safeQuery,
    });

    const response = await dispatch(
      getRequest(
        `/api/proprietors?searchTerm=${encodeURIComponent(
          safeQuery,
        )}&page=${page}&pageSize=${pageSize}`,
      ),
    );

    if (response === null) {
      dispatch({
        type: "FETCH_PROPRIETORS_FAILED",
        payload: "Error fetching proprietors",
      });
      return;
    }

    const results = Array.isArray(response.results) ? response.results : [];
    const total =
      typeof response.totalResults === "number"
        ? response.totalResults
        : results.length;

    const { search } = getState();
    const isProprietorFilterActive = search?.activeFilter === "proprietor";

    dispatch({
      type: "FETCH_PROPRIETORS_SUCCEEDED",
      payload: {
        results,
        total,
        visible: Math.min(
          results.length,
          isProprietorFilterActive
            ? FILTERED_VISIBLE_PROPRIETOR_RESULTS
            : DEFAULT_VISIBLE_PROPRIETOR_RESULTS,
        ),
      },
      meta: {
        query: safeQuery,
        page: response.page,
        pageSize: response.pageSize,
      },
    });
  };
};

export const selectProprietorResult = (proprietor) => {
  return async (dispatch) => {
    const proprietorName =
      typeof proprietor === "string"
        ? proprietor
        : proprietor?.proprietorName || "";

    if (!proprietorName) {
      return;
    }

    dispatch(setSearchQuery(proprietorName));
    dispatch(closeSearchDropdown());
    dispatch(clearSearchFilter());

    dispatch({
      type: "SET_ACTIVE",
      payload: "Ownership Search",
    });

    await dispatch(fetchRelatedProperties(proprietorName));
  };
};

export const selectLocationResult = (location) => {
  return (dispatch) => {
    dispatch(closeSearchDropdown());
    dispatch(clearSearchFilter());

    dispatch(setSearchQuery(location?.place_name || location?.label || ""));
  };
};
