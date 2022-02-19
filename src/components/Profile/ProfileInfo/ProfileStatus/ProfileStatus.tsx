import React from 'react'
import cl from './ProfileStatus.module.scss'

interface Props {
  status: string | null
}

interface State {
  editMode: boolean
  status: string | null
}

export class ProfileStatus extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { editMode: false, status: this.props.status }
  }

  toggleEditMode = () => {
    this.setState({ editMode: !this.state.editMode })
  }

  render() {
    return (
      <>
        {!this.state.editMode && (
          <p onClick={this.toggleEditMode} className={cl.status}>
            {this.state.status}
          </p>
        )}
        {this.state.editMode && (
          <input
            autoFocus={true}
            onBlur={this.toggleEditMode}
            onChange={() => {}}
            type="text"
            className={cl.status}
            value={this.state.status || ''}
          />
        )}
      </>
    )
  }
}
