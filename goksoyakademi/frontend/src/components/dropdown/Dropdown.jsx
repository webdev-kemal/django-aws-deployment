import React from "react";
import "./Dropdown.css";

const Dropdown = ({ data, collectionChange, setCollectionChange }) => {
  return (
    <div>
      <div className="dropdown m-3">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {collectionChange}
        </button>
        <ul className="dropdown-menu">
          {data.map((collection) => {
            return (
              <li key={collection}>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={(e) => setCollectionChange(e.target.textContent)}
                >
                  {collection}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
