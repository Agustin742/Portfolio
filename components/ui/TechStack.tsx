import { IconType } from "react-icons";

export interface TechStackProps {
  label: string;
  icon: IconType;
  color: string
}

const TechStack = ({ label, icon: Icon, color }: TechStackProps) => {
  return (
    <span
      className="
      inline-flex
      w-fit
      items-center
      gap-2
      px-3 py-1
      rounded-full
    "
      style={{
        backgroundColor: `${color}4D`
      }}
    >
      < Icon size={24} color={color} />
      <p>{label}</p>
    </span>
  )
}

export default TechStack