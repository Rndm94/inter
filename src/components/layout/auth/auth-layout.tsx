import { Card, useMediaQuery, useTheme } from "@mui/material"
import { Stack } from "@mui/system"
import type { ReactNode } from "react"

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const theme = useTheme()
  const isUnder768px = useMediaQuery(theme.breakpoints.down(768))

  if (isUnder768px) {
    return (
      <Stack
        minHeight="100vh"
        justifyContent="center"
        my={4}
        px={3}
        alignItems="center"
      >
        {children}
      </Stack>
    )
  }
  
  return (
    <Stack minHeight="100vh" justifyContent="center" alignItems="center">
      <Card sx={{ width: 500 }}>
        <Stack mx={10} my={4} alignItems="center">
          {children}
        </Stack>
      </Card>
    </Stack>
  )
}

export default AuthLayout
