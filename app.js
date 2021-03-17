class MyTitle extends React.Component {

    constructor(props){
        //Since we are extending the default constructor,
        //handle default activities first.
        super(props);
      
        //Extract the firstname from the prop
        let title = this.props.title
        //Please don't judge me by the way I extract the first name.
        //This is an example.
        
        //In the constructor, feel free to modify the
        //state property on the current context.
        this.state = {
            title: title
        }

    } //Look maa, no comma required in JSX based class defs!

    render() {
        return <h2><span className="badge bg-secondary">{this.state.title}</span></h2>
    }
}

class MyMain extends React.Component {
  
  constructor(props) {
    super(props);
	this.inputAngka = "";  
	this.query="raya";
	this.page=1;
	this.inputCek = "";
	this.items = [];
	this.bin = "";
    this.state = {rows1:[],inputAngka: '', result: "",items : [],rows:[],rowsSearch:[],FormSearchstyle:{
		display:"block"
	},FormCategorystyle:{
		display:"none"
	},FormDetail:{
		display:"none"
	}};
    this.handleSubmit = this.handleSubmit.bind(this);
	this.myCategory = this.myCategory.bind(this);
	this.getSearch = this.getSearch.bind(this);
	this.nextPage = this.nextPage.bind(this);
	this.beforePage = this.beforePage.bind(this);
	this.showMenuSearch = this.showMenuSearch.bind(this);
	this.showMenuCategory = this.showMenuCategory.bind(this);
 }
 componentDidMount() {
    fetch("https://api.themoviedb.org/3/movie/popular?api_key=b703e8213e3a53d5123f64ef56c52d8c&language=en-US")
      .then(res => res.json())
      .then(
        (result) => {
		  console.log(result.results);	
		  console.log(result.results[0]);	
		  this.setState({
             rows: result.results,
		  });
		  let rowsx = [];
		  rowsx[0] = result.results[0];
		  this.setState({
            rows1 : rowsx
		  });
		});
	fetch("https://api.themoviedb.org/3/search/movie?api_key=b703e8213e3a53d5123f64ef56c52d8c&language=en-US&query="+this.query)
      .then(res => res.json())
      .then(
        (result) => {
		  this.setState({
             rowsSearch: result.results,
		  });
		});	
  }
 
  
  handleSubmit(event) {
	this.inputAngka = event.target.inputAngka.value;
    this.setState({
             result: this.prosesCek()
    });
	event.preventDefault();
	
  } 
  
  myCategory(event) {
	let category = event.target.category.value;  
	if(category == 1){
		this.getAPICategory("https://api.themoviedb.org/3/movie/popular	?api_key=b703e8213e3a53d5123f64ef56c52d8c&language=en-US");
	}
	else if(category == 2){
		this.getAPICategory("https://api.themoviedb.org/3/movie/top_rated?api_key=b703e8213e3a53d5123f64ef56c52d8c&language=en-US");
	}
	else{
		this.getAPICategory("https://api.themoviedb.org/3/movie/now_playing?api_key=b703e8213e3a53d5123f64ef56c52d8c&language=en-US");
	}
	event.preventDefault();
  }
  
