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
      data:  { post: {id: id} }, //this is redundant
      success: function(post) {
        this.props.deletePost(id);
      }.bind(this)
    });
  },
  // consider seperate component for buttons/options
  render() {
    return (
      <div className="post">
        <p>{this.props.created + ": " + this.props.text}</p>

        { this.props.postSet != "discussionTopics" &&
          <button onClick={this.toggleReplyBox}> Reply </button>
        }

        { this.props.postSet === "discussionTopics" &&
          <button> Discuss </button>
        }

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

Post.propTypes = {
  id: React.PropTypes.number.isRequired, 
  ancestry: React.PropTypes.string,
  text: React.PropTypes.string.isRequired, 
  created: React.PropTypes.string.isRequired,
  edited: React.PropTypes.string.isRequired,
  replyToPost: React.PropTypes.func.isRequired,
  deletePost: React.PropTypes.func.isRequired,
  postSet: React.PropTypes.string.isRequired,
};