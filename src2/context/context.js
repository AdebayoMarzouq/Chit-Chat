import React, { useCallback, useContext, useEffect, useReducer } from 'react'

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import {
  addDoc,
  collection,
  doc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import { toast, ToastContainer, Zoom } from 'react-toastify'

import { adjectives, names, uniqueNamesGenerator } from 'unique-names-generator'

import { useNavigate } from 'react-router-dom'

import {
  ERROR,
  LOADING,
  PAGE_LOADING,
  SET_CURRENT_CHAT,
  SET_CURRENT_CHAT_FRIEND,
  SET_CURRENT_CHAT_MESSAGES,
  SET_CURRENT_ROOM,
  SET_CURRENT_ROOM_MESSAGES,
  SET_CURRENT_ROOM_USERS,
  SET_USER_FRIENDS,
  SET_USER_INFO,
  SET_USER_ROOMS,
  USER,
} from './action'
import { auth, firestoreDB } from './firebase/firebaseutil'
import reducer from './reducer'

const AppContext = React.createContext()

const initialState = {
  error: { show: false, msg: '' },
  auth_loading: false,
  page_loading: true,
  user: {},
  user_info: {},
  user_rooms: [],
  user_friends: [],
  user_currentRoom: {},
  user_currentChat: {},
}

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const navigate = useNavigate()

  const authenticateUser = async (type = 'login', _email, password) => {
    /*Handles user authentication
    1. dipatches error and loading states
    2. handles user sign in and sign up depending on passed parameters
    3. saves authenticated user to firestore database
    4. creates rooms and friends subcollections in user collection in db
    5. dispatches errors and eroor notifications as they come
    */
    dispatch({ type: ERROR, payload: { show: false, msg: '' } }) // dispatches error and sets it to false
    dispatch({ type: LOADING, payload: true }) // displays a loading screen while authentication is ongoing
    try {
      if (type === 'login') {
        await signInWithEmailAndPassword(auth, _email, password) // Firebase function to trigger user sing in with email and password
        errorNotify(toast.success, 'Sign in successful')
      } else if (type === 'signup') {
        const res = await createUserWithEmailAndPassword(auth, _email, password) // Firebase function to trigger user sign up with email and passowrd
        const { uid, email, photoURL } = res.user
        const userRef = doc(firestoreDB, `users/${uid}`) // creates reference to user document in firestore
        const shortName = uniqueNamesGenerator({
          dictionaries: [adjectives, names], // colors can be omitted here as not used
          length: 2,
          separator: '-',
        })
        // db
        const promises = [
          // sets destructured user info into firestore db
          setDoc(userRef, {
            userID: uid,
            email: email,
            username: shortName,
            firstname: 'Human',
            lastname: 'Doe',
            about: '',
            preferences: {},
            profileUrl: photoURL ? photoURL : `${Math.ceil(Math.random() * 6)}`,
          }),
          // initialized room subcollection in user document
          addDoc(collection(firestoreDB, `users/${uid}/rooms`), {
            // roomID: '',
            // roomPath: '',
            // roomName: 'ChitChat Bot',
            // roomSettings: {},
          }),
          // initialized friends subcollection in user document
          addDoc(collection(firestoreDB, `users/${uid}/friends`), {
            // name: '',
          }),
        ]
        Promise.all(promises)
          .then((res) => console.log(res))
          .catch((error) => console.log(error))
        errorNotify(toast.success, 'Sign up successsful') // Notifies user of successful login or sign up
      }
      navigate('/')
    } catch (error) {
      dispatch({ type: ERROR, payload: { show: true, msg: error.code } })
      errorNotify(toast.error, error.code) // Error notification
      console.log(error.code, error.message)
    }
    dispatch({ type: LOADING, payload: false })
  }

  const signout = async () => {
    try {
      await signOut(auth)
      errorNotify(toast.success, 'Sign out successful')
    } catch (error) {
      console.log(error)
      errorNotify(toast.error, 'Sign out failed')
    }
  }

  function errorNotify(type = toast, msg, time = 2000) {
    /*function that creates a notification using react-toastify library*/
    type(msg, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: time,
      className: 'rounded-0 bg-light-maintint',
      bodyClassName: 'text-light-text',
    })
  }
  // User info
  const getUserInfo = useCallback(
    (userID) =>
      // Gets user info and listens for change in user info
      onSnapshot(
        doc(firestoreDB, `users/${userID}`),
        (userDoc) => {
          if (userDoc.exists()) {
            const {
              firstname,
              lastname,
              preferences,
              about,
              profileUrl,
              username,
            } = userDoc.data()
            dispatch({
              type: SET_USER_INFO,
              payload: {
                firstname,
                lastname,
                preferences,
                about,
                profileUrl,
                username,
              },
            })
          } else {
            throw new Error('Could not fetch your info')
          }
        },
        (error) => {
          console.log('triggered', error)
          errorNotify(toast.error, error.code)
        }
      ),
    []
  )

  const editUserInfo = async (userInfo) => {
    const userRef = doc(firestoreDB, `users/${state.user.userID}`)
    try {
      await updateDoc(userRef, userInfo)
      errorNotify(toast.success, 'Profile info changed successfully')
    } catch (error) {
      console.log(error.code, error.message)
      errorNotify(toast.error, error.code)
    }
  }

  // Everything about room here
  const createRoom = async (roomName) => {
    /*This function creates a room document in firebase then extra calls are made to create a messages collection and users collection in the room also the roomID is added to the users list of rooms*/
    if (!roomName) return
    try {
      // Create a document in firebase room collection
      const docRef = await addDoc(collection(firestoreDB, 'rooms'), {
        name: roomName,
        creator: state.user.userID,
        settings: {},
        updated: serverTimestamp(),
      })
      const promises = [
        // creates the first message along with the user info
        addDoc(collection(firestoreDB, `rooms/${docRef.id}/messages`), {
          message: 'Hello Room, I created this room',
          username: state.user_info.username,
          userID: state.user.userID,
        }),
        // adds first user or precisely the user that created the room to the room
        addDoc(collection(firestoreDB, `rooms/${docRef.id}/users`), {
          username: state.user_info.username,
          userID: state.user.userID,
          role: 'Admin',
        }),
        setDoc(
          // add the room info to the list of rooms the user is in
          doc(firestoreDB, `users/${state.user.userID}/rooms/${docRef.id}`),
          {
            roomID: docRef.id,
            roomPath: docRef.path,
            roomName: roomName,
          }
        ),
      ]
      Promise.all(promises) // runs all promises
        .then((res) => {
          console.log(res)
        })
        .catch((error) => {
          console.log(error)
        })
      errorNotify(toast.success, 'Room created Successfully')
    } catch (error) {
      console.log(error)
      errorNotify(toast.error, 'An error occured while creating room')
    }
  }

  const getRooms = useCallback(
    (setRoomStatus) => {
      return onSnapshot(
        collection(firestoreDB, `users/${state.user.userID}/rooms`),
        (roomSnapshot) => {
          console.log(roomSnapshot)
          if (!roomSnapshot.empty) {
            console.log(roomSnapshot.size)
            const rooms = []
            roomSnapshot.forEach((doc) => {
              console.log(doc.data())
              const { roomName, roomPath, roomID } = doc.data()
              rooms.push({ roomName, roomPath, roomID })
            })

            setRoomStatus({ loading: false, error: false })
            dispatch({ type: SET_USER_ROOMS, payload: rooms })
          } else {
            setRoomStatus({ loading: false, error: true })
          }
        },
        (err) => {
          setRoomStatus({ loading: false, error: true })
        }
      )
    },
    [state.user.userID]
  )

  const joinRoom = async (roomPath) => {
    const [, roomID, name] = roomPath.split('/')
    console.log(roomID, ' ', name, ' ', roomPath)
    try {
      // adds first user or precisely the user that created the room to the room
      await addDoc(collection(firestoreDB, `rooms/${roomID}/users`), {
        username: state.user_info.username,
        userID: state.user.userID,
        role: 'Member',
      })
      await setDoc(
        // add the room info to the list of rooms the user is in
        doc(firestoreDB, `users/${state.user.userID}/rooms/${roomID}`),
        {
          roomID: roomID,
          roomPath: `rooms/${roomID}`,
          roomName: name,
        }
      )
      errorNotify(toast.success, `Joined ${name} room`)
    } catch (error) {
      console.log(error)
      errorNotify(toast.error, `An error occured while joining ${name}`)
    }
  }

  const deleteRoom = () => {}

  const LeaveRoom = () => {}

  const removeUser = () => {}

  const getRoomInfo = useCallback(
    (roomID) =>
      // Get room info
      onSnapshot(doc(firestoreDB, `rooms/${roomID}`), (roomDoc) => {
        dispatch({ type: SET_CURRENT_ROOM, payload: roomDoc.data() })
      }),
    []
  )

  const getRoomUsers = useCallback(
    (roomID) =>
      // Get all users in a room and listens for user addition or removal
      onSnapshot(
        collection(firestoreDB, `rooms/${roomID}/users`),
        (roomSnapshot) => {
          let users = []
          roomSnapshot.forEach((doc) => {
            const { userID, username } = doc.data()
            users.push({ userID, username })
          })
          dispatch({ type: SET_CURRENT_ROOM_USERS, payload: users })
        }
      ),
    []
  )

  const getRoomMessages = useCallback(
    (roomID) =>
      // Get all room messages and listens for new or deleted messages
      onSnapshot(
        query(
          collection(firestoreDB, `rooms/${roomID}/messages`),
          orderBy('createdAt', 'desc'),
          limit(25)
        ),
        (roomSnapshot) => {
          let messages = []
          roomSnapshot.forEach((doc) => {
            const { message, userID, username, time } = doc.data()
            messages.push({ userID, message, username, time })
          })
          dispatch({
            type: SET_CURRENT_ROOM_MESSAGES,
            payload: messages.reverse(),
          })
        }
      ),
    []
  )

  // Everything about chats here
  const getChatInfo = useCallback(
    (friendID) =>
      // get chat info and all messaes in one call
      onSnapshot(doc(firestoreDB, `chats/${friendID}`), (chatDoc) => {
        dispatch({ type: SET_CURRENT_CHAT, payload: chatDoc.data() })
      }),
    []
  )

  const getChatMessages = useCallback(
    (friendID) =>
      onSnapshot(
        query(
          collection(firestoreDB, `chats/${friendID}/messages`),
          orderBy('createdAt', 'desc'),
          limit(25)
        ),
        (chatSnapshot) => {
          let messages = []
          chatSnapshot.forEach((doc) => {
            const { message, userID, username, time } = doc.data()
            messages.push({ userID, message, username, time })
          })
          dispatch({
            type: SET_CURRENT_CHAT_MESSAGES,
            payload: messages.reverse(),
          })
        }
      ),
    []
  )

  const getFriendInfo = useCallback(
    (friendID) =>
      // get chat info and all messaes in one call
      onSnapshot(doc(firestoreDB, `users/${friendID}`), (friendDoc) => {
        dispatch({ type: SET_CURRENT_CHAT_FRIEND, payload: friendDoc.data() })
      }),
    []
  )

  // Send Message
  const sendMessage = async (roomID, message) => {
    try {
      await addDoc(collection(firestoreDB, `rooms/${roomID}/messages`), {
        message: message,
        username: state.user_info.username,
        userID: state.user.userID,
        time: new Date().toISOString(),
        createdAt: serverTimestamp(),
      })
    } catch (error) {
      console.log(error)
    }
  }

  // Send Message
  const sendChatMessage = async (friendID, message) => {
    try {
      await addDoc(collection(firestoreDB, `chats/${friendID}/messages`), {
        message: message,
        username: state.user_info.username,
        userID: state.user.userID,
        time: new Date().toISOString(),
        createdAt: serverTimestamp(),
      })
    } catch (error) {
      console.log(error)
    }
  }

  // Friend and unFriend
  const getAllUsers = useCallback(async (userID) => {
    let loading
    let error = false
    let users = []
    const userSnapshot = await getDocs(collection(firestoreDB, 'users'))
    if (userSnapshot.empty) {
      error = true
    } else {
      userSnapshot.forEach((user) => {
        const userData = user.data()
        if (userData.userID !== userID) {
          users.push(user.data())
        }
      })
    }
    if (!users.length) {
      error = true
    }
    loading = false
    return { loading, error, users }
    // eslint-disable-next-line
  }, [])

  const getUserFriends = useCallback(
    (setChatStatus) => {
      return onSnapshot(
        collection(firestoreDB, `users/${state.user.userID}/friends`),
        (friendSnapshot) => {
          if (!friendSnapshot.empty) {
            const friends = []
            friendSnapshot.forEach((doc) => {
              console.log(doc.data())
              friends.push(doc.data())
            })
            setChatStatus({ loading: false, error: false })
            dispatch({ type: SET_USER_FRIENDS, payload: friends })
          } else {
            setChatStatus({ loading: false, error: true })
          }
        },
        (err) => {
          setChatStatus({ loading: false, error: true })
        }
      )
    },
    [state.user.userID]
  )

  // // Promise to fetch all users
  // const getAppUsers = async () => {
  //   // return new Promise((resolve) => {
  //   //   const userSnapshot = getDocs(collection(firestoreDB, 'user'))
  //   //   resolve(userSnapshot)
  //   // })
  //   return getDocs(collection(firestoreDB, 'users'))
  // }

  const addFriend = async (data) => {
    let loading, error, success
    try {
      await setDoc(
        doc(firestoreDB, `users/${state.user.userID}/friends/${data.friendID}`),
        data
      )
      await setDoc(doc(firestoreDB, `chats/${data.friendID}/`), {
        friendID: data.friendID,
        settings: {},
      })
      // creates the first message along with the user info
      addDoc(collection(firestoreDB, `chats/${data.friendID}/messages`), {
        message: 'Hello, I just added you',
        username: state.user_info.username,
        userID: state.user.userID,
      })
      success = true
      errorNotify(toast.success, `You and ${data.username} are now friends`)
    } catch (err) {
      error = true
      errorNotify(toast.error, `Unable to friend ${data.username}, try again`)
    }
    loading = false
    return { loading, error, success }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({
          type: USER,
          payload: { email: user.email, userID: user.uid },
        })
        console.log('user signed in', user.username)
      } else {
        dispatch({ type: USER, payload: {} })
        console.log('user is signed out')
      }
      dispatch({ type: PAGE_LOADING, payload: false })
    })
    return () => {
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (!state.user.userID) return
    const unsubscribe = getUserInfo(state.user.userID)
    return () => {
      unsubscribe()
    }
  }, [getUserInfo, state.user.userID])

  // let user = suspend(getInitialAuthState, ['initialAuthState'])
  // if (user) {
  //   console.log(user)
  //   dispatch({
  //     type: USER,
  //     payload: { email: user.email, userID: user.uid },
  //   })
  // } else {
  //   console.log(user)
  //   dispatch({ type: USER, payload: null })
  // }

  return (
    <AppContext.Provider
      value={{
        ...state,
        dispatch,
        errorNotify,
        auth,
        authenticateUser,
        signout,
        getUserInfo,
        getUserFriends,
        editUserInfo,
        getAllUsers,
        addFriend,
        createRoom,
        joinRoom,
        getRooms,
        getRoomInfo,
        getRoomMessages,
        getRoomUsers,
        getChatInfo,
        getChatMessages,
        getFriendInfo,
        sendMessage,
        sendChatMessage,
      }}
    >
      {state.page_loading ? (
        <div className='page-loading'></div>
      ) : (
        <>
          {children}
          <ToastContainer
            className='bg-transparent'
            autoClose={2000}
            hideProgressBar
            limit={1}
            transition={Zoom}
            draggablePercent={60}
          />
        </>
      )}
    </AppContext.Provider>
  )
}

const useAppContext = () => useContext(AppContext)

export { AppProvider, useAppContext }
