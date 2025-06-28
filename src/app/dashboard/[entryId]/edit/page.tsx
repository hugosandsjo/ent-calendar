import EntryFormUpdate from "@/src/app/components/form/EntryFormUpdate";

type PageProps = {
  params: Promise<{ entryId: string }>;
};

export default async function EditPage({ params }: PageProps) {
  const { entryId } = await params;
  return (
    <section className="flex w-screen px-4 md:px-8 lg:justify-center mb-12">
      <EntryFormUpdate id={Number(entryId)} />
    </section>
  );
}
