import React from 'react'
import './component.css'

export default function Pagination({ monumentsPerPage, totalMonuments, currentPage, paginate }) {
    const totalPages = Math.ceil(totalMonuments/monumentsPerPage);
    const pageNumbers = [];
    for(let i = 1; i <= Math.min(totalPages, 20); i++) {
        pageNumbers.push(i);
    }
    if (currentPage > totalPages || currentPage < 1) {
        paginate(1);
    }
    
    const navigate = (number) => {
        paginate(number)
        // window.history.pushState(null, null, `/artifacts/${number}`)
    }

     if(totalPages > 1) {
        return (
            <nav>
               
                <ul className='pagination'>
                <li className={ currentPage === 1 ? 'd-none' : 'page-item' }><div onClick={() => navigate(--currentPage)} className='page-link page-item'>Prev</div></li>
                {pageNumbers.map(number => (
                    <li key={number} className={ number === currentPage ? 'page-item active' : 'page-item'}>
                        <div onClick={() => navigate(number)} className='page-link page-item'>{number}</div>
                    </li>
                ))}
                <li className={ currentPage === pageNumbers.length ? 'd-none' : 'page-item' }><div onClick={() => navigate(++currentPage)} className='page-link page-item'>Next</div></li>
                </ul>
               
            </nav>
        )
     } else {
         return (
             <span></span>
         )
     }
}