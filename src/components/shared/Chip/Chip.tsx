export const Chip = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-jojanes-gray border border-[#262827] text-white rounded-full w-max text-sm sm:text-base py-1.5 px-3">
      {children}
    </div>
  );
};