  getAPICategory(url) {
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
		  console.log(result.results);	
		  this.setState({
             rows: result.results
		  });
		})
  }
  
  prosesCek(){
	 var arr = [];
	 arr.push("Hasil 1 - "+this.inputAngka+" : ");	
	for(var i=1;i<=parseInt(this.inputAngka);i++){		
		if(parseInt(i) % 2 == 0){
			arr.push(i+" : Bilangan Genap");	
		}
		else{
			arr.push(i+" : Bilangan Ganjil");	
		}
	}
	
    return this.theResult(arr);
  }
  
  theResult(arr){
	  var result = "";
	for(var i=0;i<parseInt(arr.length);i++){		
		result += arr[i]+"<br/>";
	}  
	return result;
  }

  myChange(event) {
	var keynum
    if(window.event) {// IE8 and earlier
       keynum = event.keyCode;
    } else if(event.which) { // IE9/Firefox/Chrome/Opera/Safari
       keynum = event.which;
    } else {
       keynum = 0;
    }

    if(keynum === 8 || keynum === 0 || keynum === 9) {
        return;
    }
    if(keynum < 46 || keynum > 57 || keynum === 47) {
        event.preventDefault();
    } 
  } 
  
 
  getDetail(data) {
    console.log(data);
	   let rowsx = [];
       rowsx[0] = data;
	   this.setState({
            rows1 : rowsx,
			FormSearchstyle:{
		display:"none"
	},FormCategorystyle:{
		display:"none"
	},FormDetail:{
		display:"block"
	}
	   });
  }
  getSearch(event) {
	this.page = 1;
	this.query = event.target.inputSearch.value;
	fetch("https://api.themoviedb.org/3/search/movie?api_key=b703e8213e3a53d5123f64ef56c52d8c&language=en-US&query="+encodeURIComponent(this.query)+"&page="+this.page)
      .then(res => res.json())
      .then(
        (result) => {
			console.log(result.results);
	   this.setState({
            rowsSearch: result.results,
			FormSearchstyle:{
		display:"block"
	},FormCategorystyle:{
		display:"block"
	},FormDetail:{
		display:"none"
	}
	   });
		});	
	   event.preventDefault();
  }
  nextPage(event) {
	this.page++;
	console.log("https://api.themoviedb.org/3/search/movie?api_key=b703e8213e3a53d5123f64ef56c52d8c&language=en-US&query="+encodeURIComponent(this.query)+"&page="+this.page);
	fetch("https://api.themoviedb.org/3/search/movie?api_key=b703e8213e3a53d5123f64ef56c52d8c&language=en-US&query="+encodeURIComponent(this.query)+"&page="+this.page)
      .then(res => res.json())
      .then(
        (result) => {
			console.log(result.results);
	   this.setState({
            rowsSearch: result.results,
			FormSearchstyle:{
		display:"block"
	},FormCategorystyle:{
		display:"block"
	},FormDetail:{
		display:"none"
	}
	   });
		});	
	   event.preventDefault();
  }
  beforePage(event) {
	this.page--;
	console.log("https://api.themoviedb.org/3/search/movie?api_key=b703e8213e3a53d5123f64ef56c52d8c&language=en-US&query="+encodeURIComponent(this.query)+"&page="+this.page);
	fetch("https://api.themoviedb.org/3/search/movie?api_key=b703e8213e3a53d5123f64ef56c52d8c&language=en-US&query="+encodeURIComponent(this.query)+"&page="+this.page)
      .then(res => res.json())
      .then(
        (result) => {
			console.log(result.results);
	   this.setState({
            rowsSearch: result.results,
			FormSearchstyle:{
		display:"block"
	},FormCategorystyle:{
		display:"block"
	},FormDetail:{
		display:"none"
	}
	   });
		});	
	   event.preventDefault();
  }
  showIndex() {
	   this.setState({
			FormSearchstyle:{
		display:"block"
	},FormCategorystyle:{
		display:"block"
	},FormDetail:{
		display:"none"
	}
	   });
  }
  showMenuSearch() {
	   this.setState({
			FormSearchstyle:{
		display:"block"
	},FormCategorystyle:{
		display:"none"
	},FormDetail:{
		display:"none"
	}
	   });
  }
  showMenuCategory() {
	   this.setState({
			FormSearchstyle:{
		display:"none"
	},FormCategorystyle:{
		display:"block"
	},FormDetail:{
		display:"none"
	}
	   });
  }

	render() {
    return (
	<div>
	<nav className="navbar navbar-expand-lg navbar-light bg-primary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Menu</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#" onClick={this.showMenuSearch} >Search</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#" onClick={this.showMenuCategory} >Category</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
	<div className="form-row" style={this.state.FormDetail}>
	 <h3><span className="badge bg-info mt-4 text-start">Detail Movie</span></h3> 
	  {
		  this.state.rows1.map((k, v) => {     
           console.log("Entered");      
           let poster_path =  "https://image.tmdb.org/t/p/w500/" + k.poster_path;          
           // Return the element. Also pass key     
           return (
		    <div className="form-group col-md-3" key={String(k) + String(v)}>
			  <img className="form-control col-xl-3" src={poster_path} htmlFor="form-control" alt="Girl in a jacket" width="130" height="130"/> 
			  <label className="form-control col-md-12" htmlFor="inputEmail4">Vote Count : {k.vote_count}</label>
			   <label className="form-control col-md-12" htmlFor="inputEmail4">Release Date : {k.release_date}</label>
			</div>
		   ) 
        })
	  
	  }
	   <button type="submit" onClick={this.showIndex} className="btn btn-primary mt-3">Return</button>
  </div>
  <div style={this.state.FormSearchstyle}>
     <form className="mt-3" onSubmit={this.getSearch}>
	 <h2><span className="badge bg-secondary">Search Movie TMDB</span></h2>
  <div className="mb-3">
    <label htmlFor="inputSearch" className="form-label">Keyword</label>
    <input type="text" className="form-control" id="inputSearch" name = "inputSearch" required/>
  </div>
  <button type="submit" className="btn btn-primary mb-2 ">Search</button>
</form>
<div className="row">
          <div className="col">
            <table className="table table-dark">
			   <thead>
				<tr>
				  <th scope="col">#</th>
				  <th scope="col">Title</th>
				  <th scope="col">Vote Count</th>
				  <th scope="col">Image</th>
				  <th scope="col">Release Date</th>
				</tr>
			  </thead>
               <tbody>
			    {
				   
				   this.state.rowsSearch.map((k, v) => {  
				   var page = v+1;
        		   if(this.page > 1){
					   page=(20*(this.page-1))+v+1;
				   }   					
				   let poster_path =  "https://image.tmdb.org/t/p/w500/" + k.poster_path;          
				   // Return the element. Also pass key     
				   return (
				   <tr key={String(k) + String(v)}><th scope="col">{page}</th>
				   <th scope="col">{k.title}</th>
				   <th scope="col">{k.vote_count}</th>
				   <th scope="col"> <img src={poster_path} onClick={() => this.getDetail(k)} alt="Girl in a jacket" width="130" height="130"/> </th>
				   <th scope="col">{k.release_date}</th>
				   </tr>) 
				})}
               </tbody>
              </table>
          </div>
		<div className="row g-3 align-items-center">
  <div className="col-auto">
     <button type="submit" className="form-control btn btn-primary" onClick={this.beforePage}>Before Page</button>
  </div>
  <div className="col-auto">
     <button type="submit" className="form-control btn btn-primary" onClick={this.nextPage}>Next Page</button>
  </div>
</div>

		 
</div>
</div>
<div style={this.state.FormCategorystyle}>
<form onSubmit={this.myCategory} className="mt-3">
<h2><span className="badge bg-secondary">Category Movie TMDB</span></h2>
   <div className="mb-3">
    <label htmlFor="category" className="form-label">Category</label>
    <select name="category" id="category" className="form-control">
  <option value="1">Popular Movie</option>
  <option value="2">Top Rated Movie</option>
  <option value="3">Now Playing Movie</option>
</select>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
   <h3><span className="badge bg-info mt-4 text-start" dangerouslySetInnerHTML={{__html: this.state.result}}></span></h3> 
</form>
<div className="row">
          <div className="col">
            <table className="table table-dark">
			   <thead>
				<tr>
				  <th scope="col">#</th>
				  <th scope="col">Title</th>
				  <th scope="col">Vote Count</th>
				  <th scope="col">Image</th>
				  <th scope="col">Release Date</th>
				</tr>
			  </thead>
               <tbody>
			    {this.state.rows.map((k, v) => {     
				   console.log("Entered");      
				   let poster_path =  "https://image.tmdb.org/t/p/w500/" + k.poster_path;          
				   // Return the element. Also pass key     
				   return (
				   <tr key={String(k) + String(v)}><th scope="col">{v+1}</th>
				   <th scope="col">{k.title}</th>
				   <th scope="col">{k.vote_count}</th>
				   <th scope="col"> <img src={poster_path} onClick={() => this.getDetail(k)} alt="Girl in a jacket" width="130" height="130"/> </th>
				   <th scope="col">{k.release_date}</th>
				   </tr>) 
				})}
               </tbody>
              </table>
          </div>
</div>

</div>
</div>
    );
  }
}

var theTitle = "TMDB";

ReactDOM.render(<MyMain/>, 
                document.getElementById('mymain'));		
document.title=theTitle;									