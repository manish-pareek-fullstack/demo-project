import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("Loading...");
  const [name, setName] = useState("");
  const [response, setResponse] = useState("");

  // Backend se data lena
  useEffect(() => {
    fetch("http://localhost:5000/api/hello")
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message);
      })
      .catch((error) => {
        console.error(error);
        setMessage("Backend connection failed");
      });
  }, []);

  // Backend ko data bhejna
  const sendMessage = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
        }),
      });

      const data = await res.json();

      setResponse(data.message);
    } catch (error) {
      console.error(error);
      setResponse("Something went wrong");
    }
  };

  return (
    <div className="app">
      <div className="card">
        <h1>Full Stack Test</h1>

        <p className="status">Frontend: React ✅</p>

        <p className="status">Backend: Express ✅</p>

        <div className="backend-message">
          <h2>Backend Response</h2>
          <p>{message}</p>
        </div>

        <div className="form">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button onClick={sendMessage}>Send to Backend</button>
        </div>

        {response && (
          <div className="response">
            <h3>Response:</h3>
            <p>{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
