var PostsBody = React.createClass({
  getInitialState: function(){
    return this.props.posts;
  }, 
  currentUser() {
    if ( this.props.currentUser ) {
      return this.props.currentUser.id;
    } else {
      return null;
    }
  },
  addNewPost(post) {
    var newStatePosts = this.state.posts.slice();
    post[Object.keys(post)[0]]["is_top_level"] = true; //look at the ascending numbered post containers
    post[Object.keys(post)[0]]["author"] = this.props.currentUser.username;
    newStatePosts.unshift(post);
    this.setState( {posts: newStatePosts } );
    location.href="/posts/" + Object.keys(post)[0];
  },
  replyToPost (post, parentId) {
    post[Object.keys(post)[0]]["author"] = this.props.currentUser.username;
    post[Object.keys(post)[0]]["author_id"] = this.props.currentUser.id;
    post[Object.keys(post)[0]]["created_at"] = "just now";
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
        <div className="body-top">
          <TopSelector 
            postSet={this.props.postSet}
            add={this.addNewPost}
            currentUserID={this.currentUser()}
          />    
        </div>
        <div className="body-bottom">
          <PostsContainer 
            posts={this.state.posts}
            postSet={this.props.postSet}
            replyToPost={this.replyToPost}
            deletePost={this.deletePost}
            currentUserID={this.currentUser()}
          />
        </div>
      </div>
    )
  }
});

PostsBody.propTypes = {
  postSet: React.PropTypes.string.isRequired,
  postSet: React.PropTypes.string
};