import { Button, Stack, Typography } from "@mui/material"
import type { ReactNode } from "react"

const ButtonNavbar = ({
  icon,
  label,
  href,
  onClick,
}: {
  icon: ReactNode
  label: string
  href?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}) => {
  return (
    <Button
      onClick={onClick}
      href={href}
      disableRipple
      variant="text"
      sx={{
        color: ({ palette }) => palette.grey[500],
        ":hover": {
          color: ({ palette }) => palette.grey[900],
          backgroundColor: "transparent",
        },
      }}
    >
      <Stack alignItems="center">
        {icon}
        <Typography fontWeight={700} variant="caption">
          {label}
        </Typography>
      </Stack>
    </Button>
  )
}

export default ButtonNavbar
