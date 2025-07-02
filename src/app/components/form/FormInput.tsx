import { FieldPath, UseFormRegister } from "react-hook-form";
import { TCreateEntrySchema } from "@/src/lib/types";

type FormInputProps = {
  title: string;
  name: FieldPath<TCreateEntrySchema>;
  register: UseFormRegister<TCreateEntrySchema>;
  defaultValue?: string | number | undefined;
};

export default function FormInput({
  title,
  name,
  defaultValue,
  register,
}: FormInputProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor={title}>{title}</label>
      <input
        className="p-3 border-2 border-black rounded-md"
        type="text"
        id={title}
        // name={name}
        {...register(name)}
        defaultValue={defaultValue}
      ></input>
    </div>
  );
}
