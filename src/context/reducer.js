import {
  ERROR,
  USER,
  LOADING,
  PAGE_LOADING,
  SET_USER_ROOMS,
  SET_USER_FRIENDS,
  SET_CURRENT_ROOM,
  SET_CURRENT_ROOM_MESSAGES,
  SET_CURRENT_ROOM_USERS,
  SET_USER_INFO,
} from './action'

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ERROR:
      return { ...state, error: payload }

    case LOADING:
      return { ...state, auth_loading: payload }

    case PAGE_LOADING:
      return { ...state, page_loading: payload }

    case USER:
      return { ...state, user: payload }

    case SET_USER_INFO:
      return { ...state, user_info: { ...payload } }

    case SET_USER_ROOMS:
      return { ...state, user_rooms: payload }

    case SET_USER_FRIENDS:
      return { ...state, user_friends: payload }

    case SET_CURRENT_ROOM:
      return { ...state, currentRoom: { ...payload } }

    case SET_CURRENT_ROOM_MESSAGES:
      return {
        ...state,
        currentRoom: { ...state.currentRoom, messages: payload },
      }

    case SET_CURRENT_ROOM_USERS:
      return {
        ...state,
        currentRoom: { ...state.currentRoom, users: payload },
      }

    default:
      throw new Error('no matching action type')
  }
}

export default reducer
