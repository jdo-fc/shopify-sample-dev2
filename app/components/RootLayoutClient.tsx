"use client"

import type React from "react"
import { AppProvider, Frame } from "@shopify/polaris"
import enTranslations from "@shopify/polaris/locales/en.json"
import { useEffect } from "react"

export function RootLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    console.log('RootLayoutClient mounted')
    console.log('Polaris translations:', enTranslations)
  }, [])

  return (
    <AppProvider i18n={enTranslations}>
      <Frame>
        {children}
      </Frame>
    </AppProvider>
  )
} 