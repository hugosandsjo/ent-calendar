import EntryFormUpdate from "@/src/app/components/form/EntryFormUpdate";

type PageProps = {
  params: Promise<{ entryId: string }>;
};

export default async function Edit({ params }: PageProps) {
  const entryId = await params;
  return <EntryFormUpdate id={Number(entryId)} />;
}
