export const Title = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-row items-center space-x-2 px-4 sm:px-0">
      <span
        className="icon-[tabler--point-filled] text-jojanes-green text-xl sm:text-2xl"
        role="img"
        aria-hidden="true"
      />
      <p className="text-white text-[28px] sm:text-4xl font-semibold">{title}</p>
    </div>
  );
};
