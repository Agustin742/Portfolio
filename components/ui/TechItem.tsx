import { IconType } from "react-icons";

export interface TechItemProps {
  label: string;
  icon: IconType;
  color: string
}

const TechItem = ({ label, icon: Icon, color }: TechItemProps) => {
  return (
    <div
      className={`
        flex flex-col
        max-w-20
        justify-center items-center
        m-5
        `}
    >
      <Icon size={70} color={color} />
      <p>{label}</p>
    </div>
  )
}

export default TechItem