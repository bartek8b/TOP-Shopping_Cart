import LoadingIcon from '../../assets/icons/arrows-spin-solid-full.svg?react';

export const Loader = () => {
  return (
    <>
      <LoadingIcon aria-hidden="true" />
      <p>Loading data...</p>
    </>
  );
};
