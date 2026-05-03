import { TabType } from "@/types/tabNavbar";
import { CirclePlus, House, UserCircle2, UserStar } from "lucide-react-native";

export const navbarTabs: TabType[] = [
  {
    route: "/default",
    icon: ({ active }: { active: boolean }) => (
      <House
        size={20}
        color={active ? "#f97316" : "#a3a3a3"}
      />
    ),
    title: "Home",
  },
  {
    route: "/default/post",
    icon: ({ active }: { active: boolean }) => (
      <CirclePlus
        size={20}
        color={active ? "#f97316" : "#a3a3a3"}
      />
    ),
    title: "Post",
  },
  {
    route: "/default/friends",
    icon: ({ active }: { active: boolean }) => (
      <UserStar
        size={20}
        color={active ? "#f97316" : "#a3a3a3"}
      />
    ),
    title: "Friends",
  },
  {
    route: "/default/profile",
    icon: ({ active }: { active: boolean }) => (
      <UserCircle2
        size={20}
        color={active ? "#f97316" : "#a3a3a3"}
      />
    ),
    title: "Profile",
  }
]
