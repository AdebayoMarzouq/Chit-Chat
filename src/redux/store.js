import { action, createStore, thunk } from 'easy-peasy'
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import { toast } from 'react-toastify'
import { firestoreDB } from '../firebase/firebase'

export const notify = (type = toast, msg, time = 2000) => {
  /*function that creates a notification using react-toastify library*/
  type(msg, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: time,
    className: 'rounded-0 bg-light-maintint dark:bg-dark-mantint',
    bodyClassName: 'text-light-text dark:text-dark-text',
  })
}

export const store = createStore({
  // set up functionlity to add unread alerts when a user sends a Message
  // Use last updated feature to add message time when a user sends a Message
  user: null,
  addUserInfo: action((state, payload) => {
    state.user = payload
  }),
  addEditUserInfo: action((state, payload) => {
    state.user = { ...state.user, ...payload }
  }),
  saveUserToDB: thunk(async (actions, payload, helpers) => {
    const { user } = helpers.getState()
    const { uid, username, firstname, lastname, about } = user
    const userRef = doc(firestoreDB, `users/${uid}`)
    try {
      await updateDoc(userRef, {
        username: username,
        firstname: firstname,
        lastname: lastname,
        about: about,
      })
      notify(toast.success, 'Profile info changed successfully')
    } catch (error) {
      notify(toast.error, error.code)
    }
  }),
  createRoom: thunk(async (actions, payload, helpers) => {
    /*This thunk function creates a room document in firebase then extra calls are made to create a messages collection and users collection in the room also the roomID is added to the users list of rooms*/
    if (!payload) return
    const { user } = helpers.getState()
    try {
      // Create a document in firebase room collection
      const docRef = await addDoc(collection(firestoreDB, 'rooms'), {
        name: payload,
        creator: user.uid,
        settings: {},
        updated: serverTimestamp(),
      })
      const promises = [
        // adds first user or precisely the user that created the room to the room
        addDoc(collection(firestoreDB, `rooms/${docRef.id}/users`), {
          username: user.username,
          userID: user.uid,
          userProfile: user.profileUrl,
          role: 'Admin',
          created: new Date().toISOString(),
        }),
        setDoc(
          // add the room info to the list of rooms the user is in
          doc(firestoreDB, `users/${user.uid}/rooms/${docRef.id}`),
          {
            roomID: docRef.id,
            roomPath: docRef.path,
            roomName: payload,
            roomPic: Math.ceil(Math.random() * 6),
            roomInfo: '',
          }
        ),
      ]
      Promise.all(promises) // runs all promises
        .then((res) => {})
        .catch((error) => {})
      notify(toast.success, 'Room created Successfully')
    } catch (error) {
      notify(toast.error, 'An error occured while creating room')
    }
  }),
  joinRoom: thunk(async (actions, payload, helpers) => {
    /*This thunk to allow a user join a room using a group link which is technically a combination of paths to the room along with the room name*/
    if (!payload) return
    const { user } = helpers.getState()
    const [, roomID, name] = payload.split('/')
    try {
      // adds user to the room
      await addDoc(collection(firestoreDB, `rooms/${roomID}/users`), {
        username: user.username,
        userID: user.uid,
        role: 'Member',
      })
      await setDoc(
        // adds the room info to the list of rooms the user is in
        doc(firestoreDB, `users/${user.uid}/rooms/${roomID}`),
        {
          roomID: roomID,
          roomPath: `rooms/${roomID}`,
          roomName: name,
          roomPic: Math.ceil(Math.random() * 6),
          roomInfo: '',
        }
      )
      notify(toast.success, `Joined ${name} room`)
    } catch (error) {
      notify(toast.error, `An error occured while joining ${name}`)
    }
  }),
  sendMessage: thunk(async (actions, payload, helpers) => {
    /*Allows user send messages to a room or chat using the path to the room*/
    const { user } = helpers.getState()
    try {
      await addDoc(collection(firestoreDB, `${payload.path}/messages`), {
        message: payload.message,
        username: user.username,
        userID: user.uid,
        time: new Date().toISOString(),
        createdAt: serverTimestamp(),
      })
    } catch (error) {
      notify(toast.error, 'error.code')
    }
  }),
})
