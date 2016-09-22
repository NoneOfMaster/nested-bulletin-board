//set up optomisitc DOM updating

var Main = React.createClass({
  render() {
    return (
      <Body />
    )
  }
});

var Body = React.createClass({
  getInitialState: function(){
    return {posts: []};
  }, 
  componentDidMount: function() {
    $.ajax({
      url: '/posts',
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        this.setState(data);
      }.bind(this)
    });
  },

  render() {
    return (
      <div className="body">
        <Posts 
         posts={this.state.posts} 
        />
      </div>
    )
  }
});

var Posts = React.createClass({

  render() {
    return (
      <div>
        { this.props.posts.map(function(post, children) {
          var key = +Object.keys(post)[0];
          // debugger;

          return <div 
                  className="posts"
                  key={"post-family-" + post[key].id}
                 >
                 <Post
                  key={"post-" + post[key].id}
                  id={post[key].id}
                  text={post[key].text}
                  created={post[key].created}
                  edited={post[key].updated_edited}
                 />
                 <Posts
                  key={"children-of-" + post[key].id}
                  posts={post[key].children}
                 />
                 </div>

        }.bind(this))}
      </div>
    )
  }
});

var Post = React.createClass({

  render() {
    return (
      <div className="post">
        <p>{this.props.created + ": " + this.props.text}</p>
      </div>
    )
  }
});