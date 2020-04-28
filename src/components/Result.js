import React from 'react'

export default function Result({result, openPopup}) {
  return (
    <div
      onClick={() => openPopup(result.imdbID)}
      className="card my-3 shadow"
      style={{width: '18rem', cursor: 'pointer'}}
    >
      {result.Poster === "N/A" ? (
        <img src="https://via.placeholder.com/286x444" alt={result.Title} />
      ) : (
        <img src={result.Poster} alt={result.Title} />
      )}
      <div className="card-body">
        <h4>
          {result.Title} ({result.Year})
        </h4>
      </div>
    </div>
  )
}
