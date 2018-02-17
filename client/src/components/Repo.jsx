import React from 'react';

const Repo = (props) => {
  return (
    <div className="repo">
      <div>
        {props.repoData.id}
      </div>
      <div>
        {props.repoData.repo_name}
      </div>
      <div>
        {props.repoData.url}
      </div>
      <div>
        {props.repoData.forks_count}
      </div>
    </div>
  )
}

export default Repo;