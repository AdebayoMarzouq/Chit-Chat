import React, { useContext, useReducer, useEffect, useCallback } from 'react'

import { ToastContainer, toast, Zoom } from 'react-toastify'
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import {
  collection,
  addDoc,
  doc,
  setDoc,
  getDocs,
  updateDoc,
  arrayUnion,
  arrayRemove,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  limit,
  collectionGroup,
  where,
} from 'firebase/firestore'

import { uniqueNamesGenerator, adjectives, names } from 'unique-names-generator'

import { useNavigate } from 'react-router-dom'

import { auth, firestoreDB } from './firebase/firebaseutil'
import reducer from './reducer'
import {
  LOADING,
  PAGE_LOADING,
  ERROR,
  USER,
  SET_ROOM,
  SET_ROOM_INFO,
  SET_ROOM_MESSAGES,
  SET_ROOM_USERS,
  SET_USER_INFO,
} from './action'

const AppContext = React.createContext()

const initialState = {
  error: { show: false, msg: '' },
  loading: false,
  page_loading: true,
  user: {},
  rooms: [],
  currentRoom: {},
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
        const { uid, photoURL } = res.user
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
            username: shortName,
            firstname: 'Human',
            lastname: 'Doe',
            about: '',
            preferences: {},
            profileUrl: photoURL ? photoURL : `${Math.ceil(Math.random() * 6)}`,
          }),
          // initialized room subcollection in user document
          addDoc(collection(firestoreDB, `users/${uid}/rooms`), {
            roomID: '',
            roomPath: '',
            roomName: 'ChitChat Bot',
            roomSettings: {},
          }),
          // initialized friends subcollection in user document
          addDoc(collection(firestoreDB, `users/${uid}/friends`), {
            name: '',
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
      onSnapshot(doc(firestoreDB, `users/${userID}`), (userDoc) => {
        console.log(userID, userDoc.data())
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
      }),
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
          username: state.user.username,
          userID: state.user.userID,
        }),
        // adds first user or precisely the user that created the room to the room
        addDoc(collection(firestoreDB, `rooms/${docRef.id}/users`), {
          username: state.user.username,
          userID: state.user.userID,
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

  const getRooms = useCallback(() => {
    return onSnapshot(
      collection(firestoreDB, `users/${state.user.userID}/rooms`),
      (roomSnapshot) => {
        const rooms = []
        console.log(rooms)
        roomSnapshot.forEach((doc) => {
          const { roomName, roomPath, roomID } = doc.data()
          rooms.push({ roomName, roomPath, roomID })
        })
        dispatch({ type: SET_ROOM, payload: rooms })
      }
    )
  }, [state.user.userID])

  const joinRoom = async (roomPath) => {
    const [, roomID, name] = roomPath.split('/')
    console.log(roomID, ' ', name, ' ', roomPath)
    try {
      // adds first user or precisely the user that created the room to the room
      await addDoc(collection(firestoreDB, `rooms/${roomID}/users`), {
        username: state.user.username || state.user.email,
        userID: state.user.userID,
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
      // Get all users in a room and listens for change in room info
      onSnapshot(doc(firestoreDB, `rooms/${roomID}`), (roomDoc) => {
        dispatch({ type: SET_ROOM_INFO, payload: roomDoc.data() })
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
          dispatch({ type: SET_ROOM_USERS, payload: users })
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
          dispatch({ type: SET_ROOM_MESSAGES, payload: messages.reverse() })
          // const { userID, username } = messages[messages.length - 1]
          // if (userID !== state.user.userID) {
          //   errorNotify(
          //     toast.info,
          //     `new message from ${username || 'john doe'}`,
          //     1000
          //   )
          // }
        }
      ),
    []
  )

  // Everything about chats here

  const sendMessage = async (roomID, message) => {
    try {
      await addDoc(collection(firestoreDB, `rooms/${roomID}/messages`), {
        message: message,
        username: state.user.username || state.user.email,
        userID: state.user.userID,
        time: new Date().toISOString(),
        createdAt: serverTimestamp(),
      })
    } catch (error) {
      console.log(error)
    }
  }

  // Freind and unFriend
  const addFriend = () => {}

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
  }, [getUserInfo])

  useEffect(() => {
    if (!state.user.userID) return
    const unsubscribe = getUserInfo(state.user.userID)
    return () => {
      unsubscribe()
    }
  }, [getUserInfo, state.user.userID])

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
        editUserInfo,
        createRoom,
        joinRoom,
        getRooms,
        getRoomInfo,
        getRoomMessages,
        getRoomUsers,
        sendMessage,
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
