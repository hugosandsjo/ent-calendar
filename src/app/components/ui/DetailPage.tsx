import { SelectEntry } from "@/src/db/schema";
import Link from "next/link";
import { ArrowLeftIcon, TrashIcon, EditIcon } from "@/src/app/components/Icons";
import RatingTag from "@/src/app/components/form/RatingTag";
import { useRouter } from "next/navigation";
import { deleteEntry } from "@/src/app/actions/actions";

type DetailPageProps = {
  entry: SelectEntry;
  entryId: number | undefined;
};

export default function DetailPage({ entry, entryId }: DetailPageProps) {
  const router = useRouter();
  const handleDeleteClick = async (id: number) => {
    await deleteEntry(id);
    router.push("/dashboard"); // Uncomment if using useRouter
  };

  return (
    <div className="flex flex-col max-w-[64rem]">
      <div className="flex justify-between mb-4">
        <div className="flex items-center justify-center">
          <Link href="/dashboard" className="hover:opacity-60">
            <ArrowLeftIcon className="w-8 h-8" />
          </Link>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard" className="hover:opacity-60">
            <div className="flex justify-center items-center hover:opacity-60 border-2 border-black rounded-full px-2 py-2">
              <ArrowLeftIcon className="w-6 h-6" />
            </div>
          </Link>
          <Link href="/dashboard">
            <div className="flex justify-center items-center hover:opacity-60 border-2 border-black rounded-full px-2 py-2">
              <ArrowLeftIcon className="w-6 h-6 rotate-180" />
            </div>
          </Link>
        </div>
      </div>
      <div className="px-10 py-8 md:py-12 flex flex-col gap-4 bg-brand-movie rounded-xl">
        <div className="flex flex-col lg:flex-row ">
          <div className="flex flex-col gap-4 lg:px-10 justify-center ">
            <h1 className="text-5xl leading-tight">{entry.title}</h1>
            {entry ? (
              <div className="flex flex-col gap-4">
                <div className="flex gap-x-2 mb-2 text-1xl flex-wrap gap-y-2">
                  <h2 className="bg-white rounded-3xl py-1 px-3 font-medium">
                    {entry.category}
                  </h2>
                  {entry.author ? (
                    <h2 className="bg-white rounded-3xl py-1 px-3 font-medium">
                      {entry.author}
                    </h2>
                  ) : null}
                  {entry.director ? (
                    <h2 className="bg-white rounded-3xl py-1 px-3 font-medium">
                      {entry.director}
                    </h2>
                  ) : null}
                  <h2 className="rounded-3xl bg-white py-1 px-3 font-medium">
                    {entry.year}
                  </h2>
                </div>
                <RatingTag rating={entry.rating ?? undefined} />
                <p className="text-lg font-medium">{entry.description}</p>
              </div>
            ) : (
              <p>Loading...</p>
            )}
            <div className="flex gap-2  justify-end">
              <Link href={`/dashboard/${entryId}/edit`}>
                <button className="hover:bg-sky-300 py-2 rounded-xl px-2">
                  <EditIcon className="w-6 h-6 inline-block" />
                </button>
              </Link>
              <div className="flex gap-x-2">
                <button
                  className="hover:bg-red-400 py-2 rounded-xl px-2"
                  onClick={() => handleDeleteClick(Number(entryId))}
                >
                  <TrashIcon className="w-6 h-6 inline-block" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
