function NetworkDetector({ onNetworkState }) {
  window.onoffline = () => {
    onNetworkState();
  };

  window.ononline = () => {
    onNetworkState();
  };
}
export default NetworkDetector;
