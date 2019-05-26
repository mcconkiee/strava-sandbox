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
            <span className="uk-margin-small-right"  />
            Previous
          </a>
        </li>
        <li className="uk-margin-auto-left">
          <a onClick={props.onNext}>
            Next <span className="uk-margin-small-left"  />
          </a>
        </li>
      </ul>
    </div>
  );
};
export default Pagination;
