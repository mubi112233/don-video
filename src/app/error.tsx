import React from "react";

export default function AppError({ error }: { error: Error }) {
  // Log the full error on the server so Vercel logs capture the stack/digest
  // This runs during server rendering.
  // eslint-disable-next-line no-console
  console.error("Server render error:", error);

  return (
    <html>
      <body>
        <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div style={{ maxWidth: 720 }}>
            <h1 style={{ fontSize: 28, marginBottom: 8 }}>Something went wrong</h1>
            <p style={{ marginBottom: 8 }}>A server error occurred while rendering the page. The team has been notified.</p>
            <details style={{ whiteSpace: "pre-wrap" }}>
              <summary>Show error (server)</summary>
              <pre>{String(error?.message ?? "No message")}</pre>
            </details>
          </div>
        </main>
      </body>
    </html>
  );
}
