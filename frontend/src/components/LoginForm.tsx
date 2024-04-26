import { api } from '@/lib/api'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from 'zustand'



const LoginForm = () => {
  const navigate = useNavigate()

  const {user, loadCurentUserData} = useStore()
  const [error, setError] = useState(false)

  const sendFormData = async (event) => {
    event.prevent.Default()
    const form = event.target
    const inputData = new FormData(form)

    try {
      await api.post("auth/login", {
        body: inputData,
        credentials: "include"
      })

      const userData = await loadCurentUserData()
      navigate("/")

    } catch(err){
      setError(true)
    }
  }
  return (
    <div>LoginForm</div>
  )
}

export default LoginForm