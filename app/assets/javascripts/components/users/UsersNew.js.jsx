var UsersNew = React.createClass({
  submitForm: function() {
    $.ajax({
      url: '/users/',
      type: 'POST',
      dataType: 'json',
      data:  { user: {username: this.refs.username.value,
                      email: this.refs.email.value,
                      password: this.refs.password.value,
                      password_confirmation: this.refs.password_confirmation.value
                      } 
              },
      success: function(response) {
        if (response.success) {
          document.location.href = "/posts";
        } else {
          alert(response.errors);
        }
      }
    });
  },

  render() {
    return (
      <div>
        <h1>Sign Up</h1>
        <input 
          id="username" 
          ref='username' 
          placeholder="username"
        />
        <input 
          id="email" 
          ref='email' 
          placeholder="email"
        />
        <input 
          id="password" 
          ref='password' 
          placeholder="password"
        />
        <input 
          id="password-confirmation" 
          ref='password_confirmation' 
          placeholder="password confirmation"
        />
        <button 
          onClick={this.submitForm}> Submit
        </button>

      </div>
    )
  }

});