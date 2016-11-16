var Header = React.createClass({

  getInitialState: function(){
    discussionsPath = this.props.postsPath;
    return {nav: [
      {
        id: 1,
        title: "Discussions",
        active: "inactive",
        path: discussionsPath
      },
      {
        id: 2,
        title: "New Discussions",
        active: "inactive",
        path: "#/2"
      },
      {
        id: 3,
        title: "Sign In",
        active: "inactive",
        path: "#/3"
      },
      {
        id: 4,
        title: "Create Account",
        active: "inactive",
        path: "#/4"
      }
    ]
  };
  },

  doNav(id,path) {
    console.log(id);
    console.log(path);
  },

  render() {
    return (
      <div>
        <div>
          <a href="/">home/logo</a>
        </div>
        <ul>
          { this.state.nav.map(function(navItem){

              return <li key={navItem.id} 
                      >
                      <a
                        href={navItem.path}
                        onClick={this.doNav.bind(null,navItem.id,navItem.path)}
                      >{navItem.title}</a>
                      </li>

            }.bind(this))
          }
        </ul>
      </div>
    )
  }

});