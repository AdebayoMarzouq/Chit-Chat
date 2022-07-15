import {
  LOADING,
  ERROR,
  USER,
  PAGE_LOADING,
  SET_ROOM,
  SET_ROOM_INFO,
  SET_ROOM_MESSAGES,
  SET_ROOM_USERS,
  SET_USER_INFO,
} from './action'

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ERROR:
      return { ...state, error: payload }

    case LOADING:
      return { ...state, loading: payload }

    case PAGE_LOADING:
      return { ...state, page_loading: payload }

    case USER:
      return { ...state, user: payload }

    case SET_USER_INFO:
      return { ...state, user: { ...state.user, ...payload } }

    case SET_ROOM:
      return { ...state, rooms: payload }

    case SET_ROOM_INFO:
      return { ...state, currentRoom: { ...payload } }

    case SET_ROOM_MESSAGES:
      return {
        ...state,
        currentRoom: { ...state.currentRoom, messages: payload },
      }

    case SET_ROOM_USERS:
      return {
        ...state,
        currentRoom: { ...state.currentRoom, users: payload },
      }

    default:
      throw new Error('no matching action type')
  }
}

export default reducer
