var Header = React.createClass({
  //the issue is that this state is always reinstated not saved anywhere
  getInitialState: function(){
    activeNav = this.props.activeNav;
    var navObj = {nav: [
      {
        id: 0,
        title: "Discussions",
        status: "inactive",
        path: this.props.postsPath
      },
      {
        id: 1,
        title: "Sign In",
        status: "inactive",
        path: "#/3"
      },
      {
        id: 2,
        title: "Create Account",
        status: "inactive",
        path: this.props.newUserPath
      }
    ]
  };
  if (activeNav != null) navObj.nav[activeNav].status = "active";
  return navObj;
  },

  render() {
    return (
      <div>
        <div>
          <a href="/">home/logo</a>
        </div>
        <ul>
          { this.state.nav.map(function(navItem){

              return <li 
                        key={navItem.id} 
                        className={"nav-item-" + navItem.status}
                      >
                      <a
                        href={navItem.path}
                      >{navItem.title}</a>
                      </li>

            }.bind(this))
          }
        </ul>
      </div>
    )
  }

});

Header.propTypes = {
  postsPath: React.PropTypes.string.isRequired,
  newUserPath: React.PropTypes.string.isRequired
};