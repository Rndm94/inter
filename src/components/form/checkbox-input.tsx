import { useField } from "formik"
import type { CheckboxProps } from "@mui/material"
import { Checkbox, FormControlLabel, Stack, Tooltip } from "@mui/material"
import { InfoOutlined } from "@mui/icons-material"

type FormikCheckBoxProps = Omit<
  CheckboxProps,
  "onBlur" | "onChange" | "value" | "id" | "checked"
> & {
  name: string
  label: string
  info?: string
  fullWidth?: boolean
  // eslint-disable-next-line no-unused-vars
  extraOnChange?: (newValue: boolean) => void
}

const FormikCheckBox: React.FC<FormikCheckBoxProps> = ({
  name,
  label,
  info,
  disabled,
  fullWidth,
  extraOnChange,
  readOnly,
  ...rest
}) => {
  const [{ onBlur, value, onChange }] = useField(name)
  return (
    <FormControlLabel
      id={name}
      disabled={disabled}
      name={name}
      label={
        <Tooltip title={info}>
          <Stack direction="row" alignItems="center">
            {label}
            {info && (
              <InfoOutlined
                sx={{ ml: 1 }}
                fontSize="small"
                color={disabled ? "inherit" : "primary"}
              />
            )}
          </Stack>
        </Tooltip>
      }
      onBlur={onBlur}
      value={value}
      onChange={(e, newValue) => {
        onChange(e)
        extraOnChange?.(newValue)
      }}
      slotProps={{ typography: { fontSize: 12 } }}
      sx={{
        mt: 2,
        mb: 1,
        width: fullWidth ? "100%" : undefined,
        pointerEvents: readOnly ? "none" : "auto",
      }}
      control={
        <Checkbox
          value={name}
          color="primary"
          readOnly={readOnly}
          checked={value}
          {...rest}
        />
      }
    />
  )
}

export default FormikCheckBox
