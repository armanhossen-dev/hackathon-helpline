import * as React from "react"
import { ThemeProvider as NextThemesProviderProps } from "next-themes"

export type ThemeProviderProps = React.ComponentPropsWithoutRef<typeof NextThemesProviderProps>

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}