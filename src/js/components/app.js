import React, { Component } from 'react';
import ReactDOM from 'react-dom';


class App extends Component{
	constructor(){
		super();
    this.state = {
      loading: true,
      data: [],
      error: false,
      search: "",
      sort: "",
      filter: ""
    }

    this.onValueChange = this.onValueChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);


	}

  componentDidMount(){
    this.url = "http://starlord.hackerearth.com/movieslisting";
    fetch(this.url)
      .then(response => response.json())
        .then(data => {
          data.map((item, index) => {
            var genres = item.genres;
            item.genres = genres.split("|");
            var plot = item.plot_keywords;
            item.plot_keywords = plot.split("|");
            item.movie_title = item.movie_title.trim();
          });
          // console.log(data.length)
          // data.map((item, index) => {
          //    console.log(item);
          //     var imdbUlr = item.movie_imdb_link;
          //     var id = imdbUlr.substr(26,9);
          //     // console.log(id);
          //     var fetchImdbUrl = "http://www.omdbapi.com/?i=" + id + "&apikey=9e856cd8";
          //     console.log(fetchImdbUrl)
          //     fetch(fetchImdbUrl)
          //     .then(response => response.json())
          //     .then(resData => {
          //                   console.log(resData);
          //                   item.imdbRating = resData.imdbRating;
          //                   item.metascore = resData.Metascore;
          //                   item.image = resData.Poster;
          //                   console.log(resData.imdbRating + 'done');
          //     })
          //     .catch(error => console.log(error));
          // })
          this.setState({data, originalData: data, loading: false});
        })
        .catch(error => this.setState({ error, loading: false }));
  }

  onValueChange(event){
    event.preventDefault();
    var targetId = event.target.id;
    var newState = {};
    newState[targetId] = event.target.value;
    this.setState(newState);
    // console.log(this.state);
  }

  onSubmit(event){
    event.preventDefault();
    var data = this.state.originalData;
    if(this.state.search != "" && this.state.search != ""){
      // console.log(this.state.search);
      data = data.filter(item =>  item.movie_title.toLowerCase() === this.state.search.toLowerCase())
    }
    if(this.state.filter != "" && this.state.filter != ""){
      if(this.state.sort == "year"){
        data = data.sort((a,b) =>  parseInt(a.title_year) - parseInt(b.title_year))
      }
    }
    // if(this.state.sort != "" && this.state.sort != ""){
    //   if(this.state.sort == "language"){
    //     data = data.sort(item =>  item.movie_title.toLowerCase() === this.state.search.toLowerCase())
    //   }
    // }
    this.setState({data});
    
  }

	render(){
    const {loading, data} = this.state;
    let dataArr = [];
    data.map((item, index) => {
      dataArr.push(
        <div key = {index}>
          <br />
          <li className="media" >
            <img className="align-self-center mr-5 hidden-sm-down" src="https://via.placeholder.com/128x256" alt="Generic placeholder image"  />
            <div className="media-body mt-2">
              <h4 className="mt-0 mb-3 media-heading"><a href = {item.movie_imdb_link} target="_blank"><strong>{item.movie_title}</strong></a></h4>
              <h6 className="mt-0 mb-1 media-item"><strong className = "item-strong">Director name : </strong> {item.director_name}</h6>
              <h6 className="mt-0 mb-1 media-item"><strong className = "item-strong">Main actor : </strong> {item.actor_1_name}</h6>
              <h6 className="mt-0 mb-1 media-item"><strong className = "item-strong">Supporting actor : </strong> {item.actor_2_name}</h6>
              <h6 className="mt-0 mb-1 media-item"><strong className = "item-strong">Genres : </strong> 
                {item.genres.map((item, index) =>
                  <span className="badge badge-pill badge-secondary mr-2" key={index}>{item}</span>
                )}
              </h6>              
              <h6 className="mt-0 mb-1 media-item"><strong className = "item-strong">Language : </strong> {item.language}</h6>
              <h6 className="mt-0 mb-1 media-item"><strong className = "item-strong">Country : </strong> {item.country}</h6>
              <h6 className="mt-0 mb-1 media-item"><strong className = "item-strong">Content rating : </strong> {item.content_rating}</h6>
              <h6 className="mt-0 mb-1 media-item"><strong className = "item-strong">Budget : </strong> {item.budget}</h6>
              <h6 className="mt-0 mb-1 media-item"><strong className = "item-strong">Year : </strong> {item.title_year}</h6>
              <h6 className="mt-0 mb-1 media-item"><strong className = "item-strong">Plot : </strong> 
                {item.plot_keywords.map((item, index) =>
                  <span className="badge badge-pill mr-2" key={index} style={{backgroundColor: "#38b4d8", color:"white"}}>{item}</span>
                )}
              </h6>
            </div>
          </li>
          <hr />
        </div>
      );
    })

  if(loading){
    return(
      <div className="progress" style={{marginTop: "25%"}}>
        <div className="progress-bar progress-bar-striped progress-bar-animated bg-info" role="progressbar" 
        aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" 
        style={{width: "75%"}}></div>
      </div>
    );
  }
  else{
    return(
      <div>
        <br />
        <h1 style={{color: "#226A7F"}}> Movie Searcher </h1>
        <form className="form-inline">
          <div className="form-group">
            <label className="mr-2" htmlFor="search">Search Title : </label>
            <input type="text" className="form-control mb-2 mr-2 mt-1" id="search" placeholder="Enter title to search" onChange={this.onValueChange} />
          </div>
          <div className="form-group">
            <label htmlFor="sort" className="mr-2">Sort by:</label>
            <select className="form-control mr-2 mb-2 " id="sort" onChange={this.onValueChange}>
              <option value="">None</option>
              <option value="year">year</option>
              <option value="rating">rating</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="filter" className="mr-2">Filter by:</label>
            <select className="form-control mr-2 mb-2 " id="filter" onChange={this.onValueChange}>
              <option value="">None</option>
              <option value="language">language</option>
              <option value="country">country</option>
            </select>
          </div>
          <button className="btn btn-success ml-2" type="submit" onClick={this.onSubmit} style={{marginTop:"0px"}}>Submit</button>
        </form>
         
        <div> {dataArr} </div>
      </div>
   )
  }
 }
}

export default App;