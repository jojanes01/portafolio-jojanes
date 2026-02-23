export const BenefitCard = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="bg-jojanes-gray p-6 rounded-lg border border-jojanes-border space-y-4 transition-transform hover:scale-105">
    <h4 className="text-xl font-bold text-jojanes-green">{title}</h4>
    <p className="text-jojanes-subtitle">{description}</p>
  </div>
);
