import { CatalogEditor } from "@/components/CatalogEditor";

export const dynamic = "force-dynamic";

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <CatalogEditor kind="SERVICE" id={id} />;
}
