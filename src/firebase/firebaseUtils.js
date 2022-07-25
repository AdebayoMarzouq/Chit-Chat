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
import { toast } from 'react-toastify'

import { useUserContext } from '../context'
import { notify } from '../redux/store'

export const login = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
}

export const logout = () => {
  signOut(auth)
}

export const useAddFriend = () => {
  const { notify } = useUserContext()
  const user = useStoreState((state) => state.user)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const addFriend = async (data) => {
    const refId = uuidv4()
    setLoading(true)
    try {
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
      setSuccess(true)
      notify(toast.success, `You are now friends with ${data.username}`)
    } catch (error) {
      console.log(error)
      setError(true)
      notify(toast.error, `An error occured while adding ${data.username}`)
    } finally {
      setLoading(false)
    }
  }

  return { addFriend, success, loading, error }
}

export const useMyAuthState = () => {
  const navigate = useNavigate()
  const [authvalue, authloading, autherror] = useAuthState(auth)
  const addUserInfo = useStoreActions((actions) => actions.addUserInfo)
  const [regUser, setRegUser] = useState(null)
  const [status, setStatus] = useState({ loading: false, error: false })

  useEffect(() => {
    let listener = () => {}
    if (autherror) {
      setStatus((prev) => {
        return { ...prev, loading: false, error: true }
      })
    }
    if (authvalue) {
      listener = onSnapshot(
        doc(firestoreDB, `users/${authvalue.uid}`),
        (userDoc) => {
          if (userDoc.exists()) {
            const userData = {
              uid: authvalue.uid,
              email: authvalue.email,
              photoUrl: authvalue.photoURL,
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
          setStatus((prev) => {
            return { ...prev, loading: false, error: true }
          })
          notify(toast.error, error.code)
        }
      )
    } else {
      addUserInfo(null)
      setStatus((prev) => {
        return { ...prev, loading: false }
      })
      navigate('/login')
    }

    return () => {
      listener() // unsubscribe from listener
    }
    // eslint-disable-next-line
  }, [authvalue, autherror])

  const resArray = [regUser, autherror, status, setStatus]
  return useMemo(() => resArray, resArray)
}
