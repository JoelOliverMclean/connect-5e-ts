import React from "react";

interface PopupProps {
  children?: React.ReactNode;
  onDismiss: (e: React.MouseEvent) => void;
}

function Popup({ children, onDismiss }: PopupProps) {
  return (
    <div
      className="absolute top-0 right-0 bottom-0 left-0 z-50 h-screen"
      style={{
        background: "rgba(0, 0, 0, 0.5)",
      }}
      onClick={(e) => onDismiss(e)}
    >
      <div className="flex h-full items-center justify-center p-4">
        <div className="" onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Popup;
