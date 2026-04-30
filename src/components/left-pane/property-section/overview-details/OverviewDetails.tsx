type Props = {
  address: string | null;
  area: number;
  perimeter: number;
  polyIds: any[];
  unregistered: boolean;
  freehold: boolean;
};

const OverviewDetails = ({
  address,
  area,
  perimeter,
  polyIds,
  unregistered,
  freehold,
}: Props) => {
  const isLongAddress = address && address.length > 70;

  return (
    <section>
      <div className="property-inner-section">
        <h3 className="property-inner-section__title">
          <i className="property-inner-section__icon overview-icon"></i>
          <span>Overview</span>
        </h3>
        {isLongAddress && (
          <div className="property-details-info">
            <div className="property-details-info__title">Full Address:</div>
            <div className="property-details-info__value">{address}</div>
          </div>
        )}
        <div className="property-details-info">
          <div className="property-details-info__inner">
            <div className="property-details-info__title">
              Area {polyIds.length > 1 ? "(total)" : ""}:
            </div>
            <div className="property-details-info__value">
              {area} m<sup>2</sup>
            </div>
          </div>
          <div className="property-details-info__inner">
            <div className="property-details-info__title">
              Perimeter {polyIds.length > 1 ? "(total)" : ""}:
            </div>
            <div className="property-details-info__value">{perimeter} m</div>
          </div>
          {!unregistered && (
            <div className="property-details-info__inner">
              <div className="property-details-info__title">
                {freehold ? "INSPIRE" : "HMLR Poly"}{" "}
                {polyIds.length > 1 ? "IDs" : "ID"}:
              </div>
              <div className="property-details-info__value">
                {polyIds.join(", ")}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default OverviewDetails;
