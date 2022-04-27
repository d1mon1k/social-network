import React from 'react'
import cl from './ProfileStatus.module.scss'

interface Props {
  status: string | null
  setStatus: (status: string) => void
  authProfileId: number | null
  curUserId: number | null
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

  componentDidUpdate (prevProps: Props, prevState: State) {
    if(prevProps.status !== this.props.status) {
      this.setState({ status: this.props.status})
    }
  }

  toggleEditMode = () => {
    if(this.props.authProfileId === this.props.curUserId) {
      this.setState({ editMode: !this.state.editMode })
    }
    return
  }

  onStatusChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ status: e.target.value })
  }

  onEnterPressHandler = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      this.state.status !== null && this.props.setStatus(this.state.status)
      this.setState({ editMode: false })
    }
  }

  render() {
    return (
      <>
        {!this.state.editMode && (
          <p onClick={this.toggleEditMode} className={`${cl.status} ${this.props.status ? '' : cl.statusEmpty}`}>
            {this.props.status || '--empty--'}
          </p>
        )}
        {this.state.editMode && (
          <input
            onKeyPress={this.onEnterPressHandler}
            onChange={this.onStatusChangeHandler}
            autoFocus={true}
            onBlur={this.toggleEditMode}
            type="text"
            className={cl.status}
            value={this.state.status || ''}
          />
        )}
      </>
    )
  }
}
