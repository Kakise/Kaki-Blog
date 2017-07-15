import { FETCH_POSTS, FETCH_POST, FETCH_PAGE } from '../actions/index';

const INITIAL_STATE = { all: [], post: null, apge: null };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
  case FETCH_POSTS:
    return { ...state, all: action.payload };
  case FETCH_POST:
    return { ...state, post: action.payload };
  case FETCH_PAGE:
  	return { ...state, page: action.payload.items[0] };
  default:
    return state;
  }
}
