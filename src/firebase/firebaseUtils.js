import { uuidv4 } from '@firebase/util'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore'
import { useEffect, useMemo, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import { auth, firestoreDB } from './firebase'

export const login = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
}

export const logout = () => {
  signOut(auth)
}

const checkCollection = async (subcollection) => {
  console.log('sub===>', subcollection)
  try {
    const subcollectionRef = query(
      collection(firestoreDB, subcollection),
      limit(1)
    )
    const snapShot = await getDocs(subcollectionRef)
    console.log('snapShot => ', snapShot)
    return snapShot.empty
  } catch (error) {
    console.log(error)
  }
  return null
}

export const useAddFriend = () => {
  const user = useStoreState((state) => state.user)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const addFriend = async (data) => {
    const refId = uuidv4()
    setLoading(true)
    try {
      // const check = await checkCollection(`users/${user.uid}/chats`)
      // if (!check) {
      //   const docRef = doc(
      //     firestoreDB,
      //     `users/${user.uid}/chats/${data.friendID}`
      //   )
      //   console.log(docRef)
      //   const docSnap = await getDocs(docRef)
      //   console.log(docSnap)
      //   if (!docSnap.exists()) {
      //     await setDoc(
      //       doc(firestoreDB, `users/${user.uid}/chats/${data.friendID}`),
      //       {
      //         ...data,
      //         chatID: refId,
      //       }
      //     )
      //     await setDoc(
      //       doc(firestoreDB, `users/${data.friendID}/chats/${user.uid}`),
      //       {
      //         ...data,
      //         chatID: refId,
      //         friendID: user.uid,
      //       }
      //     )
      //     await setDoc(doc(firestoreDB, `chats/${refId}/`), {
      //       chatID: refId,
      //       creatorID: user.uid,
      //       friendID: data.friendID,
      //       settings: {},
      //       created: new Date().toISOString(),
      //     })
      //   }
      // }
      const docRef1 = doc(
        firestoreDB,
        `users/${user.uid}/friends/${data.friendID}`
      )
      const docRef2 = doc(
        firestoreDB,
        `users/${data.friendID}/friends/${user.uid}`
      )
      const docSnap1 = await getDoc(docRef1)
      const docSnap2 = await getDoc(docRef2)
      console.log(docSnap1.exists(), docSnap2.exists())
      if (!docSnap1.exists() && !docSnap2.exists()) {
        await setDoc(doc(firestoreDB, `chats/${refId}`), {
          creator: user.uid,
          chatID: refId,
          people: {
            [user.uid]: {
              username: user.username,
              uid: user.userID,
              photoUrl: user.photoUrl || user.profileUrl,
              about: user.about,
            },
            [data.friendID]: {
              username: data.username,
              uid: data.friendID,
              photoUrl: data.photoUrl,
              about: data.about,
            },
          },
          settings: {},
          updated: serverTimestamp(),
        })
        await setDoc(
          doc(firestoreDB, `users/${user.uid}/friends/${data.friendID}`),
          data
        )
        await setDoc(doc(firestoreDB, `users/${user.uid}/chats/${refId}`), {
          chatID: refId,
          friendID: data.friendID,
          friendData: data,
        })
        await setDoc(
          doc(firestoreDB, `users/${data.friendID}/chats/${refId}`),
          {
            chatID: refId,
            friendID: user.uid,
            friendData: {
              username: user.username,
              uid: user.userID,
              photoUrl: user.photoUrl || user.profileUrl,
              about: user.about,
            },
          }
        )
      } else if (docSnap2.exists()) {
        await setDoc(
          doc(firestoreDB, `users/${user.uid}/friends/${data.friendID}`),
          data
        )
      }
      // await setDoc(
      //   doc(firestoreDB, `users/${user.uid}/friends/${data.friendID}`),
      //   { ...data, chatID: refId }
      // )

      setSuccess(true)
      // errorNotify(toast.success, `You and ${data.username} are now friends`)
    } catch (error) {
      console.log(error)
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  return { addFriend, success, loading, error }
}

export const useMyAuthState = () => {
  const navigate = useNavigate()
  const [value] = useAuthState(auth)
  const addUserInfo = useStoreActions((actions) => actions.addUserInfo)
  const [regUser, setRegUser] = useState(null)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let listener = () => {}
    if (value) {
      listener = onSnapshot(
        doc(firestoreDB, `users/${value.uid}`),
        (userDoc) => {
          if (userDoc.exists()) {
            const userData = {
              uid: value.uid,
              email: value.email,
              photoUrl: value.photoURL,
              ...userDoc.data(),
            }
            addUserInfo(userData)
            setRegUser(true)
            navigate('/')
          } else {
            navigate('/login')
            console.log('Could not fetch your info ===> ')
          }
        },
        (error) => {
          console.log('triggered', error)
          setError(true)
          // errorNotify(toast.error, error.code)
        }
      )
    } else {
      addUserInfo(null)
      navigate('/login')
    }
    return () => {
      listener()
    }
    // eslint-disable-next-line
  }, [value])

  const resArray = [regUser, loading, error]
  return useMemo(() => resArray, resArray)
}
