import React from 'react'
import ProprietorCard from './proprietor-card/ProprietorCard'

const OwnershipDetails = ({
  tenure,
  inspireId,
  proprietors,
}) => {

  const proprietorCount = proprietors.length
  return (
    <section>
      <h3>Ownership</h3>
      <div>Proprietors: {proprietorCount}</div>
      <div>Tenure: {tenure}</div>
      <div>INSPIRE IDs: {inspireId}</div>
      {proprietors.map((proprietor, index) => (
        <ProprietorCard
          key={index}
          name={proprietor.name}
          address={proprietor.address}
          category={proprietor.category}
        />
      ))}
    </section>
  );
};
 
export default OwnershipDetails