var TopSelector = React.createClass({

  render() {
    return (
      <div>
        { this.props.postSet === "discussionTopics" &&
          <h1>All Discussions</h1>
        }
        { this.props.postSet === "master" &&
          <h1>Master List of All Posts</h1>
        }
        { ["discussionTopics", "master", "newPost"].includes(this.props.postSet) &&
          <div>
            <NewPostForm
              add={this.props.add}
              postType="newPost"
              placeHolderText="start a new discussion"
            />
          </div>
        }
        { this.props.formFor === "newUser" &&
          <h1>Sign Up!</h1>
        }
        { this.props.formFor === "newSession" &&
          <h1>Sign In!</h1>
        }
      </div>
    )
  }
  
});

TopSelector.propTypes = {
  postSet: React.PropTypes.string,
  formFor: React.PropTypes.string
};