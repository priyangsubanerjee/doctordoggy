import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";

function CheckConnecion() {
  const [isOffline, setIsOffline] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("online", () => {
        setIsOffline(false);
        toast.success("You are back online");
      });
      window.addEventListener("offline", () => {
        setIsOffline(true);
      });
    }
  }, []);

  return (
    <>
      <AnimatePresence>
        {isOffline && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-neutral-600 text-white text-center py-3 text-xs h-fit flex items-center justify-center"
          >
            <Icon icon="mingcute:wifi-line" width="20" height="20" />
            <span className="ml-2 tracking-wide">
              Seems you lost your internet connection
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default CheckConnecion;
