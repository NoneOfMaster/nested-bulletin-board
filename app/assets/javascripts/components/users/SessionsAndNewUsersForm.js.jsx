var SessionsAndNewUsersForm = React.createClass({
  submitProtocol: function() {
    if (this.props.formFor === "newUser") {
      return this.submitNewUser;
    } else if (this.props.formFor === "newSession") {
      return this.submitNewSession;
    }
  },
  submitNewUser: function() { // submits may be consolidated
    $.ajax({
      url: '/users/',
      type: 'POST',
      dataType: 'json',
      data:  { user: {username: this.refs.username.value,
                      password: this.refs.password.value,
                      password_confirmation: this.refs.password_confirmation.value,
                      referrer: this.refs.referrer.value
                      } 
              },
      success: function(response) {
        if (response.success) {
          document.location.href = response.referrer;
        } else {
          alert(response.errors);
        }
      }
    });
  },
  submitNewSession: function() {
    $.ajax({
      url: '/sessions',
      type: 'POST',
      dataType: 'json',
      data:  { user: {username: this.refs.username.value,
                      password: this.refs.password.value,
                      referrer: this.refs.referrer.value
                      } 
              },
      success: function(response) {
        if (response.success) {
          document.location.href = response.referrer;
        } else {
          alert(response.errors);
        }
      }
    });
  },

  render() {
    return (
      <div className="user-form">
        <TopSelector formFor={this.props.formFor} />
        <input 
          type="hidden"
          ref="referrer"
          value={this.props.referrer}
        />
        <input 
          id="username" 
          ref='username' 
          placeholder="username"
        />
        <input 
          id="password"
          type="password" 
          ref='password' 
          placeholder="password"
        />
        { this.props.formFor === "newUser" &&
          <input 
            id="password-confirmation" 
            type="password" 
            ref='password_confirmation' 
            placeholder="password confirmation"
          />
        }
        <button 
          onClick={this.submitProtocol()}> Submit
        </button>

      </div>
    )
  }

});