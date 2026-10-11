// ErrorBanner - red box shown above a form when an API call fails.
// Renders nothing when message is empty, so you can always include it.
function ErrorBanner({ message }) {
  if (!message) return null;
  return (
    <div
      style={{
        width: "100%",
        padding: "10px 14px",
        borderRadius: "8px",
        backgroundColor: "rgba(239,68,68,0.12)",
        border: "1px solid rgba(239,68,68,0.5)",
        color: "#fca5a5",
        fontSize: "13px",
      }}
    >
      {message}
    </div>
  );
}

export default ErrorBanner;
