"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
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
  const router = useRouter()

  const handleTabChange = useCallback((selectedTabIndex: number) => {
    console.log("Tab changed to:", selectedTabIndex)
    setSelected(selectedTabIndex)
  }, [])

  const handleAIChatClick = useCallback(() => {
    console.log("AIアシスタントボタンがクリックされました")
    try {
      console.log("画面遷移を試みます: /dashboard/ai-chat")
      router.push("/dashboard/ai-chat")
      console.log("router.push が実行されました")
    } catch (error) {
      console.error("画面遷移エラー:", error)
    }
  }, [router])

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
    ["関東", "158", "¥1,850,000", "3.2"],
    ["関西", "125", "¥1,580,000", "2.8"],
    ["中部", "89", "¥1,250,000", "2.5"],
    ["九州", "65", "¥980,000", "2.1"],
    ["北海道", "45", "¥750,000", "1.8"],
  ]

  const productRows = [
    ["パウンドケーキ箱(クラフト)", "1,342", "¥4,510,000", "4.8"],
    ["UNIエコクラフトデコ箱4号H80", "956", "¥2,530,000", "4.7"],
    ["UNIライトプルーフ5号H65", "789", "¥1,980,000", "4.6"],
    ["nwホワイト4号H60", "867", "¥2,200,000", "4.9"],
    ["パウンドケーキ箱S(ニュートラルグレー)", "845", "¥3,300,000", "4.5"],
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
                      過去30日間の売上は前月比15%増加しました。特にパウンドケーキ箱(クラフト)の売上が好調で、
                      新規開業の洋菓子店からの注文が30%を占めています。
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
                      最も活発な顧客層: 新規開業1-3年目の洋菓子店 (全体の42%)
                      <br />
                      リピート率: 68% (前月比 +12%)
                      <br />
                      新規顧客獲得コスト: ¥25,000 (前月比 -15%)
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
                      最も売れている商品: パウンドケーキ箱(クラフト) (1,342個)
                      <br />
                      最も収益性の高い商品: パウンドケーキ箱(クラフト) (¥4,510,000)
                      <br />
                      評価の高い商品: nwホワイト4号H60 (4.9/5.0)
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

            <Layout.Section>
              <Card>
                <Box padding="4">
                  <Text variant="headingMd" as="h2">
                    商品組み合わせ分析
                  </Text>
                  {isLoading ? (
                    <SkeletonBodyText lines={5} />
                  ) : (
                    <Text as="p">
                      よく一緒に購入される商品の組み合わせ：
                      <br />
                      <br />
                      ・パウンドケーキ箱(クラフト) + ギフト用紙袋M
                      <br />
                      　→ 新規開業の洋菓子店での注文が多く、特に贈答用途で人気
                      <br />
                      <br />
                      ・UNIエコクラフトデコ箱4号H80 + リボンS
                      <br />
                      　→ カフェでのテイクアウト用途での組み合わせが増加中
                      <br />
                      <br />
                      ・nwホワイト4号H60 + ケーキピック
                      <br />
                      　→ バースデーケーキ用のギフトセットとして人気上昇中
                      <br />
                      <br />
                      推奨アクション：
                      <br />
                      ・上記の組み合わせでのセット販売ページの作成
                      <br />
                      ・新規開業店向けのスターターパックとしての提案
                      <br />
                      ・季節イベントに合わせたギフトセットの展開
                    </Text>
                  )}
                </Box>
              </Card>
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
                    action={{
                      content: "AIアシスタントに質問する！",
                      onAction: handleAIChatClick
                    }}
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
                      現在のトレンドに基づくと、今後3ヶ月でエコクラフトシリーズの需要が約35%増加すると予測されます。
                      <br />
                      <br />
                      季節的要因により、年末年始に向けてギフトボックスの需要が増加する可能性が高いです。在庫の準備をお勧めします。
                      <br />
                      <br />
                      顧客の購買パターン分析によると、次回のセールではパウンドケーキ箱と紙袋の組み合わせプロモーションが効果的です。
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


