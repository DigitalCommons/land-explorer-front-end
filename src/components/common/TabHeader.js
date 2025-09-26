import React from "react";

const TabHeader = ({ tabs = [], activeTab, onTabChange }) => {

    console.log("Rendering TabHeader", { tabs, activeTab });
  return (
    <div className="tab-header">
      {tabs.map((t) => (
        <button
          key={t.key}
          className={`tab-header__item ${activeTab === t.key ? "active" : ""}`}
          onClick={() => onTabChange && onTabChange(t.key)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onTabChange && onTabChange(t.key);
            }
          }}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
};

export default TabHeader;
