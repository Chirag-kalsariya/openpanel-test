'use client';

import { useOpenPanel } from "@openpanel/nextjs";
import { useState } from "react";

export default function Home() {
  const op = useOpenPanel();
  const [status, setStatus] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleTrackEvent = async () => {
    try {
      setError("");
      setStatus("Tracking event...");

      op.track('user_login', {
        mobileNo: '+1234567890',
        userId: 'user_123',
        timestamp: new Date().toISOString()
      });

      setStatus("Event tracked successfully!");
      setTimeout(() => setStatus(""), 3000);
    } catch (err) {
      setError(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setStatus("");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-900">
      <div className="flex flex-col items-center gap-6 p-8 bg-white dark:bg-zinc-800 rounded-lg shadow-lg max-w-md">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          OpenPanel Event Tracking
        </h1>

        <button
          onClick={handleTrackEvent}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          Track Login Event
        </button>

        {status && (
          <p className="text-green-600 dark:text-green-400 font-medium">
            {status}
          </p>
        )}

        {error && (
          <p className="text-red-600 dark:text-red-400 font-medium">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
