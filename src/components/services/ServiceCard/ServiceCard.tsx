import { Link } from "app/i18n/routing";

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  link: string;
}

export const ServiceCard = ({
  icon,
  title,
  description,
  link,
}: ServiceCardProps) => {
  return (
    <Link
      className="bg-jojanes-gray p-6 rounded-lg border border-jojanes-border space-y-4 transition-transform hover:scale-105 flex flex-col items-center"
      href={link}
    >
      {/* Icon Section */}
      <div className="bg-jojanes-green rounded-full p-3 w-16 h-16 flex items-center justify-center">
        <span
          className={`${icon} text-jojanes-black text-3xl`}
          role="img"
          aria-hidden="true"
        />
      </div>

      {/* Content Section */}
      <h3 className="text-xl font-bold text-jojanes-green text-center">{title}</h3>
      <p className="text-jojanes-subtitle text-center">{description}</p>
    </Link>
  );
};
