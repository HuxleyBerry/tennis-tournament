import { ReactNode } from "react";

type ButtonType = "primary" | "secondary" | "danger";

interface CustomProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: ReactNode;
  styleOption: ButtonType;
}

function getColourClasses(type: ButtonType): string {
  switch (type) {
    case "primary":
      return "bg-theme-blue text-white";
    case "secondary":
      return "bg-theme-yellow text-black";
    default:
      return "bg-theme-red text-white";
  }
}

export default function CustomButton({
  children,
  styleOption,
  ...props
}: CustomProps) {
  return (
    <button
      className={`py-2 px-4 rounded-xl cursor-pointer hover:shadow-lg ${getColourClasses(
        styleOption
      )}`}
      {...props}
    >
      {children}
    </button>
  );
}
