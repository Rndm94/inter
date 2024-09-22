import LoginIcon from "@mui/icons-material/Login"
import {
  Badge,
  CircularProgress,
  Drawer,
  IconButton,
  Link,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material"
import EditNoteIcon from "@mui/icons-material/EditNote"
import PersonOutlineIcon from "@mui/icons-material/PersonOutline"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import LogoutIcon from "@mui/icons-material/Logout"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { logoutUser, selectUser } from "../../../app/user-slice"
import ButtonNavbar from "./button-navbar"
import { useState } from "react"
import { Close } from "@mui/icons-material"

const LoginButtonMenuTop = () => {
  const { user } = useAppSelector(selectUser)
  const dispatch = useAppDispatch()
  const handleLogOutClick = () => {
    dispatch(logoutUser())
  }

  return (
    <Stack py={1} alignItems="center">
      <AccountCircleIcon color="action" sx={{ fontSize: 70 }} />
      <Typography color={({ palette }) => palette.grey[800]} fontWeight={700}>
        {user?.name}
      </Typography>
      <Typography mx={2} variant="subtitle2">
        {user?.email}
      </Typography>
      <MenuList sx={{ paddingBottom: 0, width: "100%" }}>
        <Link href="/profile" sx={{ ":hover": { textDecoration: "none" } }}>
          <MenuItem>
            <ListItemIcon>
              <EditNoteIcon />
            </ListItemIcon>
            <ListItemText>Editar perfil</ListItemText>
          </MenuItem>
        </Link>
        <MenuItem onClick={handleLogOutClick}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText>Cerrar Sesión</ListItemText>
        </MenuItem>
      </MenuList>
    </Stack>
  )
}
const LoginButtonMenuBottom = () => {
  const [open, setOpen] = useState(false)
  const { user } = useAppSelector(selectUser)
  const dispatch = useAppDispatch()

  const handleLogOutClick = () => {
    setOpen(false)
    dispatch(logoutUser())
  }

  const handleOpenMenuClick = () => {
    setOpen(true)
  }

  const handleCloseMenu = () => {
    setOpen(false)
  }

  return (
    <>
      <Drawer anchor="top" open={open} onClose={handleCloseMenu}>
        <Stack width="100%" alignItems="end" pt={1} px={1}>
          <IconButton onClick={handleCloseMenu}>
            <Close />
          </IconButton>
        </Stack>
        <Stack py={1} alignItems="center">
          <AccountCircleIcon color="action" sx={{ fontSize: 70 }} />
          <Typography
            color={({ palette }) => palette.grey[800]}
            fontWeight={700}
          >
            {user?.name}
          </Typography>
          <Typography mx={2} variant="subtitle2">
            {user?.email}
          </Typography>
          <MenuList sx={{ paddingBottom: 0, width: "100%" }}>
            <Link
              onClick={handleCloseMenu}
              href="/profile"
              sx={{ ":hover": { textDecoration: "none" } }}
            >
              <MenuItem>
                <ListItemIcon>
                  <EditNoteIcon />
                </ListItemIcon>
                <ListItemText>Editar perfil</ListItemText>
              </MenuItem>
            </Link>
            <MenuItem onClick={handleLogOutClick}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText>Cerrar Sesión</ListItemText>
            </MenuItem>
          </MenuList>
        </Stack>
      </Drawer>
      <ButtonNavbar
        onClick={handleOpenMenuClick}
        icon={<PersonOutlineIcon />}
        label="Cuenta"
      />
    </>
  )
}

const LoginButton = ({ bottomBar }: { bottomBar?: boolean }) => {
  const { status, user } = useAppSelector(selectUser)
  if (status === "loading") {
    if (bottomBar) {
      return (
        <Stack
          py={1}
          px={2}
          alignItems="center"
          color={({ palette }) => palette.grey[500]}
        >
          <Badge badgeContent={<CircularProgress size={10} />}>
            <PersonOutlineIcon />
          </Badge>
          <Typography fontWeight={700} variant="caption">
            Cuenta
          </Typography>
        </Stack>
      )
    }
    return (
      <Stack position="relative">
        <AccountCircleIcon color="action" sx={{ fontSize: 40 }} />
        <CircularProgress
          sx={{ position: "absolute", top: 0, left: 0, borderRadius: 99 }}
          size={40}
        />
      </Stack>
    )
  }

  if (!user) {
    if (bottomBar)
      return (
        <ButtonNavbar
          href="/auth/login"
          icon={<LoginIcon />}
          label="Iniciar sesión"
        />
      )

    return (
      <Link
        sx={{
          textDecoration: "none",
          color: ({ palette }) => palette.grey[600],
          fontWeight: 600,
        }}
        display="flex"
        alignItems="center"
        gap={1}
        fontSize={14}
        href="/auth/login"
      >
        <LoginIcon fontSize="small" />
        Iniciar sesión
      </Link>
    )
  }

  if (bottomBar) return <LoginButtonMenuBottom />

  return (
    <Tooltip title={<LoginButtonMenuTop />}>
      <IconButton size="small">
        <AccountCircleIcon color="action" sx={{ fontSize: 40 }} />
      </IconButton>
    </Tooltip>
  )
}

export default LoginButton
