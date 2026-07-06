export default function LoadingSpinner({ message }) {
  return (
    <div className="loading-page">
      <div className="spinner"></div>

      <h2>{message}</h2>
    </div>
  );
}