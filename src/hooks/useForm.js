import { useState } from "react";

function useForm({ defaultValue, type }) {
  const [value, setValue] = useState(defaultValue || "");

  const onChangeFile = (e) => {
    const files = e.terget.files;
    setValue(files[0]);
  };

  const onChangeText = (e) => {
    const valueInput = e.target.value;
    setValue(valueInput);
  };
  const onChangeHandler = {
    files: onChangeFile,
  };
  const onChange = (e) => {
    const onChangeFn = onChangeHandler[type];
    if (!onChange) onChangeText(e);
    onChangeFn(e);
  };

  return {
    type,
    value,
    onChange,
  };
}

export default useForm;
