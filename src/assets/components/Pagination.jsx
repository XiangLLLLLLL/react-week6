function Pagination({ getData, pageInfo }) {
  const handlePageSwitch = (page) => {
    getData(page);
  };
  return (
    <ul className="pagination d-flex justify-content-center">
      <li className={`page-item ${!pageInfo?.has_pre && `disabled`}`}>
        <span onClick={() => handlePageSwitch(pageInfo?.current_page - 1)} className="page-link">
          上一頁
        </span>
      </li>
      {Array.from({ length: pageInfo?.total_pages }).map((_, index) => {
        return (
          <li className={`page-item ${pageInfo?.current_page === index + 1 && `active`}`} key={index}>
            <span onClick={() => handlePageSwitch(index + 1)} className="page-link">
              {index + 1}
            </span>
          </li>
        );
      })}
      <li className={`page-item ${!pageInfo?.has_next && `disabled`}`}>
        <span onClick={() => handlePageSwitch(pageInfo?.current_page + 1)} className="page-link">
          下一頁
        </span>
      </li>
    </ul>
  );
}

export default Pagination;
