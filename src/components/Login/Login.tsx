import React from 'react'
import cl from './Login.module.scss'
import { Form } from 'react-final-form'
import { RootState } from '../../store/store'
import { authLogin } from '../../store/action-creators/auth-ac'
import { connect, ConnectedProps } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
import { FieldWithValidation } from '../Common/FieldWithValidation/FieldWithValidation'
import { required, stringMaxLength } from '../../helpers/validation'
import { MyButton } from '../Common/MyButton/MyButton'

const Login: React.FC<PropsFromRedux> = (props) => {
  const submitHandler = async (values: { email: string; password: string }) => {
    props.authLogin(values)
  }

  return (
    <div className={cl.container}>
      <Form
        onSubmit={submitHandler}
        render={(props) => (
          <form className={cl.form} onSubmit={props.handleSubmit}>
            <div>
              <FieldWithValidation
                name={'Email'}
                type={'text'}
                placeholder={'login'}
                validators={[required, stringMaxLength(38)]}
                Element={'input'}
              />
              <FieldWithValidation
                name={'password'}
                type={'text'}
                placeholder={'Password'}
                validators={[required, stringMaxLength(38)]}
                Element={'input'}
              />
            </div>
            <div className={cl.button}>
              <MyButton callBack={() => {}} >Sign in</MyButton>
            </div>
          </form>
        )}
      />
    </div>
  )
}

const mapStateToProps = (state: RootState) => {
  return {
    isAuth: state.auth.isAuth,
  }
}

const actionCreators = {
  authLogin,
}

const connector = connect(mapStateToProps, actionCreators)
export type PropsFromRedux = ConnectedProps<typeof connector>
const LoginContainer = connector(Login)

export default LoginContainer
