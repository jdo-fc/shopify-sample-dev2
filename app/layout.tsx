import type React from "react"
import { Inter } from "next/font/google"
import "@shopify/polaris/build/esm/styles.css"
import './globals.css'

// クライアントコンポーネントを別ファイルとして分離
import { RootLayoutClient } from './components/RootLayoutClient'

const inter = Inter({ subsets: ["latin"] })

// メタデータをサーバーサイドで定義
export const metadata = {
  title: 'Shopify AIアシスタント',
  description: 'AIを活用したShopifyストア分析ダッシュボード',
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  )
}
