type DashboardBrickProps = {
  title: string;
  stat: string | number | undefined;
  className?: string;
};

export default function DashboardBrick({ title, stat }: DashboardBrickProps) {
  return (
    <div
      className={`flex rounded-xl flex-col col-span-6 bg-gray-200 items-center justify-center py-8 w-full h-full px-4 font-karla`}
    >
      <h3>{title}</h3>
      <h4 className="text-4xl font-semibold">{stat}</h4>
    </div>
  );
}
