"use client";

import React, { useState, useEffect } from "react";

interface Message {
  message: string;
  response: string;
  timestamp: string;
}

const MessageDisplay = () => {
  const [senders, setSenders] = useState<Record<string, Message[]>>({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<string | null>(null);

  // New: Passcode state
  const [passcode, setPasscode] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);

  const fetchMessages = async (currentPage: number, code: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:3001/user-list-secret?page=${currentPage}&limit=10&passcode=${code}`
      );
      const data = await response.json();

      if (response.ok) {
        setSenders(data.senders);
        setTotalPages(data.totalPages);
        setPage(currentPage);

        if (Object.keys(data.senders).length > 0 && !activeTab) {
          setActiveTab(Object.keys(data.senders)[0]);
        }
      } else {
        setError(data.message || "Invalid passcode or error fetching data");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when authorized and page changes
  useEffect(() => {
    if (isAuthorized) {
      fetchMessages(page, passcode);
    }
  }, [page, isAuthorized]);

  const renderMessages = () => {
    if (!activeTab) {
      return <p>No user selected.</p>;
    }

    const messages = senders[activeTab];

    if (!messages) {
      return <p>No messages available for this user.</p>;
    }

    if (!Array.isArray(messages)) {
      return <p>Data error: Messages are not in the expected format.</p>;
    }

    return messages.map((msg, index) => (
      <div key={index} className="message">
        <p>
          <strong>Message:</strong> {msg.message}
        </p>
        <p>
          <strong>Response:</strong> {msg.response}
        </p>
        <p>
          <small>
            <strong>Timestamp:</strong>{" "}
            {new Date(msg.timestamp).toLocaleString()}
          </small>
        </p>
      </div>
    ));
  };

  const renderTabs = () => {
    return Object.keys(senders).map((userKey) => (
      <button
        key={userKey}
        className={`tab-button ${activeTab === userKey ? "active" : ""}`}
        onClick={() => setActiveTab(userKey)}
      >
        {userKey}
      </button>
    ));
  };

  if (!isAuthorized) {
    return (
      <div className="auth-container">
        <h2>Enter Passcode</h2>
        <input
          type="password"
          value={passcode}
          onChange={(e) => setPasscode(e.target.value)}
          placeholder="Enter passcode"
        />
        <button onClick={() => setIsAuthorized(true)}>Submit</button>
      </div>
    );
  }

  return (
    <div className="message-container">
      <h1>Message Data</h1>

      <div className="tabs">{renderTabs()}</div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="messages">{renderMessages()}</div>

      <div className="pagination">
        <button
          className="pagination-button"
          disabled={page <= 1 || loading}
          onClick={() => fetchMessages(page - 1, passcode)}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          className="pagination-button"
          disabled={page >= totalPages || loading}
          onClick={() => fetchMessages(page + 1, passcode)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MessageDisplay;
