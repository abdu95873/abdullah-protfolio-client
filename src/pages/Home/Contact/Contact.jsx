import usePortfolio from "../../../hooks/usePortfolio";
import { getContactColor, getContactIcon } from "../../../utils/contentIcons";

const Contact = () => {
  const { portfolio } = usePortfolio();
  const { contact } = portfolio;

  return (
    <section id="contact" className="py-12 sm:py-20 px-4 sm:px-6 bg-blue-50/40">
      <h2 className="text-xl sm:text-3xl font-semibold mb-7 sm:mb-12 text-center text-gray-900">
        {contact.title}
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 max-w-6xl mx-auto">
        {contact.items.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 sm:gap-3 p-3.5 sm:p-6 bg-white rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 text-center"
          >
            <div className={`${getContactColor(item.icon)} mb-1 sm:mb-2 scale-90 sm:scale-100`}>
              {getContactIcon(item.icon)}
            </div>
            <p className="font-medium text-gray-900 text-sm sm:text-base">{item.label}</p>
            <p className="text-gray-600 text-[11px] sm:text-sm break-all">{item.value}</p>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Contact;
