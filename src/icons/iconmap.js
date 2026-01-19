import {
  Minus,
  ChevronRight,
  X,
  RefreshCw,
  Linkedin,
  Github,
  BookOpen,
  Send,
  Users,
  Youtube,
  Sun,
  Moon,
  ChevronDown,
  Home,
} from "lucide-react";

const iconsMap = new Map();

iconsMap.set("default", Minus);
iconsMap.set("forwardArrow", ChevronRight);
iconsMap.set("reset", X);
iconsMap.set("refresh", RefreshCw);
iconsMap.set("linkedin", Linkedin);
iconsMap.set("github", Github);
iconsMap.set("medium", BookOpen);
iconsMap.set("telegram", Send);
iconsMap.set("discord", Users);
iconsMap.set("youtube", Youtube);
iconsMap.set("home", Home);
iconsMap.set("light", Sun);
iconsMap.set("dark", Moon);
iconsMap.set("expand", ChevronDown);

export default iconsMap;
