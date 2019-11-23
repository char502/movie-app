import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import logo from "../images/logo_6.png";
import { Link } from "react-router-dom";
import { rem } from "polished";

const Navbar = styled.div`
  position: fixed;
  height: ${props => props.theme.sizes.navHeight};
  width: 100vw;
  top: 0;
  left: 0;
  padding: 0 ${props => props.theme.sizes.xLarge} 0 ${props => props.theme.sizes.xLarge};
  box-sizing: border-box;
  background: linear-gradient(rgba(20, 20, 20, 1) 60%, rgba(20, 20, 20, 0.8));
  box-shadow: 0px 4px 24px rgba(253, 0, 29, 0.1);
  z-index: 9;
  @media (max-width: 600px) {
    height: ${rem(110)}
  }
`;

const NavItems = styled.div`
  height: 100%;
  width: 100%;
  max-width: 1800px;
  margin: 0 auto;
  font-size: ${props => props.theme.fonts.medium};
  font-family: Nunito;
  color: ${props => props.theme.colors.grey};
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const NavLogo = styled.img`
  height: ${props => props.theme.sizes.xLarge};
  width: auto;
  cursor: pointer;
  @media (max-width: 600px) {
    height: auto;
    width: ${rem(200)};
    padding-top: ${props => props.theme.sizes.tiny};
    padding-bottom: ${props => props.theme.sizes.tiny};
  }
`;

const NavSearch = styled.div`
  margin-left: ${props => props.theme.sizes.xLarge};
  margin-right: ${props => props.theme.sizes.large};
  @media (max-width: 600px) {
    margin: 0;
  }
`;

const SearchBar = styled.form`
  position: relative;
  width: 16rem;
  display: flex;
  align-items: center;
  @media (max-width: 600px) {
    width: 12rem;
  }
`

const SearchButton = styled.button`
  border: none;
  outline: none;
  font-size: ${props => props.theme.fonts.medium};
  margin-right: ${props => props.theme.sizes.tiny};
  background-color: ${props => props.theme.colors.mainBG};
  color: ${props => props.theme.colors.grey};
  cursor: pointer;
  @media (max-width: 600px) {
    width: 12rem;
    background-color: rgba(0,0,0,0);
  }
`

const SearchText = styled.input`
  border: none;
  outline: none;
  height: ${props => props.theme.sizes.medium};
  font-family: Arial;
  font-weight: 700;
  transition: 0.3s ease-in-out;
  text-indent: ${props => props.theme.sizes.small};
  border-radius: ${props => props.theme.sizes.small};
  width: ${props => props.isShown ? "12rem" : "0rem"};
  background-color: ${props => props.isShown ? props.theme.colors.white : props.theme.colors.mainBG };
  @media (max-width: 600px) {
    width: ${props => props.isShown ? "9rem" : "0rem"};
  }
`

const NavBrowse = styled.div`
  font-family: Open Sans;
  cursor: pointer;
  @media (max-width: 600px) {
    visibility: hidden;
  }
`;

const NavProfile = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  margin-left: auto;
  cursor: pointer;
  @media (max-width: 900px) {
    visibility: hidden;
  }
`;

const UserProfile = styled.div`
  text-align: center;
  vertical-align: center;
  position: relative;
  top: 8px;
  cursor: pointer;
`;

const StyledLink = styled(Link)`
  color: ${props => props.theme.colors.grey};
  text-decoration: none;
  background-color: rgba(0,0,0,0);
`;

class Navigation extends React.Component {
  state = {
    searchTerm: "",
    searchToggle: false
  };
  inputRef = React.createRef();

  handleChange = e => {
    this.setState({ searchTerm: e.target.value });
  };

  handleSearchToggle = e => {
    this.setState(({ searchToggle }) => ({ searchToggle: !searchToggle}));
    this.inputRef.current.focus();
  }

  handleSubmit = e => {
    // preventDefault to avoid reloading entire page, which would be its default behavior
    e.preventDefault();
    if(this.state.searchToggle) return;
    if(!this.state.searchTerm) return;
    this.props.history.push(`/search?page=1&searchMedia=multi&searchTerm=${this.state.searchTerm}`);
  };

  render() {
    const { searchToggle } = this.state;
    return (
      <Navbar className="navbar">
        <NavItems>
          <StyledLink to="/">
            <NavLogo src={logo}></NavLogo>
          </StyledLink>
          <NavSearch>
            <SearchBar onSubmit={this.handleSubmit}>
              <SearchButton type="submit" onClick={this.handleSearchToggle}><i className="fa fa-search"></i></SearchButton>
              <SearchText ref={this.inputRef} value={this.state.searchTerm} onChange={this.handleChange} isShown={searchToggle}/>
            </SearchBar>
          </NavSearch>
          <StyledLink to="/browse">
            <NavBrowse>BROWSE</NavBrowse>
          </StyledLink>
          <NavProfile>
            <UserProfile>
              <i className="fa fa-user"></i>
            </UserProfile>
          </NavProfile>
        </NavItems>
      </Navbar>
    );
  }
}

// withRouter gives us access to the history
export default withRouter(Navigation);
