/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { Signin } from '../../../assets'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLoginActions } from './actions/creators'

const Login = ({ history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const selectedData = useSelector((data) => data.domain.info)
  const { userInfo, error, loading } = selectedData

  useEffect(() => {
    if (userInfo && userInfo != {} && userInfo.user_name) {
      history.push('/dashboard/library')
    }
  }, [userInfo])

  const onSubmitHandler = (e) => {
    e.preventDefault()
    dispatch(userLoginActions({ email, password }))
  }

  return (
    <div className="login-container center">
      <div className="login-wrapper">
        <div className="login-left">
          <div className="login-left-top">
            <div className="login-left-top-text">
              <h1>TEKRARDAN HOŞGELDİN</h1>
              <p>
                Henüz hesabın bulunmuyorsa, <Link to="/register">Üye ol!</Link>
              </p>
            </div>
          </div>
          {error && <h3>{error}</h3>}
          <div className="login-left-mid">
            <form onSubmit={onSubmitHandler} className="login-left-mid-form">
              <label>Email</label>
              <input
                type="text"
                placeholder="osmanabi@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Şifre</label>
              <input
                type="password"
                placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="btn-lg submit-data" type="submit">
                Giriş Yap
              </button>
            </form>
            <div className="login-left-mid-reset">
              <Link to="/reset-password">Şifreni mi unuttun?</Link>
            </div>
          </div>
          <div className="login-left-bot"></div>
        </div>
        <div className="login-right">
          <img src={Signin} />
        </div>
      </div>
    </div>
  )
}
export default Login
