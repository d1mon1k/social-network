import { Field } from "react-final-form"
import cl from './FieldWithValidation.module.scss'

/* ------------- Types ------------- */
interface FieldWithValidationProps {
  name: string
  type: string
  validators: any[]
  Element: 'input' | 'textarea'
  placeholder?: string
  defaultValue?: string 
  className?: string
}

/* ------------- Component ------------- */
export const FieldWithValidation: React.FC<FieldWithValidationProps> = ({
  name,
  Element,
  validators, 
  className,
  defaultValue,
  ...props 
}) => {
  const composeValidators = ([...validators]: any[]) => (value: any) => 
    validators.reduce((error, validator) => error || validator(value), undefined)

  return (
    <Field
      {...props}
      name={name}
      initialValue={defaultValue}
      validate={composeValidators(validators)}
      render={({ input, meta }) => {
        const error = meta.touched && meta.error && !meta.active

        const ErrorComponent = error && (
          <div className={cl.tooltip}>
            <p>{meta.error}</p>
            <div></div>
          </div>
        )

        const CheckBoxComponent = (
          <div className={cl.checkboxWrapper}>
            <label className={cl.checkboxContainer}>
              <Element {...input} {...props} className={`cl.checkbox ${error && cl.required}`} />
              <span className={cl.checkMark}></span>
            </label>
          </div>
        )

        const InputComponent = (
          <Element {...input} {...props} className={`${className} ${error && cl.required}`} />
        )

        return (
          <div className={cl.field}>
            {props.type === 'checkbox' ? (CheckBoxComponent) : (InputComponent)}
            {ErrorComponent}
          </div>
        )
      }}
    />
  )
}
