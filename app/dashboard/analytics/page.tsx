"use client"

import { useState, useCallback } from "react"
import {
  Page,
  Layout,
  Card,
  Text,
  SkeletonBodyText,
  LegacyCard,
  DataTable,
  Tabs,
  ButtonGroup,
  Button,
  EmptyState,
  Box,
} from "@shopify/polaris"

export default function Analytics() {
  const [selected, setSelected] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const handleTabChange = useCallback((selectedTabIndex: number) => {
    console.log("Tab changed to:", selectedTabIndex)
    setSelected(selectedTabIndex)
  }, [])

  const toggleIsLoading = useCallback(() => setIsLoading((isLoading) => !isLoading), [])

  const tabs = [
    {
      id: "sales",
      content: "売上分析",
      accessibilityLabel: "売上分析タブ",
      panelID: "sales-content",
    },
    {
      id: "customers",
      content: "顧客分析",
      accessibilityLabel: "顧客分析タブ",
      panelID: "customers-content",
    },
    {
      id: "products",
      content: "商品分析",
      accessibilityLabel: "商品分析タブ",
      panelID: "products-content",
    },
    {
      id: "ai-insights",
      content: "AI分析",
      accessibilityLabel: "AI分析タブ",
      panelID: "ai-insights-content",
    },
  ]

  // サンプルデータ
  const customerRows = [
    ["東京", "32", "¥15,200", "2.4"],
    ["大阪", "28", "¥12,800", "1.8"],
    ["名古屋", "15", "¥9,500", "1.5"],
    ["福岡", "12", "¥8,200", "1.3"],
    ["札幌", "8", "¥6,500", "1.1"],
  ]

  const productRows = [
    ["商品A", "120", "¥12,000", "4.5"],
    ["商品B", "85", "¥8,500", "4.2"],
    ["商品C", "60", "¥15,000", "4.8"],
    ["商品D", "200", "¥5,000", "3.9"],
    ["商品E", "75", "¥9,800", "4.1"],
  ]

  return (
    <Page
      title="分析ダッシュボード"
      primaryAction={{ content: "データを更新", onAction: toggleIsLoading }}
      secondaryActions={[
        {
          content: "レポートをエクスポート",
          onAction: () => {
            console.log("エクスポートボタンがクリックされました")
          },
        },
      ]}
    >
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
        {selected === 0 && (
          <Layout>
            <Layout.Section>
              <Card>
                <Box padding="4">
                  <Text variant="headingMd" as="h2">
                    売上概要
                  </Text>
                  {isLoading ? (
                    <SkeletonBodyText lines={3} />
                  ) : (
                    <Text as="p">
                      過去30日間の売上は前月比15%増加しました。特に商品Aの売上が好調で、
                      新規顧客からの注文が30%を占めています。
                    </Text>
                  )}
                </Box>
              </Card>
            </Layout.Section>

            <Layout.Section variant="oneHalf">
              <LegacyCard title="月次売上推移">
                <LegacyCard.Section>
                  {isLoading ? (
                    <SkeletonBodyText lines={8} />
                  ) : (
                    <div style={{ height: "250px" }}>
                      {/* TODO: グラフライブラリを使用して売上推移を表示 */}
                      <Text as="p">グラフが表示される予定</Text>
                    </div>
                  )}
                </LegacyCard.Section>
              </LegacyCard>
            </Layout.Section>

            <Layout.Section variant="oneHalf">
              <LegacyCard title="注文数推移">
                <LegacyCard.Section>
                  {isLoading ? (
                    <SkeletonBodyText lines={8} />
                  ) : (
                    <div style={{ height: "250px" }}>
                      {/* TODO: グラフライブラリを使用して注文数推移を表示 */}
                      <Text as="p">グラフが表示される予定</Text>
                    </div>
                  )}
                </LegacyCard.Section>
              </LegacyCard>
            </Layout.Section>
          </Layout>
        )}

        {selected === 1 && (
          <Layout>
            <Layout.Section>
              <Card>
                <Box padding="4">
                  <Text variant="headingMd" as="h2">
                    顧客セグメント分析
                  </Text>
                  {isLoading ? (
                    <SkeletonBodyText lines={3} />
                  ) : (
                    <Text as="p">
                      最も活発な顧客層: 30-45歳の女性 (全体の38%)
                      <br />
                      リピート率: 42% (前月比 +8%)
                      <br />
                      新規顧客獲得コスト: ¥2,500 (前月比 -5%)
                    </Text>
                  )}
                </Box>
              </Card>
            </Layout.Section>

            <Layout.Section>
              <LegacyCard title="地域別顧客データ">
                <LegacyCard.Section>
                  <DataTable
                    columnContentTypes={["text", "numeric", "numeric", "numeric"]}
                    headings={["地域", "顧客数", "平均購入額", "リピート率"]}
                    rows={customerRows}
                  />
                </LegacyCard.Section>
              </LegacyCard>
            </Layout.Section>
          </Layout>
        )}

        {selected === 2 && (
          <Layout>
            <Layout.Section>
              <Card>
                <Box padding="4">
                  <Text variant="headingMd" as="h2">
                    商品パフォーマンス
                  </Text>
                  {isLoading ? (
                    <SkeletonBodyText lines={3} />
                  ) : (
                    <Text as="p">
                      最も売れている商品: 商品D (200個)
                      <br />
                      最も収益性の高い商品: 商品C (¥900,000)
                      <br />
                      評価の高い商品: 商品C (4.8/5.0)
                    </Text>
                  )}
                </Box>
              </Card>
            </Layout.Section>

            <Layout.Section>
              <LegacyCard title="商品別データ">
                <LegacyCard.Section>
                  <DataTable
                    columnContentTypes={["text", "numeric", "numeric", "numeric"]}
                    headings={["商品名", "販売数", "売上", "評価"]}
                    rows={productRows}
                  />
                </LegacyCard.Section>
              </LegacyCard>
            </Layout.Section>
          </Layout>
        )}

        {selected === 3 && (
          <Layout>
            <Layout.Section>
              <Card>
                <Box padding="4">
                  <EmptyState
                    heading="AIによる高度な分析"
                    action={{ content: "AIアシスタントに質問する" }}
                    image="/ai-assistant.svg"
                  >
                    <p>
                      AIアシスタントに質問して、ストアデータに基づいた詳細な分析と提案を受けることができます。
                      例えば「最も効果的なマーケティング戦略は？」や「どの商品をプロモーションすべき？」などの質問ができます。
                    </p>
                  </EmptyState>
                </Box>
              </Card>
            </Layout.Section>

            <Layout.Section>
              <Card>
                <Box padding="4">
                  <Text variant="headingMd" as="h2">
                    AIによる予測分析
                  </Text>
                  {isLoading ? (
                    <SkeletonBodyText lines={5} />
                  ) : (
                    <Text as="p">
                      現在のトレンドに基づくと、今後3ヶ月で商品Cの需要が約30%増加すると予測されます。
                      <br />
                      <br />
                      季節的要因により、夏季に向けて商品Aの需要が増加する可能性が高いです。在庫の準備をお勧めします。
                      <br />
                      <br />
                      顧客の購買パターン分析によると、次回のセールでは商品Bと商品Eの組み合わせプロモーションが効果的です。
                    </Text>
                  )}
                </Box>
                <Box padding="4">
                  <ButtonGroup>
                    <Button variant="secondary">詳細予測を見る</Button>
                    <Button variant="primary">予測に基づく戦略を立てる</Button>
                  </ButtonGroup>
                </Box>
              </Card>
            </Layout.Section>
          </Layout>
        )}
      </Tabs>
    </Page>
  )
}

