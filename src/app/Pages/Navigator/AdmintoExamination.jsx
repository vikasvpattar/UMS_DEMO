import React from 'react'
import { useEffect } from 'react'
import { SESSION_AUTH } from '../../utils/sessionStorageContants'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../Router/routerConfig'

function AdmintoExamination() {

    const navigate = useNavigate()
    const redirect=()=>{
        const auth = sessionStorage.getItem(SESSION_AUTH)
        // window.location = 'https://exams.swaminarayanuniversity.ac.in/login/auth/'+auth
        window.open('https://exams.swaminarayanuniversity.ac.in/login/auth/'+auth, '_blank');

        navigate(ROUTES.Registar.dashboard)
        // window.location = 'http://localhost:3000/login/auth/'+auth
    }

    useEffect(()=>{
        redirect()
    },[])
  return (
    <div>
        <div className='p-5'>
            Redirecting............

        </div>
    </div>
  )
}

export default AdmintoExamination