import { useState, useContext } from "react";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";

const SetupTwoFactor = () => {
  const { user } = useContext(AuthContext);
  const [qrCode, setQrCode] = useState("");
  const [secret, setSecret] = useState("");
  const [otp, setOtp] = useState("");

  const handleSetup = async () => {
    const { data } = await API.post("/2fa/setup");
    setQrCode(data.qrCode);
    setSecret(data.secret);
  };

  const handleVerify = async () => {
    const { data } = await API.post("/2fa/verify", { token: otp });
    alert(data.message);
  };

  return (
    <div>
      <h2>Setup Two-Factor Authentication</h2>
      {!qrCode ? (
        <button onClick={handleSetup}>Generate QR Code</button>
      ) : (
        <>
          <p>Scan this QR code in Google Authenticator:</p>
          <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrCode}`} alt="QR Code" />
          <p>Or use this secret: {secret}</p>
          <input type="text" placeholder="Enter OTP" onChange={(e) => setOtp(e.target.value)} />
          <button onClick={handleVerify}>Verify OTP</button>
        </>
      )}
    </div>
  );
};

export default SetupTwoFactor;
