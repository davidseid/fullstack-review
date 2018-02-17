import React from 'react';

const Repo = (props) => {
  return (
    <div className="repo">
      <div>
        {props.repoData.forks_count}
      </div>
      <div>
        <a href={props.repoData.url}>{props.repoData.repo_name}</a>
      </div>
    </div>
  )
}

export default Repo;