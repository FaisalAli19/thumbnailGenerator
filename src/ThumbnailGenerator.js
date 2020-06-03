import React, { Component } from 'react';
import VideoThumbnail from 'react-video-thumbnail';
import { connect } from 'react-redux';

import { getAllPosts, updateThumbnail, nextVideo } from './redux/action';

class ThumbnailGenerator extends Component {
  state = {
    image: {},
    token: 'yC-9hdcPp7aQH6UUnssM',
    videoID: '',
  };

  fetch = () => {
    const { dispatchFetchVideos } = this.props;
    const { videoID, token } = this.state;
    const image = document.getElementsByClassName('react-thumbnail-generator');
    console.log(videoID);
    if (image[0]) image[0].remove();
    dispatchFetchVideos(token, videoID);
  };

  updateThumbnail = () => {
    const { videos, dispatchUpdateThumbnail } = this.props;
    const { image, token } = this.state;

    console.log({
      povId: videos.id,
      thumbnail: image,
    });
    dispatchUpdateThumbnail(token, {
      povId: videos.id,
      thumbnail: image,
    });
    document.getElementsByClassName('react-thumbnail-generator')[0].remove();
  };

  handleNext = () => {
    const { dispatchNextVidoe } = this.props;
    dispatchNextVidoe();
  };

  getImageData = (thumbnail) => {
    const { videos } = this.props;
    const name = videos.topic_title.split(' ').join('_');
    fetch(thumbnail)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], `${name}.png`, { type: 'image/png' });
        console.log(file);
        this.setState({ image: file });
      });
  };
  calculateImageSize(base64String) {
    let padding, inBytes, base64StringLength;
    if (base64String.endsWith('==')) padding = 2;
    else if (base64String.endsWith('=')) padding = 1;
    else padding = 0;

    base64StringLength = base64String.length;
    console.log(base64StringLength);
    inBytes = (base64StringLength / 4) * 3 - padding;
    console.log(inBytes);
    this.kbytes = inBytes / 1000;
    return this.kbytes;
  }
  renderVideoThumbnail = (url) => {
    return <VideoThumbnail videoUrl={url} thumbnailHandler={this.getImageData} />;
  };
  render() {
    const { videos } = this.props;
    const { videoID } = this.state;
    return (
      <div>
        <h1>Thumbnail Generator</h1>
        {videos.topic_title && <p>{videos.topic_title}</p>}
        <input
          type="text"
          value={videoID}
          onChange={(e) => this.setState({ videoID: e.target.value })}
        />
        <a href="#" onClick={this.fetch}>
          Fetch video
        </a>
        <a href="#" onClick={this.updateThumbnail}>
          Upload Thumbnail
        </a>
        <a href="#" onClick={this.handleNext}>
          Next
        </a>
        {videos.caption_url && this.renderVideoThumbnail(videos.caption_url.url)}
      </div>
    );
  }
}

const mapStateToProps = ({ video }) => ({
  ...video,
});
const mapDispatchToProps = (dispatch) => ({
  dispatchFetchVideos: (token, id) => dispatch(getAllPosts(token, id)),
  dispatchUpdateThumbnail: (token, data) => dispatch(updateThumbnail(token, data)),
  dispatchNextVidoe: () => dispatch(nextVideo()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ThumbnailGenerator);
