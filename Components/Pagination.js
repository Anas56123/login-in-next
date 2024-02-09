export default function Pagination({
  postPerPage,
  totalPosts,
  paginate,
  nextPage,
  prevPage,
}) {
  const pageNumbers = [];
  let num;

  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        <li className="pagination-item">
          <button
            onClick={() => prevPage(num)}
            className="pagination-button"
          >
            {"<prev"}
          </button>
        </li>
        {pageNumbers?.map((number) => {
            num = number
          return (
            <li key={number} className="pagination-item">
              <button
                onClick={() => paginate(number)}
                className="pagination-button"
              >
                {number}
              </button>
            </li>
          );
        })}
        <li className="pagination-item">
          <button
            onClick={() => nextPage(num)}
            className="pagination-button"
          >
            {"next>"}
          </button>
        </li>
      </ul>
    </nav>
  );
}
