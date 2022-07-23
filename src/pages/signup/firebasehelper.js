import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { adjectives, names, uniqueNamesGenerator } from 'unique-names-generator'
import { auth, firestoreDB } from '../../firebase/firebase'

export const useCreateUserInFirestore = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [regUser, setRegUser] = useState({})

  const storeUser = async (_email, password) => {
    setLoading(true)
    setError(undefined)
    try {
      const res = await createUserWithEmailAndPassword(auth, _email, password) // Firebase function to trigger user sign up with email and password
      const { uid, email, photoURL } = res.user
      const shortName = uniqueNamesGenerator({
        dictionaries: [adjectives, names], // colors can be omitted here as not used
        length: 2,
        separator: '-',
      })
      // db
      // sets destructured user info into firestore db
      let data = {
        // Use a merge or overwrite when user edits profile so that no info goes missing
        userID: uid,
        email: email,
        username: shortName,
        firstname: 'Human',
        lastname: 'Doe',
        about: '',
        preferences: {},
        profileUrl: photoURL ? photoURL : `${Math.ceil(Math.random() * 6)}`,
        created: new Date().toISOString(),
      }
      await setDoc(doc(firestoreDB, 'users', uid), data)
      setRegUser(res.user)
      navigate('/')
      setLoading(false)
    } catch (error) {
      console.log('Sign UP =>> ', error.code)
      setError(true)
      setLoading(false)
    }
  }

  const resArray = [storeUser, regUser, loading, error]

  return useMemo(() => resArray, resArray)
}
