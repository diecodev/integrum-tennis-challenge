import { DetailedHTMLProps, TextareaHTMLAttributes } from "react";

interface Props
  extends DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  id: string;
  name: string;
  labelTitle: string;
}

export function Textarea({ id, name, labelTitle, ...props }: Props) {
  return (
    <fieldset className="flex flex-col-reverse">
      <textarea
        className="px-3 py-1 rounded-md border-2 outline-none focus-within:border-indigo-500 transition-colors peer"
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
