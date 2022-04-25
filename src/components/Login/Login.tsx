import React from 'react'
import cl from './Login.module.scss'
import { Form } from 'react-final-form'
import { RootState } from '../../store/store'
import { authLogin } from '../../store/action-creators/auth-ac'
import { connect, ConnectedProps } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { FieldWithValidation } from '../Common/FieldWithValidation/FieldWithValidation'
import { required, stringMaxLength } from '../../helpers/validation'
import { MyButton } from '../Common/MyButton/MyButton'
import { FormApi } from 'final-form'

export type LoginFormValuesType = { email: string; password: string }
export type LoginFormCallBackType = ((errors: Object | undefined) => void) | undefined

const Login: React.FC<PropsFromRedux> = (props) => {
  const submitHandler = async (
    values: LoginFormValuesType,
    form: FormApi<LoginFormValuesType>,
    callBack: LoginFormCallBackType
  ): Promise<void> => {
    await props.authLogin(values, callBack!)
  }

  return (
    <div className={cl.container}>
      {props.isAuth && <Navigate to="/profile"/>}
      <Form
        onSubmit={submitHandler}
        render={(props) => (
          <form className={cl.form} onSubmit={props.handleSubmit}>
            <div className={cl.fieldsCol}>
              <FieldWithValidation
                name={'email'}
                type={'text'}
                placeholder={'login'}
                validators={[required, stringMaxLength(38)]}
                Element={'input'}
              />
              <FieldWithValidation
                name={'password'}
                type={'password'}
                placeholder={'Password'}
                validators={[required, stringMaxLength(38)]}
                Element={'input'}
                />
            <div className={cl.error}>{props.submitError}</div>
            </div>
            <div className={cl.button}>
              <MyButton callBack={() => {}}>Sign in</MyButton>
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
    submissionError: state.auth.error
  }
}

const actionCreators = {
  authLogin,
}

const connector = connect(mapStateToProps, actionCreators)
export type PropsFromRedux = ConnectedProps<typeof connector>
const LoginContainer = connector(Login)

export default LoginContainer
