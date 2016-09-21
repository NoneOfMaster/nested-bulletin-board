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
  // initially set since component will try to set up before any state call can be returned
  componentDidMount: function() {
    $.ajax({
      url: '/posts',
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        this.setState(data);
      }.bind(this)
    });
  }, // these functions are autobound by React

  addPost(post) {
    var newState = this.state.posts.concat(post);
    this.setState( {posts: newState } );
  },
  addReply(post, index) {
    var newState = this.state.posts.slice() // got to be a better way here
    newState.splice(index,0,post);
    this.setState({posts: newState});
  },
  postDeleted: function(id) { 
    function removePost(post) {
      if ( post.id !== id ) {
        return post;
      }
    }
    var newState = this.state.posts.filter(removePost);
    this.setState( {posts: newState} );
  },

  render() {
    return (
      <div className="body">
        <Posts 
         posts={this.state.posts} 
         reply={this.addReply} 
         postDeleted={this.postDeleted} />
        <h2> Say a thing </h2>
        <NewPost 
         add={this.addPost} 
         postType="newPost" 
         placeHolder="write a post here" />
      </div>
    );
  }
});

var Posts = React.createClass({
  orderClosure() {
    var orderNum = -1;
    function incrementOrderNum() {
      return orderNum += 1;
    }
    return incrementOrderNum;
  },
  getNestLevel(ancestry){
    if ( !!ancestry && !!ancestry.match(/\//g) ) {   
      return 1 + ancestry.match(/\//g).length;
    } else if ( !!ancestry ) {
      return 1;
    } 
    return 0;
  },

  render: function() {
    { var postIndex = this.orderClosure();}
    return (
      <div className="posts">
        {this.props.posts.map(function(post) {
          return <Post 
                  key={post.id} 
                  class={this.getNestLevel(post.ancestry)}
                  post={post} 
                  postIndex={postIndex()} 
                  reply={this.props.reply} 
                  postDeleted={this.props.postDeleted} />
        }.bind(this))}
      </div>
    );
  }
});

var Post = React.createClass({
  getInitialState: function(){
    return {showReplyForm: false};
  }, 
  toggleReplyForm(){
    this.state.showReplyForm === false ? this.setState({showReplyForm: true}) : this.setState({showReplyForm: false}) ;
  },
  handleDelete(){
    var id = this.props.post.id;
    $.ajax({
      url: '/posts/' + id,
      type: 'DELETE',
      data:  {post: {id: id}},
      success: function() {
        this.props.postDeleted(id);
      }.bind(this)
    });
  },

  render: function() {
    return (
      <div className={"level-" + this.props.class} > 
        <p>{this.props.post.text}</p>
        <button onClick={this.toggleReplyForm}>Reply</button>
        <button>Edit</button>
        <button onClick={this.handleDelete}>Delete</button>
        { !!this.state.showReplyForm &&
          <NewPost
           reply={this.props.reply} 
           postType="postReply" 
           hideReplyForm={this.toggleReplyForm}
           parentIndex={this.props.postIndex} 
           placeHolder="post a reply here" 
           parentId={this.props.post.id} />
        }
      </div>

    );
  }
});

var NewPost = React.createClass({
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
  handleSubmitPostReply() {
    var text = this.refs.text.value;
    var index = this.props.parentIndex + 1;
    var parentId = this.props.parentId;
    $.ajax({
      url: '/posts',
      type: 'POST',
      dataType: 'json',
      data:  { post: {text: text, parent_id: parentId} }, 
      // undefined params will not be sent
      // so parent_id only when supplied
      success: function(post) {
        this.props.reply(post, index);        
      }.bind(this)
    });
    console.log("reply-box-" + parentId)
    document.getElementById("reply-box-" + parentId).style.visibility = "hidden";
  },


  render() {
    return (
        <div>
          <input id="new-post-input" ref='text' placeholder={this.props.placeHolder} />
            <button onClick={this.submitProtocol(this.props.postType)}>Submit</button>
        </div>
    )
  }
});