import { getRequest } from "./RequestActions";
import { fetchRelatedProperties } from "./LandOwnershipActions";

const DEFAULT_PROPRIETOR_PAGE = 1;
const DEFAULT_PROPRIETOR_PAGE_SIZE = 10;
const MAX_SEARCH_TERM_LENGTH = 200;

export const setSearchQuery = (query) => ({
  type: "SET_SEARCH_QUERY",
  payload: query,
});

export const setDropdownOpen = (isOpen) => ({
  type: "SET_DROPDOWN_OPEN",
  payload: isOpen,
});

export const setSearchFilter = (filter = null) => ({
  type: "SET_SEARCH_FILTER",
  payload: filter,
});

export const toggleSearchFilter = (filter) => (dispatch, getState) => {
  const { search } = getState();
  const newFilter = search?.activeFilter === filter ? null : filter;
  dispatch(setSearchFilter(newFilter));

  const query = (search?.query ?? "").trim();
  if (query && newFilter !== "location") {
    dispatch(fetchProprietors(query));
  }
};

export const clearSearchResults = () => ({
  type: "CLEAR_SEARCH_RESULTS",
});

export const resetSearchState = () => ({
  type: "RESET_SEARCH_STATE",
});

export const fetchProprietors = (
  query,
  page = DEFAULT_PROPRIETOR_PAGE,
  pageSize,
) => {
  return async (dispatch, getState) => {
    const rawQuery = query ?? "";
    const trimmedQuery = rawQuery.trim();

    if (!trimmedQuery) {
      dispatch(clearSearchResults());
      dispatch(setSearchFilter(null));
      dispatch(setDropdownOpen(false));
      return;
    }

    const safeQuery = trimmedQuery.slice(0, MAX_SEARCH_TERM_LENGTH);
    const { search } = getState();
    const effectivePageSize =
      pageSize ?? (search?.activeFilter === "proprietor" ? DEFAULT_PROPRIETOR_PAGE_SIZE : 5);

    dispatch({ type: "FETCH_PROPRIETORS_STARTED" });

    const response = await dispatch(
      getRequest(
        `/api/proprietors?searchTerm=${encodeURIComponent(
          safeQuery,
        )}&page=${page}&pageSize=${effectivePageSize}`,
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

    dispatch({
      type: "FETCH_PROPRIETORS_SUCCEEDED",
      payload: { results, total },
      meta: {
        query: safeQuery,
        page: response.page || page,
        pageSize: response.pageSize || effectivePageSize,
      },
    });
  };
};

export const fetchProprietorPage = (page) => (dispatch, getState) => {
  const { search } = getState();

  if (search?.activeFilter !== "proprietor") return;

  const query = search?.resolvedQuery || search?.query || "";
  const pageSize =
    search?.resultCounts?.proprietors?.pageSize || DEFAULT_PROPRIETOR_PAGE_SIZE;

  dispatch(fetchProprietors(query, page, pageSize));
};

export const selectProprietorResult = (proprietor) => async (dispatch) => {
  const proprietorName =
    typeof proprietor === "string"
      ? proprietor
      : proprietor?.proprietorName || "";

  if (!proprietorName) return;

  dispatch({ type: "SET_ACTIVE", payload: "Ownership Search" });
  await dispatch(fetchRelatedProperties(proprietorName));
};

