import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import './index.css'

const initialColorsList = [
  'usercolor1',
  'usercolor2',
  'usercolor3',
  'usercolor4',
  'usercolor5',
]

class UserPasswordDetails extends Component {
  state = {
    passwordList: [],
    websiteInput: '',
    userNameInput: '',
    passwordInput: '',
    searchInput: '',
    isShow: false,
  }

  showPassword = event => {
    if (event.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  onClickDeleteBtn = id => {
    const {passwordList} = this.state
    const filteredList = passwordList.filter(
      eachPassword => eachPassword.id !== id,
    )
    /* const caseOf = filteredList.length !== 0 */
    this.setState({passwordList: filteredList})
  }

  onChangeWebsiteInput = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeUserNameInput = event => {
    this.setState({userNameInput: event.target.value})
  }

  onChangePasswordInput = event => {
    this.setState({passwordInput: event.target.value})
  }

  onClickAddPasswordBtn = event => {
    event.preventDefault()

    const {websiteInput, userNameInput, passwordInput} = this.state

    const randomcolorsClass = initialColorsList[Math.floor(Math.random() * 5)]
    const newPasswordDetails = {
      id: uuidv4(),
      website: websiteInput,
      userName: userNameInput,
      password: passwordInput,
      colorsClassAdd: randomcolorsClass,
    }

    this.setState(prevState => ({
      passwordList: [...prevState.passwordList, newPasswordDetails],
      websiteInput: '',
      userNameInput: '',
      passwordInput: '',
      searchInput: '',
    }))
  }

  renderAddPasswordandNoPassword = () => {
    const {passwordList, searchInput, isShow} = this.state

    const searchResults = passwordList.filter(eachPassword =>
      eachPassword.website
        .toLowerCase()
        .includes(searchInput.toLocaleLowerCase()),
    )

    if (searchResults.length === 0) {
      return (
        <div className="no-passwords-img-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
            alt="no passwords"
            className="no-password"
          />
          <p className="no-passwords-text">No Passwords</p>
        </div>
      )
    }
    return (
      <div className="your-password-div">
        <ul className="password-ul-container">
          {searchResults.map(eachPassword => (
            <li
              className="li-list-container"
              id={eachPassword.id}
              key={eachPassword.id}
            >
              <p className={`user-logo-text ${eachPassword.colorsClassAdd}`}>
                {eachPassword.userName[0].toUpperCase()}
              </p>
              <div className="website-password-delete-container">
                <div className="website-password-container">
                  <p className="website-text">{eachPassword.website}</p>
                  <p className="username-text">{eachPassword.userName}</p>
                  {!isShow && (
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                      alt="stars"
                      className="stars-png"
                    />
                  )}
                  {isShow && (
                    <p className="password-text">{eachPassword.password}</p>
                  )}
                </div>
                <button
                  type="button"
                  className="delete-button"
                  data-testid="delete"
                  onClick={() => this.onClickDeleteBtn(eachPassword.id)}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png "
                    alt="delete"
                    className="delete-png"
                  />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  onSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  renderYourPasswordSection = () => {
    const {passwordList, searchInput} = this.state
    const passwordListLength = passwordList.length

    return (
      <div className="your-password-section">
        <div className="your-password-container">
          <div className="password-count-search-container">
            <h1 className="password-count-text">Your Passwords</h1>
            <p className="span-count"> {passwordListLength}</p>
            <div className="search-div">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-png"
              />
              <input
                type="search"
                className="serch-input"
                placeholder="Search"
                value={searchInput}
                onChange={this.onSearchInput}
              />
            </div>
          </div>
          <hr className="hr-line" />
          <div className="show-password-div">
            <input
              id="check"
              type="checkbox"
              className="checkbox-input"
              onChange={this.showPassword}
            />
            <label htmlFor="check" className="show-password-text">
              Show passwords
            </label>
          </div>
          {this.renderAddPasswordandNoPassword()}
        </div>
      </div>
    )
  }

  render() {
    const {websiteInput, userNameInput, passwordInput} = this.state

    return (
      <div className="bg-App-container">
        <div className="manager-details-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="app-logo"
          />
          <div className="create-password-section">
            <div className="password-image-container">
              <form
                className="add-password-container"
                onSubmit={this.onClickAddPasswordBtn}
              >
                <h1 className="add-password-title">Add New Password</h1>

                <div className="website-div">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                    className="webiste-png"
                  />
                  <input
                    type="text"
                    placeholder="Enter website"
                    className="website-input"
                    onChange={this.onChangeWebsiteInput}
                    value={websiteInput}
                  />
                </div>
                <div className="website-div">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                    className="webiste-png"
                  />
                  <input
                    type="text"
                    placeholder="Enter username"
                    className="website-input"
                    onChange={this.onChangeUserNameInput}
                    value={userNameInput}
                  />
                </div>
                <div className="website-div">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                    className="webiste-png"
                  />
                  <input
                    type="password"
                    placeholder="Enter password"
                    className="website-input"
                    onChange={this.onChangePasswordInput}
                    value={passwordInput}
                  />
                </div>

                <button
                  type="submit"
                  className="add-button"
                  onSubmit={this.onClickAddPasswordBtn}
                >
                  Add
                </button>
              </form>

              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
                alt=" password manager"
                className="password-image"
              />
            </div>
          </div>
          {this.renderYourPasswordSection()}
        </div>
      </div>
    )
  }
}

export default UserPasswordDetails
