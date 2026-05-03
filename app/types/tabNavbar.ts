import { Href } from "expo-router";

export type TabIconProps = {
  active: boolean;
}

export type TabType = {
  route: Href;
  title: string;
  icon: (props: TabIconProps) => React.ReactNode;
}

export type TabNavbarPropsType = {
  tabs: TabType[];
  currentRoute: Href
}
