import { FieldPath, UseFormRegister } from "react-hook-form";
import { TCreateEntrySchema } from "@/src/lib/types";

type FormInputProps = {
  title: string;
  name: FieldPath<TCreateEntrySchema>;
  register: UseFormRegister<TCreateEntrySchema>;
  defaultValue?: string;
};

function FormInputLarge({
  title,
  name,
  defaultValue,
  register,
}: FormInputProps) {
  return (
    <>
      <label htmlFor={title}>{title}</label>
      <textarea
        className="p-3 border-2 border-black rounded-md h-60 resize-none"
        id={name}
        // name={name}
        defaultValue={defaultValue}
        {...register(name)}
      ></textarea>
    </>
  );
}

export default FormInputLarge;
