import * as React from "react";

export interface PaginationProps {
  onNext: () => void;
  onPrev: () => void;
}

const Pagination = (props: PaginationProps) => {
  return (
    <div>
      <ul className="uk-pagination">
        <li>
          <a onClick={props.onPrev}>
            <span className="uk-margin-small-right" uk-pagination-previous={1} ></span>
            Previous
          </a>
        </li>
        <li className="uk-margin-auto-left">
          <a onClick={props.onNext}>
            Next <span className="uk-margin-small-left"  uk-pagination-next={1} />
          </a>
        </li>
      </ul>
    </div>
  );
};
export default Pagination;
