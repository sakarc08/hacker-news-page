import React from "react";
import Story from './Story';

class StoryBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { stories: [], currentPage: 0, totalPages: 0 };
  }

  componentDidMount() {
    sessionStorage.getItem('stories') ? this.setState((prevState) => {
      return { ...prevState, stories: JSON.parse(sessionStorage.getItem('stories')),
    totalPages: JSON.parse(sessionStorage.getItem('totalPages'))}
    }) : this.fetchStories();
  }

  fetchStories() {
    fetch("http://hn.algolia.com/api/v1/search?tags=story")
      .then((res) => res.json())
      .then(({ hits, page, nbPages: totalPages }) => {
        this.setState({ stories: hits, currentPage: page, totalPages })
        sessionStorage.setItem('stories', JSON.stringify(hits));
        sessionStorage.setItem('totalPages', JSON.stringify(totalPages));
      })
      .catch((e) => console.error(e));
  }

  fetchMoreStories() {
    const currentPage = this.state.currentPage;
    if(currentPage + 1 <= this.state.totalPages) {
      fetch(`http://hn.algolia.com/api/v1/search?tags=story&page=${currentPage+1}`)
      .then((res) => res.json())
      .then(({ hits }) => this.setState((prevState, currentProps) => {
        return { stories: [...prevState.stories, ...hits], currentPage: prevState.currentPage+1 }
      })).catch((e) => console.error(e));
    }
  }

  hideStory(id) {
    const index = this.state.stories.findIndex(item => item.objectID === id);
    this.setState((prevState, currentProps) => {
      const updatedStories = prevState.stories.splice(index, 1);
      sessionStorage.setItem('stories', JSON.stringify(prevState.stories));
      return { stories: prevState.stories}
    })
    sessionStorage.removeItem(id);
  }

  render() {
    return (
      <div className='story-board-container'>
        <div className='story-board-header'></div>
        <div  className='stories-container'>
          { this.state.stories && this.state.stories.map( (story, index) => <Story key={index} story={story} hideStory={() => this.hideStory(story.objectID)}/>) }
        </div>
        { this.state.stories.length > 0 ? (
          <div className='more-stories' onClick={() => this.fetchMoreStories()}>
            MORE
          </div>
        ) : null }
        
      </div>
    )
  }
}

export default StoryBoard;
