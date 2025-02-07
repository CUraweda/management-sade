import { useState } from "react";
import Input, { InputProps } from "./Input";

interface Props extends InputProps {
  onEnter?: (val: string) => void;
}
const Search = ({ onEnter, ...props }: Props) => {
  const [val, setVal] = useState<string>("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (onEnter) onEnter(val);
      }}
    >
      <Input
        placeholder="Cari..."
        value={val}
        onChange={(e) => setVal(e.target.value)}
        {...props}
      />
    </form>
  );
};

export default Search;
