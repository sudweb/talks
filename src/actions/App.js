export const HANDLE_ERROR = "HANDLE_ERROR";
export const FILTER_TALKS = "FILTER_TALKS";

export const handleError = message => ({
  type: HANDLE_ERROR,
  message: message
});

export const filterTalks = filter => ({
  type: FILTER_TALKS,
  filter: filter
});
