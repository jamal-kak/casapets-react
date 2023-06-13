import { TextField } from "@mui/material";

const InputText = ({
  title,
  onBlur,
  onChange,
  value,
  name,
  error,
  helperText,
  type = "text",
  disabled = false,
  span = 1,
}) => {
  return (
    <TextField
      size="small"
      fullWidth
      variant="filled"
      type={type}
      label={title}
      onBlur={onBlur}
      onChange={onChange}
      value={value}
      name={name}
      error={error}
      helperText={helperText}
      sx={{ gridColumn: `span ${span}` }}
      disabled={disabled}
    />
  );
};

export default InputText;
