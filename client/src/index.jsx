import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }

  }

  componentDidMount() {
    this.fetchRepos();
  }

  search (term) {
    console.log(`${term} was searched`);
    $.ajax({
      url: '/repos',
      method: "POST",
      data: JSON.stringify({data: term}),
      contentType: 'application/json',
      success: (data) => {
        console.log('Succesfully posted username repos to the database');
        console.log('Result from post request is ', data);
        this.fetchRepos();


      },
      error: (err) => {
        console.log('error' + err);
      }
    });

  }

  fetchRepos () {

    $.ajax({
      url: '/repos',
      method: "GET",
      data: {},
      success: (repos) => {
        console.log('Successfully complete a GET request for top 25 repos from the db');
        console.log('Result from GET request is ', repos, this);
        this.setState({
          repos: repos
        });
      },
      error: (err) => {
        console.log('error making get request to /repos');
      }
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));