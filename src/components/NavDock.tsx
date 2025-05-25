import { FloatingDock, type DockItem } from "@/components/ui/floating-dock";
import { Home as HomeIcon, Rocket , Star } from "lucide-react";

const NavDock = () => {
  const dockItems: DockItem[] = [
    {
      icon: <HomeIcon className="h-6 w-6 text-gray-200" />,
      title: "Home",
      href: "/",
    },
    {
      icon: <Star className="h-6 w-6 text-gray-200" />,
      title: "Chatbot",
      href: "/Chatbot",
    },
    {
      icon: <Rocket className="h-6 w-6 text-gray-200" />,
      title: "About Us",
      href: "/AboutUs",
    },
  ];

  return (
    <div className="fixed bottom-4 left-4 md:left-1/2 md:-translate-x-1/2 z-50">
      <FloatingDock
        items={dockItems}
        desktopClassName="bg-neutral-800/50 backdrop-blur-sm"
        mobileClassName="bg-neutral-800/50 backdrop-blur-sm"
      />
    </div>
  );
};

export default NavDock;