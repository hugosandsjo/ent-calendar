import { UseFormRegister } from "react-hook-form";
import { TCreateEntrySchema } from "@/src/lib/types";

type MonthProps = {
  defaultValue?: string;
  register: UseFormRegister<TCreateEntrySchema>;
};

export default function FormMonth({ defaultValue, register }: MonthProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor="options">Month</label>
      <select
        className="py-3.5 px-2 border-2 border-black rounded-md"
        id="month"
        // name="month"
        defaultValue={defaultValue}
        {...register("month")}
      >
        <option value="january">January</option>
        <option value="february">February</option>
        <option value="march">March</option>
        <option value="april">April</option>
        <option value="may">May</option>
        <option value="june">June</option>
        <option value="july">July</option>
        <option value="august">August</option>
        <option value="september">September</option>
        <option value="october">October</option>
        <option value="november">November</option>
        <option value="december">December</option>
      </select>
    </div>
  );
}
