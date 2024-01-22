import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const PaginateStocksAdmin = ({
  pages,
  page,
  isManager = false,
  keyword = '',
}) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              !isManager
                ? keyword
                  ? `/search/${keyword}/page/${x + 1}`
                  : `/page/${x + 1}`
                : `/stockAdmin/stocklist/mylist/page/${x + 1}`
            }
          >
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

export default PaginateStocksAdmin;
