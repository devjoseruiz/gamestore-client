import { Pagination as PaginationSUI } from "semantic-ui-react";
import { useRouter } from "next/router";
import queryString from "query-string";

export default function Pagination(props) {
  const { totalGames, currentPage, limitPerPage } = props;
  const totalPages = Math.ceil(totalGames / limitPerPage);
  const router = useRouter();
  const urlParse = queryString.parseUrl(router.asPath);

  const goToPage = (newPage) => {
    urlParse.query.page = newPage;
    const url = queryString.stringifyUrl(urlParse);
    router.push(url);
  };

  return (
    <div className="pagination">
      <PaginationSUI
        defaultActivePage={currentPage}
        totalPages={totalPages}
        firstItem={null}
        lastItem={null}
        onPageChange={(_, data) => goToPage(data.activePage)}
        boundaryRange={0}
        siblingRange={1}
        ellipsisItem={null}
      />
    </div>
  );
}
