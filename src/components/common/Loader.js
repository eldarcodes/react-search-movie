import React from 'react'

export default function Loader() {
  return (
    <div className="text-center">
      <div
        className="spinner-grow"
        style={{width: '80px', height: '80px', marginTop: '200px'}}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}
