import React from 'react';

const Pagination = ({ currentPage, setCurrentPage }) => {
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    return (
        <div className="pagination">
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                Previous
            </button>
            <span>Page {currentPage}</span>
            <button onClick={handleNextPage}>Next</button>
        </div>
    );
};

export default Pagination;