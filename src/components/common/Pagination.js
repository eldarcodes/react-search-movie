import React from 'react'

export default function Pagination({currentPage, pages, changePage}) {
  if (pages.length > 15) {
    pages.splice(15)
  }

  return (
    <nav>
      <ul className="pagination justify-content-center">
        <li
          className={`page-item ${currentPage === 1 && 'disabled'}`}
          onClick={() => {
            currentPage !== 1 && changePage(currentPage - 1)
          }}
        >
          <button className="page-link ">Previous</button>
        </li>
        {pages.map((page) => (
          <li
            onClick={() => {
              changePage(page)
            }}
            key={page}
            className={`page-item ${currentPage === page && 'active'}`}
          >
            <button className="page-link">{page}</button>
          </li>
        ))}
        <li
          className={`page-item ${currentPage === pages.length && 'disabled'}`}
          onClick={() => {
            currentPage !== pages.length && changePage(currentPage + 1)
          }}
        >
          <button className="page-link">Next</button>
        </li>
      </ul>
    </nav>
  )
}
