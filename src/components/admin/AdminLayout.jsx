import {NextUIProvider} from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import {InnerLayout} from "@/components/admin/InnerLayouts/InnerLayout";

export default function AdminLayout({children, themeProps}) {

  return (
    <NextUIProvider>
      <NextThemesProvider defaultTheme="system" attribute="class" {...themeProps}>
        <InnerLayout>
          {children}
        </InnerLayout>
      </NextThemesProvider>
    </NextUIProvider>
  )
}