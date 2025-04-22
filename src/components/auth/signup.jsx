import React from 'react'
import { useForm } from 'react-hook-form'
import ErrorMessage from '../error-message/error-message.component'
import axios from 'axios'
import { useNavigate } from "react-router";
import toast from 'react-hot-toast';
import { useUser } from '@/contexts/user.context';
import { commonRoute } from '../../../constants';

const Signup = () => {
    const {user } = useUser();
         if (user.isLoggedIn) {
            navigate("/")
          }
    const { handleSubmit, register, formState: { errors } } = useForm();
    const navigate = useNavigate()
    const handleSignup = async (data) => {
        const user = await axios.post(`${commonRoute}/auth/signup`, data)
        if (user.data.success) {
            toast.success('Account created successfully!')
            navigate("/login")
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
                <h1 className="fs-2 fw-bold mb-3 text-center">Register</h1>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" id="username" name="username" {...register("username", {required: "Username is required"})} />
                    <ErrorMessage message={errors.username?.message} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" className="form-control" id="email" name="email" {...register("email", {required: "Username is required"})} />
                    <ErrorMessage message={errors.email?.message} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name="password" {...register("password", {required: "Username is required"})} />
                    <ErrorMessage message={errors.password?.message} />
                </div>
                <button className="show-btn dark" onClick={handleSubmit(handleSignup)}>
                    Register
                </button>
            </form>

        </div>
    )
}

export default Signup
