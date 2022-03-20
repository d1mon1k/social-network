import React from 'react'
import cl from './Login.module.scss'
import { Field, Form } from 'react-final-form'
import { RootState } from '../../store/store'
import { authLogin } from '../../store/action-creators/auth-ac'
import { connect, ConnectedProps } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Login: React.FC<PropsFromRedux> = (props) => {
  const navigate = useNavigate()

  const submitHandler = async (values: { email: string; password: string }) => {
    props.authLogin(values).then(() => {
      if(props.isAuth) {
        navigate('../profile')
      }
    })
  }

  return (
    <>
      <h1 className={cl.login}>Login</h1>
      <Form
        onSubmit={submitHandler}
        render={(props) => (
          <form onSubmit={props.handleSubmit}>
            <Field
              name="email"
              component="input"
              type="text"
              placeholder="email"
            />
            <Field
              name="password"
              component="input"
              type="text"
              placeholder="password"
            />
            <Field name="rememberMe" component="input" type="checkbox" />
            <Field name="submit" component="input" type="submit" />
          </form>
        )}
      />
    </>
  )
}

const mapStateToProps = (state: RootState) => {
  return {
    isAuth: state.auth.isAuth
  }
}

const actionCreators = {
  authLogin,
}

const connector = connect(mapStateToProps, actionCreators)
export type PropsFromRedux = ConnectedProps<typeof connector>
const LoginContainer = connector(Login)

export default LoginContainer
