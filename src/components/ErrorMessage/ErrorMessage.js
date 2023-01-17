import { Alert } from "antd";

function ErrorMessage({ text }) {
  return <Alert message={text} type="error" />;
}

export default ErrorMessage;
