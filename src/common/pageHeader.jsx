import React from "react";

const PageHeader = ({ title, description }) => {
  return (
    <>
      <div className="row">
        <div className="col-12">
          <h1>{title}</h1>
        </div>
      </div>
      {description && (
        <div className="row mt-2">
          <div className="col-12 fs-5 mb-5">{description}</div>
        </div>
      )}
    </>
  );
};

export default PageHeader;
