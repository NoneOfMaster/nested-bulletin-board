var Header = React.createClass({
  //the issue is that this state is always reinstated not saved anywhere
  getInitialState: function(){
    activeNav = this.props.activeNav;
    discussionsPath = this.props.postsPath;
    newPath = this.props.newPath;
    var navObj = {nav: [
      {
        id: 0,
        title: "Discussions",
        status: "inactive",
        path: discussionsPath
      },
      {
        id: 1,
        title: "New Discussions",
        status: "inactive",
        path: newPath
      },
      {
        id: 2,
        title: "Sign In",
        status: "inactive",
        path: "#/3"
      },
      {
        id: 3,
        title: "Create Account",
        status: "inactive",
        path: "#/4"
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
  newPath: React.PropTypes.string.isRequired
};