'use client';
import { useEffect, useState, useCallback } from "react";
import { useSignalR } from "@/hooks/usesignalR";
import { toast } from "react-toastify";

function getCookie(name: string) {
  return document.cookie.split('; ').reduce((r, v) => {
    const parts = v.split('=');
    return parts[0] === name ? decodeURIComponent(parts[1]) : r;
  }, '');
}

const NotificationComponent = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const jwt = getCookie("token");
    setToken(jwt);
  }, []);

  // 👇 useCallback ile sabit fonksiyon referansı sağlıyoruz
  const handleNotification = useCallback((notification: any) => {
    toast.info(notification.message);
  }, []);

  useSignalR(token ?? "", handleNotification);

  return null;
};

export default NotificationComponent;
