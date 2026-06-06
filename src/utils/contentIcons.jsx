import { FaEnvelope, FaGithub, FaLinkedin, FaWhatsapp, FaReact, FaLaptopCode, FaServer } from "react-icons/fa";
import {
  CheckCircleIcon,
  PencilIcon,
  CodeBracketIcon,
  WrenchIcon,
  StarIcon,
} from "@heroicons/react/24/outline";

const experienceIcons = {
  react: <FaReact size={26} className="text-blue-500" />,
  laptop: <FaLaptopCode size={26} className="text-sky-500" />,
  server: <FaServer size={26} className="text-indigo-500" />,
};

const contactIcons = {
  email: <FaEnvelope size={20} />,
  github: <FaGithub size={20} />,
  linkedin: <FaLinkedin size={20} />,
  whatsapp: <FaWhatsapp size={20} />,
};

const contactColors = {
  email: "text-blue-500",
  github: "text-blue-800",
  linkedin: "text-blue-600",
  whatsapp: "text-sky-500",
};

const serviceFeatureIcons = [
  <CheckCircleIcon key="check" className="w-8 h-8 text-blue-600" />,
  <PencilIcon key="pencil" className="w-8 h-8 text-blue-600" />,
  <CodeBracketIcon key="code" className="w-8 h-8 text-blue-600" />,
  <WrenchIcon key="wrench" className="w-8 h-8 text-blue-600" />,
  <StarIcon key="star" className="w-8 h-8 text-blue-600" />,
];

export const getExperienceIcon = (key) =>
  experienceIcons[key] ?? experienceIcons.react;

export const getContactIcon = (key) =>
  contactIcons[key] ?? contactIcons.email;

export const getContactColor = (key) =>
  contactColors[key] ?? contactColors.email;

export const getServiceFeatureIcon = (index) =>
  serviceFeatureIcons[index % serviceFeatureIcons.length];
