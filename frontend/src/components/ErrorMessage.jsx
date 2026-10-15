export const ErrorMessage = ({ text }) => (
  <h1>
    <div className='position-absolute top-50 start-50 translate-middle text-warning'>{text}</div>
  </h1>
);
export default ErrorMessage;
