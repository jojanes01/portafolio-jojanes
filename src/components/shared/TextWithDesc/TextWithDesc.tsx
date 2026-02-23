export const TextWithDesc = ({
  title,
  desc,
}: {
  title: string;
  desc: React.ReactNode | string;
}) => {
  return (
    <div className="flex flex-row space-x-16 justify-between items-center w-full border-b border-jojanes-border pb-4">
      <p className="text-sm text-jojanes-subtitle">{title}</p>
      {typeof desc === "string" ? (
        <p className="text-sm text-white">{desc}</p>
      ) : (
        desc
      )}
    </div>
  );
};
