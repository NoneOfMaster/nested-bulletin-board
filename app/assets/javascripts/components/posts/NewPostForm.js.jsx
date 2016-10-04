
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

NewPostForm.propTypes = {
  postType: React.PropTypes.string.isRequired,
  placeHolderText: React.PropTypes.string,
  parentID: React.PropTypes.string,
  replyToPost: React.PropTypes.func,
  add: React.PropTypes.func,
};