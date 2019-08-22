import React, { Component } from 'react';
import debounce from 'lodash.debounce';

import { Searchbar, Meme, Screenshot, AsyncImage } from '../components';
import '../App.scss';
import movies from '../starwars/index';
import * as placeHolders from '../starwars/placeholder.json';

class PrequelMemes extends Component {

  constructor(props) {
    super(props);

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleMemeClick = this.handleMemeClick.bind(this);
    this.handleScroll = this.handleScroll.bind(this);

    this.state = {
      search: '',
      screenshot: false,
      screenshotImage: '',
      screenshotText: [],

      getIndex: this.searchlimit,
    };

    this.searchlimit = 3*5;
  }


  componentDidMount() {
    document.title = 'Star Wars - Search Movie Quotes'
    window.addEventListener('scroll', debounce(this.handleScroll, 100));
  }

  handleScroll() {
    console.log(`window.innerHeight ${window.innerHeight}`);
    console.log(`document.documentElement.scrollTop ${document.documentElement.scrollTop}`);
    console.log(`document.documentElement.offsetHeight ${document.documentElement.offsetHeight}`);
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      
      console.log('reached bottom');
      this.setState({getIndex: this.state.getIndex + this.searchlimit});
    }
  }

  buildScreenshot() {
    return (
      <Screenshot
        image={this.state.screenshotImage}
      // text = {this.state.screenshotText}
      />
    )
  }

  // handleMemeClick(image, text) {
  //   this.setState({
  //     screenshot: true,
  //     screenshotImage: image,
  //     screenshotText: text,
  //   });


  handleMemeClick(element) {
    this.setState({ screenshotImage: element });
    console.log(element);

    // console.log(image, text);
    // let img = document.createElement('img');
    // img.src = `${image}`;
    // img.style.width = '1280px';
    // p.style.position = 'absolute';
    // p.style.top = '-9999px';
    // p.style.left = '-9999px';
    // document.body.prepend(img);
    // html2canvas(p).then(canvas => {
    //   let a = document.createElement('a');
    //   a.href = canvas.toDataURL();
    //   a.download = 'test.png';
    //   a.click();
    // });
    // html2canvas(key).then(function(canvas) {
    //   console.log(canvas.toDataURL("image/jpg"));
    // });
  }

  handleSearchChange(event) {
    this.setState({
      search: event.target.value.replace(/[.,!?"'-]/g, '').toLowerCase().trim(),
      getIndex: this.searchlimit,
    });
  }

  buildGrid() {
    var imgs = [];
    let searchString = this.state.search;


    movies.forEach(movie => {
      movie.imgs.forEach(img => {
        if (img.sub.join(' ').replace(/[.,!?"'-]/g, '').toLowerCase().includes(searchString)) {
          // imgs.push(<Meme
          //   key={`${movie.id} ${img.id}`}
          //   src={`https://res.cloudinary.com/searchmoviequotes/image/upload/v1566439481/${img.src}`}
          //   alt={`${movie.id} ${img.id}`}
          //   text={img.sub}
          // />);
          imgs.push(<AsyncImage
            src={img.src}
            text={img.sub}
          />);
        }
      });
    });
    return imgs.slice(0, this.state.getIndex); // FIX: this is terrible because it searches redundantly
  }

  buildMemeModal() {

    const divStyle = { backgroundImage: `url(${this.state.modalImage})` }
    return (
      <div className="memeModalWrapper">
        <div className="memeModal">
          <div className="memeImage" style={divStyle}>
          </div>
        </div>
      </div >

    );
  }

  render() {
    return (
      <div className="App">
        {this.state.screenshot ? this.buildScreenshot() : null}
        <div className="gradientHeaderPreq"></div>
        <Searchbar onSearchChange={this.handleSearchChange} placeholder={placeHolders.default[Math.floor(Math.random() * placeHolders.default.length)]} />
        <div className="prequelBody">
          <div className="grid">
            {this.state.search.length >= 1 ? this.buildGrid() : null}
          </div>
        </div>
      </div>
    );
  }
}

export { PrequelMemes }