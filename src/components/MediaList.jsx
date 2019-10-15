import React from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import VisibilitySensor from "react-visibility-sensor";

const Container = styled.div`
  max-width: 1400px;
  width: 100vw;
  padding: 0 ${props => props.theme.sizes.xLarge};
  box-sizing: border-box;
`;
const List = styled.div`
  background: ${props => props.theme.colors.mainBG};
  padding-bottom: ${props => props.theme.sizes.medium};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;
const Header = styled.h1`
  font-family: Arial;
  font-size: ${props => props.theme.fonts.title};
  font-weight: 1000;
  align-self: flex-start;
  position: relative;
  padding-top: ${props => props.theme.sizes.large};
  letter-spacing: -2.5px;
  background: ${props => props.theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
const Caption = styled.h2`
  position: absolute;
  bottom: 0;
  left: 0;
  padding-left: ${props => props.theme.sizes.medium};
  font-family: Arial;
  font-size: ${props => props.theme.fonts.small};
  font-weight: 700;
  color: white;
  opacity: 0;
  transition: 0.2s ease-in-out;
`;
const Image = styled.img`
  width: 100%;
  transition: 0.2s ease-in-out;
  :hover {
    opacity: 0.3;
  }
  cursor: pointer;
`;
const MediaWrap = styled.div`
  width: 25%;
  margin-bottom: -3px;
  position: relative;
  overflow: hidden;
  &:hover ${Image} {
    transform: scale(1.05);
  }
  &:hover ${Caption} {
    opacity: 1;
    transform: translatey(-${props => props.theme.sizes.small});
  }
`;

const imagePath = "https://image.tmdb.org/t/p/w500/";
const baseURL = "https://api.themoviedb.org/3";

export default class MediaList extends React.PureComponent {
  state = {
    medias: [],
    loading: false,
    isVisible: false
  };

  fetchMedias = async () => {
    this.setState({ loading: true });
    const getMediaList = `${baseURL}/${this.props.mediaType}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`;
    const response = await axios.get(getMediaList);
    this.setState({
      medias: response.data.results,
      loading: false
    });
  };
  
  render() {
    const { title } = this.props;
    const { medias } = this.state;
    return (
      <VisibilitySensor onChange={this.fetchMedias}>
        <Container>
          <Header>{title}</Header>
          {this.state.loading && <Header small>Loading</Header>}
          <div>
            <List key="list1">
              {medias.map(media => [
                  <MediaWrap key={media.id}>
                    <Link to={`/${media.title !== undefined ? 'movie' : 'tv'}/${media.id}`}>
                    <Image
                      key={media.id + "image"}
                      src={
                        (media.backdrop_path !== null) 
                        ? imagePath + media.backdrop_path 
                        : `https://via.placeholder.com/500x281/212025/FFFFFF?text=${ media.title || media.name }`
                      }
                      alt={`${media.title || media.name} backdrop`}
                    />
                    </Link>
                    <Caption key={media.id + "cap"}>{media.title || media.name}</Caption>
                  </MediaWrap>
              ])}
            </List>
          </div>
        </Container>
      </VisibilitySensor>
    );
  }
}
