import { useEffect, useState } from "react";
import Select from "./Form/Select";
import { ClassApi } from "../midleware/Api";
import Store from "../store/Store";

interface Props {
  value: string;
  onChange: (val: string) => void;
}

const ClassPicker = ({ value, onChange }: Props) => {
  const { token } = Store();
  const [classes, setClasses] = useState<any[]>([]);

  const getClasses = async () => {
    try {
      const res = await ClassApi.showAll(token, { limit: 2000 });
      const { result } = res.data.data;
      setClasses(result ?? []);
    } catch {}
  };

  useEffect(() => {
    getClasses();
  }, []);

  return (
    <div>
      <Select
        placeholder="Kelas"
        keyValue="id"
        displayBuilder={(o) => `${o.level ?? ""} - ${o.class_name ?? ""}`}
        value={value}
        options={classes}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default ClassPicker;
