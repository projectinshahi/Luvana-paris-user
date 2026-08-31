"use client";

// Global error boundary — catches errors thrown in the root layout itself.
// It must render its own <html>/<body> because it replaces the whole tree,
// so it uses inline styles (globals.css/tokens may not be available here).
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1.25rem",
          padding: "1.5rem",
          textAlign: "center",
          background: "#fffdf9",
          color: "#2e2a26",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <h1 style={{ fontSize: "1.5rem", fontWeight: 600, margin: 0 }}>
          Something went wrong
        </h1>
        <p style={{ fontSize: "0.875rem", color: "#918980", margin: 0, maxWidth: "28rem" }}>
          A critical error occurred while loading the page. Please reload.
        </p>
        <button
          onClick={reset}
          style={{
            borderRadius: "9999px",
            background: "#8b5e3c",
            color: "#fffdf9",
            padding: "0.625rem 1.5rem",
            fontSize: "0.875rem",
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
