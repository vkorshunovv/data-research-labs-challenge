import { ButtonProps } from "../types/types";

const Button = ({ handleClick, title }: ButtonProps) => {
  return (
    <button
      className="rounded-md bg-stone-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-stone-950"
      type="button"
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default Button;
