var PostsBody = React.createClass({
  getInitialState: function(){
    return this.props.posts;
  }, 
  addNewPost(post) {
    var newStatePosts = this.state.posts.slice();
    newStatePosts.unshift(post);
    this.setState( {posts: newStatePosts } );
    location.href="/posts/" + Object.keys(post)[0];
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
        <div className="body-top">
          <TopSelector 
            postSet={this.props.postSet}
            add={this.addNewPost}
          />    
        </div>
        <div className="body-bottom">
          <PostsContainer 
            posts={this.state.posts}
            postSet={this.props.postSet}
            replyToPost={this.replyToPost}
            deletePost={this.deletePost} 
          />
        </div>
      </div>
    )
  }
});

PostsBody.propTypes = {
  postSet: React.PropTypes.string.isRequired,
};