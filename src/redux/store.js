import { createStore, action, thunk, debug } from 'easy-peasy'
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
import { firestoreDB } from '../firebase/firebase'

export const store = createStore({
  user: null,
  addUserInfo: action((state, payload) => {
    state.user = payload
    console.log('rest ==>', debug(state))
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
      console.log('successfully updated')
      // errorNotify(toast.success, 'Profile info changed successfully')
    } catch (error) {
      console.log('user update error ===>', error.code, error.message)
      // errorNotify(toast.error, error.code)
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
        // creates the first message along with the user info
        // addDoc(collection(firestoreDB, `rooms/${docRef.id}/messages`), {
        //   message: 'Hello Room, I created this room',
        //   username: user.username,
        //   userID: user.userID,
        // }),
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
        .then((res) => {
          console.log(res)
        })
        .catch((error) => {
          console.log(error)
        })
      // errorNotify(toast.success, 'Room created Successfully')
    } catch (error) {
      console.log(error)
      // errorNotify(toast.error, 'An error occured while creating room')
    }
  }),
  joinRoom: thunk(async (actions, payload, helpers) => {
    /*This thunk creates a */
    if (!payload) return
    const { user } = helpers.getState()
    const [, roomID, name] = payload.split('/')
    console.log(roomID, ' ', name, ' ', payload)
    try {
      // adds first user or precisely the user that created the room to the room
      await addDoc(collection(firestoreDB, `rooms/${roomID}/users`), {
        username: user.username,
        userID: user.uid,
        role: 'Member',
      })
      await setDoc(
        // add the room info to the list of rooms the user is in
        doc(firestoreDB, `users/${user.uid}/rooms/${roomID}`),
        {
          roomID: roomID,
          roomPath: `rooms/${roomID}`,
          roomName: name,
          roomPic: Math.ceil(Math.random() * 6),
          roomInfo: '',
        }
      )
      // errorNotify(toast.success, `Joined ${name} room`)
    } catch (error) {
      console.log(error)
      // errorNotify(toast.error, `An error occured while joining ${name}`)
    }
  }),
  sendMessage: thunk(async (actions, payload, helpers) => {
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
      console.log(error)
    }
  }),
})
