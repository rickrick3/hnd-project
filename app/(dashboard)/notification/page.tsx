import React from "react";



const NotificationPage: React.FC = () => {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <b><u><h1 style={{ marginBottom: "20px" }}>Notifications</h1></u> </b>
      
      <div style={{ marginBottom: "20px", textAlign: "left" }}>
        <div style={notificationBoxStyle}>
          <h2 style={alertStyle}>Alert Messages</h2>
          <p>
            <strong>Over Budget</strong> - Your expenses have exceeded the set
            budget limit.
          </p>
          <p>Sent: March 24, 2024 - 09:30 AM</p>
        </div>
        <div style={notificationBoxStyle}>
          <h2 style={alertStyle}>Alert Messages</h2>
          <p>
            <strong>Payment Due</strong> - Your credit card payment is due
            tomorrow.
          </p>
          <p>Sent: March 23, 2024 - 02:45 PM</p>
        </div>
      </div>
      <div style={{ marginBottom: "20px", textAlign: "left" }}>
        <div style={notificationBoxStyle}>
          <h2 style={warningStyle}>Warning Messages</h2>
          <p>
            <strong>Near Budget Limit</strong> - You have approaching your
            budget limit for the month.
          </p>
          <p>Sent: March 22, 2024 - 11:00 AM</p>
        </div>
        <div style={notificationBoxStyle}>
          <h2 style={warningStyle}>Warning Messages</h2>
          <p>
            <strong>Subscription Expiring</strong> - Your subscription plan is
            expiring in 3 days.
          </p>
          <p>Sent: March 20, 2024 - 04:15 PM</p>
        </div>
      </div>
      <div style={{ marginBottom: "20px", textAlign: "left" }}>
        <div style={notificationBoxStyle}>
          <h2>Other Information</h2>
          <p>
            <strong>New Expense Added</strong> - You have successfully added a
            new expense.
          </p>
          <p>Sent: March 19, 2024 - 08:00 AM</p>
        </div>
        <div style={notificationBoxStyle}>
          <h2>Other Information</h2>
          <p>
            <strong>Monthly Report</strong> - Your monthly expense report is
            ready for download.
          </p>
          <p>Sent: March 18, 2024 - 12:30 PM</p>
        </div>
      </div>
    </div>
  );
};

const notificationBoxStyle: React.CSSProperties = {
  border: "1px solid #ddd",
  borderRadius: "5px",
  padding: "10px",
  marginBottom: "10px",
};

const alertStyle: React.CSSProperties = {
  color: "#dc3545",
};

const warningStyle: React.CSSProperties = {
  color: "#ffc107",
};

export default NotificationPage;
