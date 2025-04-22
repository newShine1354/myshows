import React from 'react'
import { useForm } from 'react-hook-form'
import ErrorMessage from '../error-message/error-message.component'
import axios from 'axios'
import { useNavigate } from 'react-router'
import toast from 'react-hot-toast'

import { useUser } from '../../contexts/user.context';
import { commonRoute } from '../../../constants'

const Login = () => {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const navigate = useNavigate();
     const {user, login, } = useUser();
     console.log('user', user)
     if (user.isLoggedIn) {
        navigate("/")
      }
    const handleLogin = async (data) => {
        const user = await axios.post(`${commonRoute}/auth/login`, data)
        if (user.data.success) {
            login(user.data.user.email, user.data.user.username, user.data.token)
            toast.success('Account logged in successfully!')
            navigate("/")
        }
    }
    return (
        <div >
            <form className="border border-dark rounded-4" style={{
                padding: 40,
                width: 400,
                margin: 'auto',
                marginTop: 200
            }}>
                <h1 className="fs-2 fw-bold mb-3 text-center">Login</h1>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" className="form-control" id="email" name="email" {...register("email", {required: "Email is required"})} />
                    <ErrorMessage message={errors.name?.message} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name="password" {...register("password", {required:"Password is required"})} />
                    <ErrorMessage message={errors.email?.message} />
                </div>
                <button className="show-btn dark" onClick={handleSubmit(handleLogin)}>
                    Login
                </button>
            </form>

        </div>
    )
}

export default Login
