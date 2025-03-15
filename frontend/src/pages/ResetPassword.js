import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post(`/password/reset-password/${token}`, { password });
      setMessage(data.message);
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setMessage("Error resetting password");
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleResetPassword}>
        <input type="password" placeholder="Enter new password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
