import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
const InputSelect = ({
  title,
  name,
  onChange,
  onBlur,
  value,
  error,
  span = 1,
  options,
  optionName,
}) => {
  return (
    <FormControl
      variant="filled"
      sx={{ gridColumn: `span ${span}` }}
      error={error}
      size="small"
    >
      <InputLabel id="label">{title}</InputLabel>
      <Select
        labelId="label"
        id={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        name={name}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options.map((item, index) => (
          <MenuItem key={index} value={item.id}>
            {item[`${optionName}`]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default InputSelect;
