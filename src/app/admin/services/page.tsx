import { CatalogAdminList } from "@/components/CatalogAdminList";

export const dynamic = "force-dynamic";

export default function ServicesAdminPage() {
  return <CatalogAdminList kind="SERVICE" />;
}
