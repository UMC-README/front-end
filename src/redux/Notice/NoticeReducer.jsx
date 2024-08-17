import {
  SET_SHOW_DIVS,
  SET_FLIPPED,
  SET_ISROTATED,
  SET_SUBMITSTATE,
  SET_NOTICEROOMTITLE,
} from './NoticeActions';

const initialState = {
  showDivs: false,
  isFlipped: false,
  isRotated: true,
  submitState: '',
  noticeRoomTitle: '',
};

const NoticeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SHOW_DIVS:
      return { ...state, showDivs: action.payload };
    case SET_FLIPPED:
      return { ...state, isFlipped: action.payload };
    case SET_ISROTATED:
      return { ...state, isRotated: action.payload };
    case SET_SUBMITSTATE:
      return { ...state, submitState: action.payload };
    case SET_NOTICEROOMTITLE:
      return { ...state, noticeRoomTitle: action.payload };
    default:
      return state;
  }
};

export default NoticeReducer;
