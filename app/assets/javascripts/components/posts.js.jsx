// error handling

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
    var newStatePosts = this.state.posts.concat(post);
    this.setState( {posts: newStatePosts } );
  },
  replyToPost (post, parentId) {
    var newStatePosts = this.state.posts.slice();
    function findParentById(postsArray) {
      for ( var i = 0 ; i < postsArray.length ; i++ ) {
        for ( var key in postsArray[i] ) {
          if ( postsArray[i][key].id === parentId ) {
            postsArray[i][key].children.unshift(post);
          } else {
            findParentById(postsArray[i][key].children);
          }
        }
      }
    }
    findParentById(newStatePosts);
    this.setState( {posts: newStatePosts } );
  },
  deletePost(postId) {
    var newStatePosts = this.state.posts.slice();
    function deleteById(postsArray) {
      for ( var i = 0 ; i < postsArray.length ; i++ ) {
        for ( var key in postsArray[i] ) {
          if ( key === postId.toString() ) {
            postsArray[i][key].text = "<<deleted>>";
          } else {
            deleteById(postsArray[i][key].children);
          }
        }
      }
    }
    deleteById(newStatePosts);
    this.setState( {posts: newStatePosts } );
  },

  render() {
    return (
      <div className="body">
        <h3> Posts </h3>
        <Posts 
          posts={this.state.posts}
          replyToPost={this.replyToPost}
          deletePost={this.deletePost} 
        />
        <h3> New Post </h3>
        <NewPostForm 
          postType="newPost"
          placeHolderText="add a new comment"
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
                    ancestry={post[key].ancestry}
                    text={post[key].text}
                    created={post[key].created_at}
                    edited={post[key].updated_at}
                    replyToPost={this.props.replyToPost}
                    deletePost={this.props.deletePost}
                 />
                 <Posts
                    key={"children-of-" + post[key].id}
                    posts={post[key].children}
                    replyToPost={this.props.replyToPost}
                    deletePost={this.props.deletePost}
                 />
                 </div>

        }.bind(this))}
      </div>
    )
  }
});

var Post = React.createClass({
  getInitialState() {
    return {replyBox: "hide"};
  },
  toggleReplyBox() {
    this.state.replyBox === "hide" ? this.setState({replyBox: "show"}) : this.setState({replyBox: "hide"});
  },
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
        <button onClick={this.toggleReplyBox}> Reply </button>
        <button> Edit </button>
        <button onClick={this.deletePost}> Delete </button>
        { this.state.replyBox === "show" &&
          < NewPostForm
            toggleReplyBox={this.toggleReplyBox}
            parentId={this.props.id} 
            postType="postReply"
            replyToPost={this.props.replyToPost}
            placeHolderText="post a reply"
          />
        }
      </div>
    )
  }
});

var NewPostForm = React.createClass({
  submitProtocol(postType) { 
    if ( postType === "newPost" ) { 
      return this.submitNewPost;
    } else if ( postType === "postReply" ) {
      return this.submitPostReply;
    }
  },
  submitNewPost() {
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
  submitPostReply() {
    this.props.toggleReplyBox();
    var text = this.refs.text.value;
    var parentId = this.props.parentId;
    $.ajax({
      url: '/posts',
      type: 'POST',
      dataType: 'json',
      data:  { post: {text: text, parent_id: parentId} }, 
      success: function(post) {
        this.props.replyToPost(post, parentId);
      }.bind(this)
    });
  },

  render() {
    return (
        <div>
          <input 
            id="new-post-input" 
            ref='text' 
            placeholder={this.props.placeHolderText} 
          />
          <button 
            onClick={this.submitProtocol(this.props.postType)}> Submit
          </button>
        </div>
    )
  }
});