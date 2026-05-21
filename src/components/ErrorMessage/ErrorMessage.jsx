import ErrorIcon from '../../assets/icons/triangle-exclamation-solid-full.svg?react';

export const ErrorMessage = ({ type }) => {
  let message = 'Something went wrong. Please try again later.';

  if (type === 'fetch') {
    message = 'Unable to load products right now.';
  }

  if (type === 'route') {
    message = 'Page not found.';
  }

  return (
    <>
      <ErrorIcon aria-hidden="true" />
      <p>{message}</p>
    </>
  );
};
