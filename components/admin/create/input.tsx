import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  type: string;
  id: string;
  name: string;
  labelTitle: string;
}

export function Input({ type, id, name, labelTitle, ...props }: Props) {
  return (
    <fieldset className="flex flex-col-reverse">
      <input
        className="px-3 py-1 rounded-md border-2 outline-none focus-within:border-indigo-500 transition-colors peer"
        type={type}
        name={name}
        id={id}
        {...props}
      />
      <label
        className="font-semibold peer-focus-within:text-indigo-500 transition-colors"
        htmlFor={id}
      >
        {labelTitle}
      </label>
    </fieldset>
  );
}
