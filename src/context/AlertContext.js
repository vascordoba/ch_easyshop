import React, { createContext, useState } from "react";

const AlertContext = createContext([]);

export const AlertProvider = ({ defaultValue, children }) => {
  const [alerts, setAlerts] = useState(defaultValue || []);
  const [alertId, setAlertId] = useState(1);

  function addAlert(alert) {
    const newAlert = {
      id: alertId,
      type: alert.type,
      title: alert.title,
      body: alert.body,
    };
    setAlerts([...alerts, newAlert]);
    setAlertId(alertId + 1);
  }

  function clearAlerts() {
    setAlerts([]);
  }

  return <AlertContext.Provider value={{ alerts, clearAlerts, addAlert }}>{children}</AlertContext.Provider>;
};

export const AlertConsumer = AlertContext.Consumer;

export default AlertContext;
