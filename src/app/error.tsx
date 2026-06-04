"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ maxWidth: 720 }}>
        <h1 style={{ fontSize: 28, marginBottom: 8 }}>Something went wrong</h1>
        <p style={{ marginBottom: 8 }}>A server error occurred while rendering the page.</p>
        <details style={{ whiteSpace: "pre-wrap", marginBottom: 16 }}>
          <summary>Show error</summary>
          <pre>{String(error?.message ?? "No message")}</pre>
        </details>
        <button onClick={reset}>Try again</button>
      </div>
    </main>
  );
}
