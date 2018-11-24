import {
  SET_THINKING,
} from '../actions';

const thinking = (state = false, action) => {
  switch (action.type) {
    case SET_THINKING:
      return action.thinking;
    default:
      return state;
  }
}

export default thinking;
