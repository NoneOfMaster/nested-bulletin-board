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
  goToPost(id) {
    return function() {
      location.href="/posts/" + id;
    }
  },
  postClassName() { 
    if (this.props.isTopLevel) {
      return "top-level-post";
    } else {
      return "post";
    }
  },
  // consider seperate component for buttons/options


  render() {
    return (
      <div className={this.postClassName()}>
        <div className="post-content">
          <div className="text">{this.props.text}</div>
          <div className="date">Posted: {this.props.created}</div>
        </div>

        { this.props.postSet === "discussionTopics" &&
          <div className="topics-button-set">
            <button onClick={this.goToPost(this.props.id)}> Discuss </button>
          </div>
        }

        { this.props.postSet === "individualFamily" &&

          <div className="post-family-button-set">

            <button onClick={this.toggleReplyBox}> Reply </button>      

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

        }

      </div>
    )
  }
});

Post.propTypes = {
  id: React.PropTypes.number.isRequired, 
  isTopLevel: React.PropTypes.bool,
  text: React.PropTypes.string.isRequired, 
  created: React.PropTypes.string.isRequired,
  edited: React.PropTypes.string.isRequired,
  replyToPost: React.PropTypes.func.isRequired,
  deletePost: React.PropTypes.func.isRequired,
  postSet: React.PropTypes.string.isRequired,
};