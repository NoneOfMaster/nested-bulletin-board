var TopSelector = React.createClass({


  render() {
    return (
      <div>
        { this.props.selection === "discussionTopics" &&
          <h1>All Discussions</h1>
        }
        { this.props.selection === "master" &&
          <h1>Master List of All Posts</h1>
        }
      </div>
    )
  }
  
});

TopSelector.propTypes = {
  
};