"use client"

import {
  Page,
  Layout,
  Card,
  Text,
  SkeletonBodyText,
  Filters,
  Button,
  ResourceList,
  ResourceItem,
  Avatar,
  TextStyle,
  Pagination,
  EmptySearchResult,
} from "@shopify/polaris"
import { useState, useCallback } from "react"

export default function Customers() {
  const [isLoading, setIsLoading] = useState(false)
  const [queryValue, setQueryValue] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const toggleIsLoading = useCallback(() => setIsLoading((isLoading) => !isLoading), [])

  const handleQueryValueChange = useCallback((value: string) => setQueryValue(value), [])

  const handleTagsChange = useCallback((value: string[]) => setSelectedTags(value), [])

  const handleQueryClear = useCallback(() => setQueryValue(""), [])
  const handleClearAll = useCallback(() => {
    handleQueryClear()
    setSelectedTags([])
  }, [handleQueryClear])

  // サンプル顧客データ
  const customers = [
    {
      id: "1",
      name: "山田太郎",
      email: "yamada@example.com",
      location: "東京",
      orders: 5,
      totalSpent: "¥45,000",
      lastOrder: "2023/10/15",
      tags: ["VIP", "リピーター"],
    },
    {
      id: "2",
      name: "佐藤花子",
      email: "sato@example.com",
      location: "大阪",
      orders: 3,
      totalSpent: "¥28,500",
      lastOrder: "2023/09/22",
      tags: ["リピーター"],
    },
    {
      id: "3",
      name: "鈴木一郎",
      email: "suzuki@example.com",
      location: "名古屋",
      orders: 1,
      totalSpent: "¥12,000",
      lastOrder: "2023/10/05",
      tags: ["新規"],
    },
    {
      id: "4",
      name: "高橋みどり",
      email: "takahashi@example.com",
      location: "福岡",
      orders: 8,
      totalSpent: "¥78,000",
      lastOrder: "2023/10/18",
      tags: ["VIP", "リピーター"],
    },
    {
      id: "5",
      name: "田中健太",
      email: "tanaka@example.com",
      location: "札幌",
      orders: 2,
      totalSpent: "¥15,800",
      lastOrder: "2023/08/30",
      tags: ["リピーター"],
    },
  ]

  const resourceName = {
    singular: "顧客",
    plural: "顧客",
  }

  const filters = [
    {
      key: "tags",
      label: "タグ",
      filter: (
        <Filters.ResourceList
          resourceName={resourceName}
          filterValueKey="tags"
          filterKey="tags"
          filter={{
            key: "tags",
            label: "タグ",
            operatorText: "が次を含む",
            filter: (
              <Filters.ResourceList
                resourceName={resourceName}
                filterValueKey="tags"
                filterKey="tags"
                filter={{
                  key: "tags",
                  label: "タグ",
                  operatorText: "が次を含む",
                  filter: <div />,
                }}
              />
            ),
          }}
        />
      ),
      shortcut: true,
    },
    {
      key: "location",
      label: "地域",
      filter: (
        <Filters.ResourceList
          resourceName={resourceName}
          filterValueKey="location"
          filterKey="location"
          filter={{
            key: "location",
            label: "地域",
            operatorText: "が次を含む",
            filter: <div />,
          }}
        />
      ),
      shortcut: true,
    },
  ]

  const filterControl = (
    <Filters
      queryValue={queryValue}
      filters={filters}
      onQueryChange={handleQueryValueChange}
      onQueryClear={handleQueryClear}
      onClearAll={handleClearAll}
    />
  )

  return (
    <Page
      title="顧客管理"
      primaryAction={{ content: "データを更新", onAction: toggleIsLoading }}
      secondaryActions={[{ content: "顧客をエクスポート" }, { content: "セグメントを作成" }]}
    >
      <Layout>
        <Layout.Section>
          <Card>
            <Card.Section>
              <Text variant="headingMd" as="h2">
                顧客概要
              </Text>
              {isLoading ? (
                <SkeletonBodyText lines={3} />
              ) : (
                <Text as="p">
                  総顧客数: 523
                  <br />
                  アクティブ顧客: 312 (60%)
                  <br />
                  平均顧客生涯価値 (LTV): ¥35,800
                </Text>
              )}
            </Card.Section>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <Card.Section>
              <Text variant="headingMd" as="h2">
                AIによる顧客インサイト
              </Text>
              {isLoading ? (
                <SkeletonBodyText lines={5} />
              ) : (
                <Text as="p">
                  VIP顧客は平均して3ヶ月に一度の頻度で購入しており、主に商品AとCに関心を示しています。
                  <br />
                  <br />
                  新規顧客の約40%が初回購入後60日以内に2回目の購入をしています。初回購入後のフォローアップメールが効果的です。
                  <br />
                  <br />
                  東京地域の顧客は平均購入額が他の地域より20%高く、特に商品Cへの関心が高いです。
                </Text>
              )}
            </Card.Section>
            <Card.Section>
              <Button primary>顧客セグメントを分析</Button>
            </Card.Section>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <ResourceList
              resourceName={resourceName}
              items={customers}
              renderItem={(item) => {
                const { id, name, email, location, orders, totalSpent, lastOrder, tags } = item
                const shortcutActions = [
                  {
                    content: "詳細を見る",
                    url: `/dashboard/customers/${id}`,
                  },
                  {
                    content: "メール送信",
                    url: `mailto:${email}`,
                  },
                ]

                return (
                  <ResourceItem
                    id={id}
                    url={`/dashboard/customers/${id}`}
                    accessibilityLabel={`${name}の詳細を見る`}
                    shortcutActions={shortcutActions}
                    persistActions
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Avatar customer size="medium" name={name} />
                      <div style={{ marginLeft: "1rem", flex: 1 }}>
                        <h3>
                          <TextStyle variation="strong">{name}</TextStyle>
                        </h3>
                        <div>{email}</div>
                        <div>
                          <TextStyle variation="subdued">
                            {location} • 注文数: {orders} • 合計: {totalSpent} • 最終注文: {lastOrder}
                          </TextStyle>
                        </div>
                        <div style={{ marginTop: "0.5rem" }}>
                          {tags.map((tag) => (
                            <span
                              key={tag}
                              style={{
                                marginRight: "0.5rem",
                                background: "#f4f6f8",
                                padding: "2px 8px",
                                borderRadius: "12px",
                                fontSize: "12px",
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </ResourceItem>
                )
              }}
              filterControl={filterControl}
              loading={isLoading}
              emptyState={
                <EmptySearchResult
                  title="該当する顧客が見つかりません"
                  description="検索条件を変更するか、新しい顧客を追加してください。"
                  withIllustration
                />
              }
            />
            <Card.Section>
              <div style={{ display: "flex", justifyContent: "center", padding: "1rem 0" }}>
                <Pagination hasPrevious onPrevious={() => {}} hasNext onNext={() => {}} />
              </div>
            </Card.Section>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  )
}

