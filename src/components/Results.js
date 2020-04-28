import React from 'react'
import Result from './Result'

export default function Results({results, totalResults, error, openPopup}) {
  return (
    <div>
      {totalResults && !error && (
        <h5 className="mt-2">Всего результатов: {totalResults}</h5>
      )}

      {error ? (
        <div class="alert alert-danger d-block" role="alert">
          {error}
        </div>
      ) : (
        <section className="d-flex flex-wrap justify-content-between mt-3 results">
          {results.map((result, i) => (
            <Result key={i} result={result} openPopup={openPopup} />
          ))}
        </section>
      )}
    </div>
  )
}
