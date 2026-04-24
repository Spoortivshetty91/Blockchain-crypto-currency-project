import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="page-container">
        <h1>Welcome to Crypto Transaction System</h1>
        <p>Send and receive cryptocurrency securely.</p>
      </div>
    </>
  );
}