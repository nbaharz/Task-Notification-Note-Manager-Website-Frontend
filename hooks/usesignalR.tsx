import { useEffect, useRef, useCallback } from "react";
import * as signalR from "@microsoft/signalr";

export function useSignalR(token: string, onNotificationReceived: (message: any) => void) {
  const connectionRef = useRef<signalR.HubConnection | null>(null);

  const stableHandler = useCallback((notification: any) => {
    console.log("📩 Notification geldi:", notification);
    onNotificationReceived(notification);
  }, [onNotificationReceived]);

  useEffect(() => {
    if (!token) return;

    if (connectionRef.current?.state === signalR.HubConnectionState.Connected) {
      console.log("⚠️ Zaten bağlı, yeniden bağlanmıyor.");
      return;
    }

    const connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7117/hubs/notification", {
        accessTokenFactory: () => token,
      })
      .withAutomaticReconnect()
      .build();

    connection.on("ReceiveNotification", stableHandler);
    connectionRef.current = connection;

    connection.start()
      .then(() => console.log("✅ SignalR Connected"))
      .catch(err => console.error("❌ SignalR Connection Error: ", err));

    return () => {
      connection.off("ReceiveNotification", stableHandler);
      connection.stop();
    };
  }, [token, stableHandler]);
}
