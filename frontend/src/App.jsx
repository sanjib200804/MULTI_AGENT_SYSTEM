import { signInWithPopup } from 'firebase/auth';
import React from 'react'
import { auth, googleProvider } from './config/firebase';

const App = () => {
  const googl = async()=>{
    const data = await signInWithPopup(auth,googleProvider)
    console.log(data)

  }
  return (
    <div className='justify-center items-center ' >
      <button className='h-20 w-40 bg-gray-700'
      onClick={googl}>continue with google</button>
    </div>
  )
}

export default App


