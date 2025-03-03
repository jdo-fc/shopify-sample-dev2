"use client"

import {
  Page,
  Layout,
  Card,
  Text,
  SkeletonBodyText,
  DataTable,
  ButtonGroup,
  Button,
  Box,
  Tabs,
  LegacyCard,
  EmptyState,
} from "@shopify/polaris"
import { useState, useCallback, useEffect } from "react"

export default function Customers() {
  const [selected, setSelected] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  // デバッグ用のeffect
  useEffect(() => {
    console.log("Customers component mounted")
    console.log("Current tab:", selected)
    console.log("Loading state:", isLoading)
  }, [selected, isLoading])

  const handleTabChange = useCallback((selectedTabIndex: number) => {
    console.log("Tab changed to:", selectedTabIndex)
    setSelected(selectedTabIndex)
  }, [])

  const toggleIsLoading = useCallback(() => {
    console.log("Toggling loading state")
    setIsLoading((isLoading) => !isLoading)
  }, [])

  const tabs = [
    {
      id: "all-customers",
      content: "全ての顧客",
      accessibilityLabel: "全ての顧客タブ",
      panelID: "all-customers-content",
    },
    {
      id: "new-customers",
      content: "新規顧客",
      accessibilityLabel: "新規顧客タブ",
      panelID: "new-customers-content",
    },
    {
      id: "repeat-customers",
      content: "リピーター",
      accessibilityLabel: "リピーター顧客タブ",
      panelID: "repeat-customers-content",
    },
  ]

  // サンプルデータ
  const customerRows = [
    ["田中太郎", "東京", "3回", "¥45,600", "4.8"],
    ["鈴木花子", "大阪", "5回", "¥78,900", "4.5"],
    ["佐藤健一", "名古屋", "2回", "¥23,400", "4.2"],
    ["山田優子", "福岡", "4回", "¥56,700", "4.7"],
    ["中村一郎", "札幌", "1回", "¥12,300", "4.0"],
  ]

  return (
    <Page
      title="顧客管理"
      primaryAction={{ content: "データを更新", onAction: toggleIsLoading }}
      secondaryActions={[
        {
          content: "顧客データをエクスポート",
          onAction: () => {
            console.log("顧客データのエクスポートがクリックされました")
          },
        },
      ]}
    >
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
        <Layout>
          <Layout.Section>
            <Card>
              <Box padding={4}>
                <Text variant="headingMd" as="h2">
                  顧客概要
                </Text>
                {isLoading ? (
                  <SkeletonBodyText lines={3} />
                ) : (
                  <Text as="p">
                    総顧客数: 1,234名 (前月比 +5%)
                    <br />
                    平均購入回数: 2.8回
                    <br />
                    平均顧客単価: ¥15,600
                  </Text>
                )}
              </Box>
            </Card>
          </Layout.Section>

          <Layout.Section>
            <LegacyCard title="顧客リスト">
              <LegacyCard.Section>
                {isLoading ? (
                  <SkeletonBodyText lines={10} />
                ) : (
                  <DataTable
                    columnContentTypes={["text", "text", "text", "numeric", "numeric"]}
                    headings={["顧客名", "地域", "購入回数", "累計購入額", "評価"]}
                    rows={customerRows}
                  />
                )}
              </LegacyCard.Section>
            </LegacyCard>
          </Layout.Section>

          <Layout.Section>
            <Card>
              <Box padding={4}>
                <Text variant="headingMd" as="h2">
                  AIによる顧客インサイト
                </Text>
                {isLoading ? (
                  <SkeletonBodyText lines={5} />
                ) : (
                  <Text as="p">
                    最近の顧客行動分析によると：
                    <br />
                    1. リピート率が前月比10%向上しています
                    <br />
                    2. 20-30代の女性顧客が増加傾向にあります
                    <br />
                    3. 商品AとBの組み合わせ購入が人気です
                    <br />
                    4. 平均購入単価が15%上昇しています
                  </Text>
                )}
              </Box>
              <Box padding={4}>
                <ButtonGroup>
                  <Button variant="primary">詳細分析を表示</Button>
                  <Button variant="secondary">キャンペーンを作成</Button>
                </ButtonGroup>
              </Box>
            </Card>
          </Layout.Section>

          <Layout.Section>
            <Card>
              <Box padding={4}>
                <EmptyState
                  heading="顧客フィードバック"
                  action={{ content: "フィードバックを収集" }}
                  image="/feedback-empty-state.svg"
                >
                  <p>
                    まだフィードバックが収集されていません。
                    顧客からの声を集めて、サービス改善に活用しましょう。
                  </p>
                </EmptyState>
              </Box>
            </Card>
          </Layout.Section>
        </Layout>
      </Tabs>
    </Page>
  )
}

