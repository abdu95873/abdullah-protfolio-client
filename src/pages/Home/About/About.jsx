import usePortfolio from "../../../hooks/usePortfolio";

const About = () => {
  const { portfolio } = usePortfolio();
  const { about } = portfolio;

  return (
    <section className="w-full py-12 sm:py-20 lg:py-24 px-4 sm:px-6 bg-white">
      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-7 lg:gap-6">
        <div className="hidden sm:flex w-full lg:w-1/2 relative justify-center h-[290px] md:h-[340px] lg:h-[380px]">
          <img
            src={about.image}
            alt="Abdullah"
            width={400}
            height={380}
            loading="lazy"
            decoding="async"
            className="h-full object-contain"
          />
        </div>

        <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-3 sm:space-y-4 px-1 sm:px-4 lg:px-12 text-center sm:text-left">
          <span className="text-blue-600 font-semibold text-xs sm:text-sm mb-1 sm:mb-2">
            {about.subtitle}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900">{about.title}</h2>

          {about.paragraphs.map((text) => (
            <p key={text.slice(0, 24)} className="text-gray-600 leading-relaxed text-sm sm:text-base">
              {text}
            </p>
          ))}

          <ul className="space-y-2 text-gray-600 text-xs sm:text-base">
            {about.benefits.map((item) => (
              <li key={item}>👍 {item}</li>
            ))}
          </ul>

          <div className="mt-2 sm:mt-4 text-blue-900 italic font-handwriting text-lg sm:text-xl">
            {about.signature}
          </div>

          <a
            href="/Abdullah-CV.pdf"
            download="Abdullah-CV.pdf"
            className="mt-3 sm:mt-5 inline-flex w-max self-center sm:self-start items-center gap-2 rounded-full bg-blue-600 px-4 sm:px-5 py-2 text-sm sm:text-base font-semibold text-white transition hover:bg-blue-700"
          >
            Download CV
            <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
