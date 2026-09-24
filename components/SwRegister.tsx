"use client";

import { useEffect } from "react";

/** Production-এ service worker রেজিস্টার (dev-এ ক্যাশিং ঝামেলা এড়াতে শুধু prod)। */
export default function SwRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/sw.js").catch(() => undefined);
  }, []);
  return null;
}
