"use client"

import "@shopify/polaris/build/esm/styles.css"
import { Frame, Navigation, TopBar, ActionList, AppProvider } from "@shopify/polaris"
import { useState, useCallback } from "react"
import { usePathname } from "next/navigation"
import ja from "@shopify/polaris/locales/ja.json"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isRootPage = pathname === "/"

  const [mobileNavigationActive, setMobileNavigationActive] = useState(false)
  const [userMenuActive, setUserMenuActive] = useState(false)
  const [searchActive, setSearchActive] = useState(false)
  const [searchValue, setSearchValue] = useState("")

  const toggleMobileNavigationActive = useCallback(() => setMobileNavigationActive((active) => !active), [])

  const toggleUserMenuActive = useCallback(() => setUserMenuActive((active) => !active), [])

  const handleSearchChange = useCallback((value: string) => {
    setSearchValue(value)
  }, [])

  const handleSearchResultsDismiss = useCallback(() => {
    setSearchActive(false)
    setSearchValue("")
  }, [])

  const userMenuActions = [
    {
      items: [{ content: "プロフィール設定" }, { content: "ログアウト" }],
    },
  ]

  const userMenuMarkup = (
    <TopBar.UserMenu
      actions={userMenuActions}
      name="Shopify Store"
      detail="ストアオーナー"
      initials="S"
      open={userMenuActive}
      onToggle={toggleUserMenuActive}
    />
  )

  const searchResultsMarkup = (
    <ActionList items={[{ content: "商品A" }, { content: "商品B" }, { content: "顧客X" }]} />
  )

  const searchFieldMarkup = <TopBar.SearchField onChange={handleSearchChange} value={searchValue} placeholder="検索" />

  const topBarMarkup = (
    <TopBar
      showNavigationToggle={!isRootPage}
      userMenu={userMenuMarkup}
      searchField={!isRootPage ? searchFieldMarkup : undefined}
      searchResultsVisible={searchActive}
      searchResults={searchResultsMarkup}
      onSearchResultsDismiss={handleSearchResultsDismiss}
      onNavigationToggle={toggleMobileNavigationActive}
    />
  )

  const navigationMarkup = !isRootPage ? (
    <Navigation location="/">
      <Navigation.Section
        items={[
          {
            url: "/dashboard",
            label: "ホーム",
          },
          {
            url: "/dashboard/analytics",
            label: "分析",
          },
          {
            url: "/dashboard/products",
            label: "商品",
          },
          {
            url: "/dashboard/customers",
            label: "顧客",
          },
          {
            url: "/dashboard/marketing",
            label: "マーケティング",
          },
          {
            url: "/dashboard/settings",
            label: "設定",
          },
        ]}
      />
    </Navigation>
  ) : null

  return (
    <html lang="ja">
      <body style={{ margin: 0, padding: 0 }}>
        <AppProvider i18n={ja}>
          <Frame
            topBar={topBarMarkup}
            navigation={navigationMarkup}
            showMobileNavigation={mobileNavigationActive}
            onNavigationDismiss={toggleMobileNavigationActive}
          >
            {children}
          </Frame>
        </AppProvider>
      </body>
    </html>
  )
}
