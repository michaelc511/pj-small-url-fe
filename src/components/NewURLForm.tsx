import { useState } from "react";

export function NewURLForm() {
  // export function NewTodoForm(props) {

  const [newURL, setNewURL] = useState("");
  const [shortenedURL, setShortenedURL] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  function handleSubmit(e: any) {
    e.preventDefault(); // prevents the default for page to refresh
  

    // onSubmit(newURL)
    if (!newURL) { 
        setErrorMsg("URL cannot be blank");
        return;
    }

    if (!newURL.startsWith("http://") && !newURL.startsWith("https://")) { 
        setErrorMsg("URL must start with 'http://' or 'https://'"   )
        return;
    }
    setNewURL(newURL); // resets it to blank
    setErrorMsg(""); // resets it to blank

    const protocol: string = getProtocol(newURL);

    setShortenedURL(protocol + "aaa"); // resets it to blank
  }

  function getProtocol(url: string) {
    const protocolEndIndex: number = url.indexOf("://");
    if (protocolEndIndex !== -1) {
      return url.substring(0, protocolEndIndex + 3); // Include the '://'
    }
    return ""; // Return empty string if no protocol is found
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(shortenedURL).then(() => {
      // Possibly show some feedback to the user that the URL was copied
      console.log("URL copied to clipboard!");
    });
  };

  return (
    <div className="container">
      <header className="header">
        <h1>URL Shortener</h1>
        <p className="small-text">Enter the URL to shorten</p>{" "}
        {/* This line adds the top label */}
      </header>

      <form
        onSubmit={handleSubmit}
        className="url-form"
      >
        <div className="input-group">
          <label htmlFor="url">
            URL {newURL} : {shortenedURL} : <span className='error'>{errorMsg} </span> 
          </label>
          <input
            value={newURL}
            onChange={(e) => setNewURL(e.target.value)}
            type="text"
            id="url"
            className="url-input"
            placeholder="https://example.com/foo/bar"
          />
        </div>
        <button
          type="submit"
          className="shorten-btn"
          disabled={!!shortenedURL}
        >
          Shorten
        </button>
      </form>
      {shortenedURL && (
        <div className="success-message">
          <p>Success! Here's your short URL:</p>
          <div className="short-url">
            <input
              type="text"
              value={shortenedURL}
              readOnly
            />
            <button
              onClick={handleCopy}
              className="copy-btn"
            >
              Copy
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
