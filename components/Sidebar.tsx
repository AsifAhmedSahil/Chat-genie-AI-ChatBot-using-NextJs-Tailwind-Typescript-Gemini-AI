// components/Sidebar.tsx
import { FC } from "react";

interface SidebarProps {
  position: "left" | "right"; // Determines whether it's on the left or right side
}

const Sidebar: FC<SidebarProps> = ({ position }) => {
  return (
    <div
      className={`hidden lg:flex flex-col items-center justify-center gap-4 p-6 border-${position === "left" ? "r" : "l"} border-gray-800`}
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`h-2 w-2 rounded-full ${i === 0 ? "bg-white" : "bg-gray-600"}`}
        />
      ))}
    </div>
  );
};

export default Sidebar;
