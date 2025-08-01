import { UseFormRegister } from "react-hook-form";
import { TCreateEntrySchema } from "@/src/lib/types";

type RadioButtonProps = {
  category: string;
  register: UseFormRegister<TCreateEntrySchema>;
  onCategoryChange?: (category: string) => void;
  selectedCategory?: string;
};

function RadioButton({
  category,
  register,
  onCategoryChange,
  selectedCategory,
}: RadioButtonProps) {
  const { onChange: registerOnChange, ...registerProps } = register("category");

  return (
    <label className="text-1xl rounded cursor-pointer" htmlFor={category}>
      <input
        type="radio"
        id={category}
        value={category}
        className="hidden"
        onChange={(e) => {
          registerOnChange(e);
          onCategoryChange?.(e.target.value);
          console.log(`Category changed to: ${e.target.value}`);
        }}
        defaultChecked={category === selectedCategory}
        {...registerProps}
      />
      <span className="radio-label py-3 px-5 border-2 border-black rounded-full font-medium hover:bg-black hover:text-white transition-colors duration-300">
        {category}
      </span>
    </label>
  );
}

export default RadioButton;
