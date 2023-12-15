"use client";

import { ThemeProvider } from "next-themes";
import {NextUIProvider} from "@nextui-org/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
        {children}
      </ThemeProvider>
    </NextUIProvider>
  );
}
