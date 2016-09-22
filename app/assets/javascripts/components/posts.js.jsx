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

  addNewPost(post) {
    var newState = this.state.posts.concat(post);
    this.setState( {posts: newState } );
  },
  deletePost(postId) {
    console.log("update state " + postId);
  },

  render() {
    return (
      <div className="body">
        <h3> Posts </h3>
        <Posts 
          posts={this.state.posts}
          deletePost={this.deletePost} 
        />
        <NewPostForm 
          postType="newPost"
          add={this.addNewPost}
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

          return <div 
                    className="posts"
                    key={"post-family-" + post[key].id}
                 >
                 <Post
                    key={"post-" + post[key].id}
                    id={post[key].id}
                    text={post[key].text}
                    created={post[key].created_at}
                    edited={post[key].updated_at}
                    deletePost={this.props.deletePost}
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
  deletePost() {
    var id = this.props.id;
    $.ajax({
      url: '/posts/' + id,
      type: 'DELETE',
      dataType: 'json',
      data:  { post: {id: id} }, //this is redundant but
      success: function(post) {
        this.props.deletePost(id);
      }.bind(this)
    });
  },

  render() {
    return (
      <div className="post">
        <p>{this.props.created + ": " + this.props.text}</p>
        <button onClick={this.deletePost}> Delete </button>
      </div>
    )
  }
});

var NewPostForm = React.createClass({
  submitProtocol(postType) { 
    if ( postType === "newPost" ) { 
      return this.handleSubmitNewPost;
    } else if ( postType === "postReply" ) {
      return this.handleSubmitPostReply;
    }
  },
  handleSubmitNewPost() {
    var text = this.refs.text.value;
    document.getElementById("new-post-input").value = "";
    $.ajax({
      url: '/posts',
      type: 'POST',
      dataType: 'json',
      data:  { post: {text: text} }, 
      success: function(post) {
        this.props.add(post);
      }.bind(this)
    });
  },

  render() {
    return (
        <div>
          <h3> New Post </h3>
          <input 
            id="new-post-input" 
            ref='text' 
            placeholder={this.props.placeHolder} 
          />
          <button 
            onClick={this.submitProtocol(this.props.postType)}> Submit
          </button>
        </div>
    )
  }
});