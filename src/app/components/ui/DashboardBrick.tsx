type DashboardBrickProps = {
  title: string;
  stat: string | number | undefined;
  className?: string;
};

export default function DashboardBrick({ title, stat }: DashboardBrickProps) {
  return (
    <div
      className={`flex rounded-2xl flex-col col-span-6 md:col-span-4 bg-brand-black text-brand-gray gap-2 items-center justify-center py-8 w-full h-full px-5 font-karla`}
    >
      <h3 className="uppercase font-semibold tracking-wide text-sm">{title}</h3>
      <h4 className="text-5xl font-semibold">{stat}</h4>
    </div>
  );
}
