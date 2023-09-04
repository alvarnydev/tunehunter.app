export const ErrorAlert = (props: { errorMessage: string }) => {
  return (
    <div>
      <h1 className='text-4xl text-white'>Error</h1>
      <p className='text-white mx-10'>{props.errorMessage}</p>
    </div>
  );
};

export default ErrorAlert;
