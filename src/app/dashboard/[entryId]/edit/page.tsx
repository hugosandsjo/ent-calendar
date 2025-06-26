import EntryFormUpdate from "@/src/app/components/form/EntryFormUpdate";

export default function Edit({ params }: { params: { entryId: number } }) {
  return (
    <>
      <h1>Id: {params.entryId}</h1>
      <EntryFormUpdate id={params.entryId} />
    </>
  );
}
