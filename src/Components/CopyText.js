import React, { useState } from "react";
import { FaCopy } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";

const CopyText = () => {
  const [copied, setCopied] = useState(false);
  const testCardNumber = "4242424242424242"; // Example Stripe test card number

  const handleCopy = () => {
    navigator.clipboard
      .writeText(testCardNumber)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000); // Reset after 3 seconds
      })
      .catch((err) => console.error("Failed to copy text:", err));
  };

  return (
    <div className="w-96 p-4 border-2 border-accent rounded">
      <div className="w-100 flex justify-between">
        <div>
          {" "}
          <p>
            <span className="text-accent font-semibold">Test Card Number:</span>{" "}
            {testCardNumber}
          </p>
        </div>
        <div>
          <button
            onClick={handleCopy}
            style={{ cursor: "pointer", background: "none", border: "none" }}
          >
            {copied ? (
              <FaCheckCircle size={20} color="green" /> // Show green check icon when copied
            ) : (
              <FaCopy size={20} />
            )}
          </button>
        </div>
      </div>
      <div className="divider"></div>
      <div>
        <p>
          <span className="text-accent font-semibold">Date:</span> Any future
          Date
        </p>
      </div>
      <div>
        <p>
          <span className="text-accent font-semibold">CVC:</span> Any 3 digits
        </p>
      </div>
      <div>
        <p>
          <span className="text-accent font-semibold">ZIP:</span> Any 5 digits
        </p>
      </div>
    </div>
  );
};

export default CopyText;
