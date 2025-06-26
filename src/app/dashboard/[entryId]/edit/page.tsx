import EntryFormUpdate from "@/src/app/components/form/EntryFormUpdate";

export default function Edit({ params }: { params: { entryId: number } }) {
  return <EntryFormUpdate id={params.entryId} />;
}
