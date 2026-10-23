import type { SVGProps } from "react";
import { Bot, Cloud, GitBranch, Network, Server, Sparkles } from "lucide-react";
import type { TechnologyIcon } from "@/website-theme/data/types";
import brandIcons from "@/website-theme/ui/brand-icons.json";

type BrandIcon = { title: string; hex: string; path: string };

const brands = brandIcons as Record<string, BrandIcon>;

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

  const brand = brands[icon.slug];
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
