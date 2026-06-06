const BlurText = ({
  text = "",
  delay = 120,
  className = "",
  animateBy = "words",
}) => {
  const elements = animateBy === "words" ? text.split(" ") : text.split("");
  const Tag = className.includes("text-5xl") || className.includes("text-6xl") ? "h1" : "p";

  return (
    <Tag className={`flex flex-wrap ${className}`} aria-label={text}>
      {elements.map((segment, index) => (
        <span
          key={`${segment}-${index}`}
          className="inline-block animate-blur-in opacity-0"
          style={{ animationDelay: `${(index * delay) / 1000}s` }}
        >
          {segment === " " ? "\u00A0" : segment}
          {animateBy === "words" && index < elements.length - 1 && "\u00A0"}
        </span>
      ))}
    </Tag>
  );
};

export default BlurText;
