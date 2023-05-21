import React, { useState } from "react";
import AdminPanel from "./Pages/AdminPanel";
import UserPanel from "./Pages/UserPanel";

const ParentComponent = () => {
  const [chlorineAmount, setChlorineAmount] = useState("");

  const handleChlorineAmountSubmit = (amount) => {
    setChlorineAmount(amount);
  };

  return (
    <div>
      <AdminPanel onChlorineAmountSubmit={handleChlorineAmountSubmit} />
      <UserPanel chlorineAmount={chlorineAmount} />
    </div>
  );
};

export default ParentComponent;
