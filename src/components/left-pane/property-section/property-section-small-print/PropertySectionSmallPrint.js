import React from "react";

const PropertySectionSmallPrint = ({ unregistered }) => {
  return (
    <div className="property-details-info">
      <div className="property-details-info__small-print">
        {!unregistered && (
          <p>
            You can access title register documents for a small fee by visiting
            the{" "}
            <a
              href="https://search-property-information.service.gov.uk/search/search-by-inspire-id"
              target="_blank"
              rel="noopener noreferrer"
            >
              Land Registry website
            </a>{" "}
            using the above IDs.
          </p>
        )}
        <p>
          Information produced by HM Land Registry. © Crown copyright 2020.{" "}
          <br />
          Some data is displayed here for evaluation purposes only. For more
          information{" "}
          <a
            target="_blank"
            href="https://landexplorer.coop/land-ownership-how"
          >
            click here
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default PropertySectionSmallPrint;
