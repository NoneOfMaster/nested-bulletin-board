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
            postsPath = {this.props.postsPath}
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

Post.propTypes = {
  id: React.PropTypes.number.isRequired, 
  ancestry: React.PropTypes.string,
  text: React.PropTypes.string.isRequired, 
  created: React.PropTypes.string.isRequired,
  edited: React.PropTypes.string.isRequired,
  replyToPost: React.PropTypes.func.isRequired,
  deletePost: React.PropTypes.func.isRequired,
  postsPath: React.PropTypes.string.isRequired
};