var Header = React.createClass({
  
  getInitialState: function(){
    var navObj = {nav: [
      {
        id: 0,
        title: "Discussions",
        status: "inactive",
        showWhen: "always", 
        path: this.props.postsPath
      },
      {
        id: 1,
        title: "Sign In",
        status: "inactive",
        showWhen: "signed out", 
        path: this.props.loginPath
      },
      {
        id: 2,
        title: "Create Account",
        status: "inactive",
        showWhen: "signed out", 
        path: this.props.newUserPath
      },
      {
        id: 3,
        title: this.props.currentUser + "'s Posts",
        status: "inactive",
        showWhen: "signed in", 
        path: "/users/" + this.props.currentUserID
      },
      {
        id: 4,
        title: "Log Out",
        status: "inactive",
        showWhen: "signed in", 
        path: "/logout"
      },
      {
        id: 5,
        title: "Visit the Repo",
        status: "inactive",
        showWhen: "always", 
        path: "https://github.com/NoneOfMaster/tooyou"
      }
    ],
    userSignedIn: false,
    mobileDropDown: "up"
    };
    //add an ID assigning function so items can be easily rearranged without renumbering
    if (this.props.activeNav != null) navObj.nav[this.props.activeNav].status = "active";
    if (this.props.currentUser != null) navObj.userSignedIn = true;
    return navObj;
  },
  toggleMobileNav() {
    if ( $("#mobile-nav").html() === "" ) {
      $("#mobile-nav").html($("#main-nav").html());
    }
    if ( this.state.mobileDropDown === "up" ) {
      $("#nav-button span").addClass('open');
      $("#mobile-nav").slideDown(250);
      this.state.mobileDropDown = "down";
      this.setState(this.state);
    } else {
      $("#nav-button span").removeClass('open');
      $("#mobile-nav").slideUp(250);
      this.state.mobileDropDown = "up";
      this.setState(this.state);
    }
  },

  render() {
    return (
      <div id="header">
        <div id="main-nav">
          <ul>
            { this.state.nav.map(function(navItem){
                  if ( this.state.userSignedIn && navItem.showWhen !== "signed out") {

                    return <li 
                              key={navItem.id} 
                              className={"nav-item-" + navItem.status}
                            >
                            <a
                              href={navItem.path}
                            >{navItem.title}</a>
                            </li>

                  } else if (!this.state.userSignedIn && navItem.showWhen !== "signed in") {

                    return <li 
                              key={navItem.id} 
                              className={"nav-item-" + navItem.status}
                           >
                           <a
                              href={navItem.path}
                           >{navItem.title}</a>
                           </li> 

                  }

                }.bind(this)

              )

            }
          </ul>
        </div>
        <div id="nav-button" onClick={this.toggleMobileNav}><span>MENU</span></div>
        <div id="mobile-nav">
        </div>
      </div>
    )
  }

});

Header.propTypes = {
  postsPath: React.PropTypes.string.isRequired,
  newUserPath: React.PropTypes.string.isRequired
};