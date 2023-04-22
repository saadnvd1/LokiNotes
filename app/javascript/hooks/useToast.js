import React from "react";
import { useNotificationCenter } from "react-toastify/addons/use-notification-center";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useToast = () => ({ toastError: (msg) => toast(msg, { type: "error" }) });
export default useToast;
