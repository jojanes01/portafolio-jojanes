export const UseCaseCard = ({
  title,
  example,
  icon,
}: {
  title: string;
  example: string;
  icon: string;
}) => (
  <div className="bg-jojanes-gray p-6 rounded-lg border border-jojanes-border space-y-4 transition-transform hover:scale-105">
    <div className="bg-jojanes-green rounded-full p-3 w-12 h-12 flex items-center justify-center">
      <span
        className={`${icon} text-jojanes-black text-2xl`}
        role="img"
        aria-hidden="true"
      />
    </div>
    <h4 className="text-xl font-bold text-jojanes-green">{title}</h4>
    <p className="text-jojanes-subtitle">{example}</p>
  </div>
);
