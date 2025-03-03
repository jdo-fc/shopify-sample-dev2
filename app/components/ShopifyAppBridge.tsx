"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Provider } from "@shopify/app-bridge-react"
import { useRouter } from "next/navigation"

interface ShopifyAppBridgeProps {
  children: React.ReactNode
}

export function ShopifyAppBridge({ children }: ShopifyAppBridgeProps) {
  const router = useRouter()
  const [appBridgeConfig, setAppBridgeConfig] = useState<{
    apiKey: string
    host: string
    forceRedirect: boolean
  } | null>(null)

  useEffect(() => {
    console.log('ShopifyAppBridge mounted')
    
    // URLからshopパラメータとhostパラメータを取得
    const queryParams = new URLSearchParams(window.location.search)
    const host = queryParams.get("host")
    
    console.log('URL params:', {
      search: window.location.search,
      host: host,
      apiKey: process.env.NEXT_PUBLIC_SHOPIFY_API_KEY
    })

    // App Bridgeの設定
    if (host) {
      const config = {
        apiKey: process.env.NEXT_PUBLIC_SHOPIFY_API_KEY || "",
        host: host,
        forceRedirect: true,
      }
      console.log('Setting AppBridge config:', config)
      setAppBridgeConfig(config)
    } else {
      console.warn("Shopify host parameter not found")
    }
  }, [])

  // App Bridge設定が完了するまでローディング表示
  if (!appBridgeConfig) {
    console.log('Waiting for AppBridge config...')
    return <div>Loading AppBridge configuration...</div>
  }

  console.log('Rendering AppBridge with config:', appBridgeConfig)
  return <Provider config={appBridgeConfig}>{children}</Provider>
}

