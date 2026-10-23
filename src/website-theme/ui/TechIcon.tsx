import type { SVGProps } from "react";
import {
  siDjango,
  siDocker,
  siFastapi,
  siGooglegemini,
  siJavascript,
  siMongodb,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPython,
  siReact,
  siRedis,
  siTypescript,
} from "simple-icons";
import { Bot, Cloud, GitBranch, Network, Server, Sparkles } from "lucide-react";
import type { TechnologyIcon } from "@/website-theme/data/types";

type SimpleIcon = { title: string; slug: string; hex: string; path: string };

const simpleIcons: Record<string, SimpleIcon> = {
  react: siReact,
  nextdotjs: siNextdotjs,
  typescript: siTypescript,
  javascript: siJavascript,
  nodedotjs: siNodedotjs,
  python: siPython,
  django: siDjango,
  fastapi: siFastapi,
  postgresql: siPostgresql,
  mysql: siMysql,
  mongodb: siMongodb,
  redis: siRedis,
  docker: siDocker,
  googlegemini: siGooglegemini,
};

const lucideMap = {
  network: Network,
  "git-branch": GitBranch,
  sparkles: Sparkles,
  bot: Bot,
  cloud: Cloud,
  server: Server,
} as const;

export function TechIcon({
  icon,
  className,
  size = 16,
}: {
  icon: TechnologyIcon;
  className?: string;
  size?: number;
}) {
  if (icon.kind === "lucide") {
    const Lucide = lucideMap[icon.name];
    return <Lucide size={size} className={className} aria-hidden="true" strokeWidth={1.75} />;
  }

  const brand = simpleIcons[icon.slug];
  if (!brand) {
    return <Sparkles size={size} className={className} aria-hidden="true" strokeWidth={1.75} />;
  }

  const svgProps: SVGProps<SVGSVGElement> = {
    role: "img",
    viewBox: "0 0 24 24",
    width: size,
    height: size,
    className,
    "aria-hidden": true,
  };

  return (
    <svg {...svgProps}>
      <title>{brand.title}</title>
      <path d={brand.path} fill={`#${brand.hex}`} />
    </svg>
  );
}
