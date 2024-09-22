import type { useField } from "formik"
import { FastField, Field } from "formik"
import TextField from "@mui/material/TextField"
import InputMask from "react-input-mask"
import React, { useState } from "react"
import { IconButton, Stack, useTheme } from "@mui/material"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import { yupInteger } from "../../utils/validations"

const formatStringToNumber = (value: string | number) => {
  if (!value || typeof value === "number") return value
  // Remove spaces and commas from the string
  const cleanedString = value.replace(/[, ]+/g, "")

  // Parse the cleaned string as a number
  const number = parseFloat(cleanedString)

  return number
}

type FormikTextFieldProp = {
  name: string
  type?:
    | "text"
    | "phone"
    | "integer"
    | "number"
    | "password"
    | "email"
    | "textarea"
    | "stringInteger"
  min?: number
  max?: number
  label: string
  required?: boolean
  readOnly?: boolean
  disabled?: boolean
  signIsFill?: boolean
  // eslint-disable-next-line no-unused-vars
  extraOnchange?: (newValue: string) => void
}

const FormikTextFieldVariant: React.FC<
  FormikTextFieldProp & {
    field: ReturnType<typeof useField<string | number>>["0"]
    meta: ReturnType<typeof useField>["1"]
  }
> = ({
  name,
  type,
  min,
  max,
  meta,
  field,
  label,
  required,
  readOnly,
  disabled,
  signIsFill,
  extraOnchange,
}) => {
  const theme = useTheme()

  const [showPass, setShowPass] = useState(false)
  const { touched, error } = meta
  const { onBlur, onChange, value } = field

  if (type === "password") {
    return (
      <TextField
        margin="normal"
        fullWidth
        id={name}
        name={name}
        autoComplete={name}
        onBlur={onBlur}
        value={value}
        onChange={e => {
          onChange(e)
          extraOnchange?.(e.target.value)
        }}
        helperText={touched && error}
        error={touched && !!error}
        label={label}
        required={required}
        disabled={disabled}
        type={showPass ? "text" : "password"}
        InputProps={{
          autoComplete: "off",
          readOnly,
          endAdornment: (
            <IconButton
              size="small"
              sx={{ py: "4px" }}
              onClick={() => setShowPass(prev => !prev)}
              disabled={disabled}
            >
              {showPass ? (
                <VisibilityOff fontSize="small" />
              ) : (
                <Visibility fontSize="small" />
              )}
            </IconButton>
          ),
        }}
      />
    )
  }

  if (type === "phone") {
    return (
      <InputMask
        mask="(999) 999-9999"
        margin="normal"
        fullWidth
        id={name}
        name={name}
        autoComplete={name}
        onBlur={onBlur}
        value={value}
        onChange={e => {
          onChange(e)
          extraOnchange?.(e.target.value)
        }}
        helperText={touched && error}
        error={touched && !!error}
        required={required}
      >
        {
          // @ts-ignore
          (inputProps: any) => (
            <TextField
              {...inputProps}
              InputProps={{ readOnly, autoComplete: "off" }}
              label={label}
              disabled={disabled}
            />
          )
        }
      </InputMask>
    )
  }

  if (type === "integer") {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target
      const isValid = yupInteger.isValidSync(value) || value === ""
      if (isValid) {
        onChange(event)
        extraOnchange?.(event.target.value)
      }
    }

    return (
      <TextField
        margin="normal"
        fullWidth
        id={name}
        name={name}
        autoComplete={name}
        onBlur={onBlur}
        value={value}
        onChange={handleChange}
        helperText={touched && error}
        label={label}
        error={touched && !!error}
        type="number"
        InputProps={{ readOnly, inputProps: { min, max }, autoComplete: "off" }}
        required={required}
        disabled={disabled}
      />
    )
  }

  if (type === "stringInteger") {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target
      if (!value || /^\d+$/.test(value)) {
        onChange(event)
        extraOnchange?.(event.target.value)
      }
    }
    return (
      <TextField
        margin="normal"
        fullWidth
        id={name}
        name={name}
        autoComplete={name}
        onBlur={onBlur}
        value={value}
        onChange={handleChange}
        helperText={touched && error}
        label={label}
        error={touched && !!error}
        InputProps={{
          style:
            theme.components?.MuiTextField?.defaultProps?.inputProps?.style,
          readOnly,
          inputProps: { min, max },
          autoComplete: "off",
        }}
        required={required}
        disabled={disabled}
      />
    )
  }

  if (type === "textarea") {
    return (
      <TextField
        margin="normal"
        fullWidth
        id={name}
        name={name}
        autoComplete={name}
        onBlur={onBlur}
        value={value}
        onChange={e => {
          onChange(e)
          extraOnchange?.(e.target.value)
        }}
        helperText={touched && error}
        error={touched && !!error}
        label={label}
        multiline
        rows={4}
        InputProps={{
          style:
            theme.components?.MuiTextField?.defaultProps?.inputProps?.style,
          readOnly,
          autoComplete: "off",
        }}
        required={required}
        disabled={disabled}
      />
    )
  }

  const formattedValue = type === "number" ? formatStringToNumber(value) : value

  return (
    <TextField
      margin="normal"
      fullWidth
      id={name}
      name={name}
      autoComplete={name}
      onBlur={onBlur}
      value={formattedValue}
      onChange={e => {
        onChange(e)
        extraOnchange?.(e.target.value)
      }}
      helperText={touched && error}
      error={touched && !!error}
      label={
        <Stack component="span" gap={1} direction="row" alignItems="center">
          {label}
          {signIsFill && formattedValue && (
            <Stack
              justifyItems="center"
              bgcolor={({ palette }) => palette.secondary.main}
              width={7}
              height={7}
              borderRadius="100%"
            />
          )}
        </Stack>
      }
      type={type}
      InputProps={{
        style: theme.components?.MuiTextField?.defaultProps?.inputProps?.style,
        readOnly,
        inputProps: { min, max },
        autoComplete: "off",
      }}
      required={required}
      disabled={disabled}
    />
  )
}

const MemoizedTextField = React.memo(FormikTextFieldVariant)

const FormikTextField: React.FC<FormikTextFieldProp> = ({
  name,
  max,
  min,
  type,
  label,
  required,
  readOnly,
  disabled,
  signIsFill,
  extraOnchange,
}) => {
  if (typeof disabled !== "undefined") {
    return (
      <Field name={name}>
        {({
          field,
          meta,
        }: {
          field: ReturnType<typeof useField<string | number>>["0"]
          meta: ReturnType<typeof useField>["1"]
        }) => (
          <MemoizedTextField
            label={label}
            required={required}
            name={name}
            max={max}
            min={min}
            type={type}
            field={field}
            meta={meta}
            readOnly={readOnly}
            disabled={disabled}
            signIsFill={signIsFill}
            extraOnchange={extraOnchange}
          />
        )}
      </Field>
    )
  }
  return (
    <FastField name={name}>
      {({
        field,
        meta,
      }: {
        field: ReturnType<typeof useField<string | number>>["0"]
        meta: ReturnType<typeof useField>["1"]
      }) => (
        <MemoizedTextField
          label={label}
          required={required}
          name={name}
          max={max}
          min={min}
          type={type}
          field={field}
          meta={meta}
          readOnly={readOnly}
          disabled={disabled}
          signIsFill={signIsFill}
          extraOnchange={extraOnchange}
        />
      )}
    </FastField>
  )
}

export default FormikTextField
