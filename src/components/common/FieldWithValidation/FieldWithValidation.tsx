import { Field } from "react-final-form"
import cl from './FieldWithValidation.module.scss'

interface Props {
  name: string
  placeholder?: string
  type: string
  validators: any[]
  Element: 'input' | 'textarea'
  defaultValue?: string 
  className?: string
}

export const FieldWithValidation: React.FC<Props> = ({
  name,
  Element,
  validators, 
  className,
  defaultValue,
  ...props 
}) => {
  const composeValidators = ([...validators]: any[]) => (value: any) => validators.reduce((error, validator) => {
    return error || validator(value)
  }, undefined)
  return (
    <Field name={name} initialValue={defaultValue} validate={composeValidators(validators)} {...props} render={
      ({input, meta}) => {
        const error = meta.touched && meta.error && !meta.active ? true : false
        return (
          <div className={cl.field}>
            {props.type === 'checkbox' ? (
              <div className={cl.checkboxWrapper}>
                <label className={cl.checkboxContainer}>
                  <Element {...input} {...props} className={[cl.checkbox, error && cl.required].join(' ')} />
                  <span className={cl.checkMark}></span>
                </label>
              </div>
            ) : (
              <Element {...input} {...props} className={[className, error && cl.required].join(' ')} />
            )}
            {error && <div className={cl.tooltip} >
                        <p>{meta.error}</p>
                        <div></div>
                      </div>}
          </div>
        )
      }
    } />
  )
}
