import { Field } from "react-final-form"
import cl from './FieldWithValidation.module.scss'

interface Props {
  name: string
  placeholder: string
  type: string
  validators: any[]
  Element: 'input' | 'textarea'
}

export const FieldWithValidation: React.FC<Props> = ({ name, Element, validators, ...props }) => {

  const composeValidators = ([...validators]: any[]) => (value: any) => validators.reduce((error, validator) => {
    return error || validator(value)
  }, undefined)

  return (
    <Field name={name} validate={composeValidators(validators)} {...props}>
      {({input, meta}) => {
        const error = meta.touched && meta.error && !meta.active ? true : false
        return (
          <div className={cl.field}>
            <Element {...input} {...props} className={[cl.textArea, error && cl.required].join(' ')} />
            {error && <div className={cl.tooltip} >
                        <p>{meta.error}</p>
                        <div></div>
                      </div>}
          </div>
        )
      }}
    </Field>
  )
}
