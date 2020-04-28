import React, {useEffect} from 'react'

export default function Popup({selected, closePopup}) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
  }, [])
  
  return (
    <section className="popup pt-5">
      <div className="content">
        <h2>
          {selected.Title} <span>({selected.Year})</span>
        </h2>
        <p className="rating">Rating: {selected.imdbRating}</p>
        <div className="plot">
          <img
            src={selected.Poster}
            alt={selected.Title}
            style={{maxHeight: '444px'}}
          />
          <ul
            className="list-group list-group-flush pt-0"
            style={{color: 'black'}}
          >
            <li className="list-group-item">
              <div className="row">
                <div className="col-2">Title: </div>
                <div className="col-10">{selected.Title}</div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="row">
                <div className="col-2">Plot: </div>
                <div className="col-10">{selected.Plot}</div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="row">
                <div className="col-2">Year: </div>
                <div className="col-10">{selected.Year}</div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="row">
                <div className="col-2">Director: </div>
                <div className="col-10">{selected.Director}</div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="row">
                <div className="col-2">Country: </div>
                <div className="col-10">{selected.Country}</div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="row">
                <div className="col-2">Genre: </div>
                <div className="col-10">{selected.Genre}</div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="row">
                <div className="col-2">Actors: </div>
                <div className="col-10">{selected.Actors}</div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="row">
                <div className="col-2">Runtime: </div>
                <div className="col-10">{selected.Runtime}</div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="row">
                <div className="col-2">Rating: </div>
                <div className="col-10">{selected.imdbRating}</div>
              </div>
            </li>
          </ul>
        </div>
        <div className="text-right">
          <button className="btn btn-danger px-4 py-2" onClick={closePopup}>
            Close
          </button>
        </div>
      </div>
    </section>
  )
}
