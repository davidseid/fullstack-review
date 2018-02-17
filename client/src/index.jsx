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

  // componentDidMount() {
  //   // make an ajax get request to /repos
  //   $.ajax({
  //     url: '/repos',
  //     method: "GET",
  //     data: {},
  //     success: (repos) => {
  //       console.log('am i getting back my repos on my client??????')
  //       console.log(repos);
  //       console.log('this is this: ', this);
  //       this.setState({
  //         repos: repos
  //       });
  //     },
  //     error: (err) => {
  //       console.log('error making get request to /repos');
  //     }
  //   });


  // }

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    // Send Post request to /repos
    $.ajax({
      url: '/repos',
      method: "POST",
      data: JSON.stringify({data: term}),
      contentType: 'application/json',
      success: (data) => {
        console.log('success')
        console.log(data);

        
        $.ajax({
          url: '/repos',
          method: "GET",
          data: {},
          success: (repos) => {
            console.log('am i getting back my repos on my client??????')
            console.log(repos);
            console.log('this is this: ', this);
            this.setState({
              repos: repos
            });
          },
          error: (err) => {
            console.log('error making get request to /repos');
          }
        });

      },
      error: (err) => {
        console.log('error' + err);
      }
    });

    // $.ajax({
    //   url: '/repos',
    //   method: "GET",
    //   data: {},
    //   success: (repos) => {
    //     console.log('am i getting back my repos on my client??????')
    //     console.log(repos);
    //     console.log('this is this: ', this);
    //     this.setState({
    //       repos: repos
    //     });
    //   },
    //   error: (err) => {
    //     console.log('error making get request to /repos');
    //   }
    // });
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