import { FormApi } from 'final-form';
import React from 'react';
import { Form } from 'react-final-form';
import { connect, ConnectedProps } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { compose } from 'redux';
import { FieldWithValidation } from '../../components/common/FieldWithValidation/FieldWithValidation';
import MyButton from '../../components/common/MyButton/MyButton';
import { required, stringMaxLength } from '../../helpers/validators';
import { createAuthenticatedSessionThunk } from '../../redux/auth/thunks';
import { RootState } from '../../redux/store';
import cl from './LoginPage.module.scss';

/* ------------- Types ------------- */
export type LoginFormValuesType = { email: string; password: string };
export type LoginFormCallBackType = ((errors: Object | undefined) => void) | undefined;

type HandleSubmitType = (values: LoginFormValuesType, form: FormApi<LoginFormValuesType>, callBack: LoginFormCallBackType) => Promise<void>;

/* ------------- Component ------------- */
const Login: React.FC<LoginContainerProps> = ({ createAuthenticatedSessionThunk, isAuth }) => {
  const handleSubmit: HandleSubmitType = async (values, form, callBack) => await createAuthenticatedSessionThunk(values, callBack!);

  return (
    <div className={cl.container}>
      {isAuth && <Navigate to='/profile' />}
      <Form
        onSubmit={handleSubmit}
        render={({ handleSubmit, submitError }) => (
          <form className={cl.form} onSubmit={handleSubmit}>
            <div className={cl.fieldsCol}>
              <FieldWithValidation
                name={'email'}
                type={'text'}
                placeholder={'Login'}
                validators={[required, stringMaxLength(38)]}
                Element={'input'}
                className={cl.input}
              />
              <FieldWithValidation
                name={'password'}
                type={'password'}
                placeholder={'Password'}
                validators={[required, stringMaxLength(38)]}
                Element={'input'}
                className={cl.input}
              />
              <div className={cl.error}>{submitError}</div>
            </div>
            <div className={cl.button}>
              <MyButton callBack={() => {}}>Sign in</MyButton>
            </div>
          </form>
        )}
      />
    </div>
  );
};

/* ------------- Container ------------- */
const mapStateToProps = (state: RootState) => {
  return {
    isAuth: state.auth.user?.login,
  };
};

const actionCreators = {
  createAuthenticatedSessionThunk,
};

const connector = connect(mapStateToProps, actionCreators);
type LoginContainerProps = ConnectedProps<typeof connector>;

export default compose(connector)(Login);
