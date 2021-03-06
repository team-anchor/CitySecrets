export const ERROR = 'ERROR';
export const ERROR_CLEAR = 'ERROR_CLEAR';
export const LOAD_START = 'LOAD_START';
export const LOAD_END = 'LOAD_END';

export const getLoading = state => state.loading;
export const getError = state => state.error;

export function loading(state = false, { type }) {
  switch(type) {
    case LOAD_START:
      return true;
    case LOAD_END:
      return false;
    default:
      return state;
  }
}

export function error(state = null, { type, payload }) {
  switch(type) {
    case ERROR:
      return payload;
    case LOAD_START:
      return null;
    default:
      return state;
  }
}