import React from 'react'

const ProprietorCard = ({ name, address, category }) => {
  return (
    <div>
      <div>{name}</div>
      <div>{address}</div>
      <div>{category}</div>
    </div>
  );
};

export default ProprietorCard