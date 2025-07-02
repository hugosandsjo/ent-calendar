import { UseFormRegister } from "react-hook-form";
import { TCreateEntrySchema } from "@/src/lib/types";

type RadioButtonProps = {
  category: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  register: UseFormRegister<TCreateEntrySchema>;
};

function RadioButton({
  category,
  onChange,
  checked,
  register,
}: RadioButtonProps) {
  const { onChange: registerOnChange, ...registerProps } = register("category");

  return (
    <label className="text-1xl rounded cursor-pointer" htmlFor={category}>
      <input
        type="radio"
        id={category}
        // name="category"
        value={category}
        className="hidden"
        onChange={(e) => {
          onChange(e); // Call your custom onChange
          registerOnChange(e); // Call the form's onChange
        }}
        checked={checked}
        {...registerProps}
      />
      <span className="radio-label py-3 px-5 border-2 border-black rounded-full font-medium hover:bg-black hover:text-white transition-colors duration-300">
        {category}
      </span>
    </label>
  );
}

export default RadioButton;
