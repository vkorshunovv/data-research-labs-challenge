import { ButtonProps } from "../types/types";

const Button = ({ handleClick, title }: ButtonProps) => {
  return (
    <button
      className="rounded-md bg-stone-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-stone-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-600"
      type="button"
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default Button;
