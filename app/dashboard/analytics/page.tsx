"use client"

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
} from "@shopify/polaris"
import { useState, useCallback } from "react"

export default function Analytics() {
  const [selected, setSelected] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const handleTabChange = useCallback((selectedTabIndex: number) => setSelected(selectedTabIndex), [])

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
      secondaryActions={[{ content: "レポートをエクスポート" }, { content: "期間を設定" }]}
    >
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
        {selected === 0 && (
          <Layout>
            <Layout.Section>
              <Card>
                <Card.Section>
                  <Text variant="headingMd" as="h2">
                    売上概要
                  </Text>
                  {isLoading ? (
                    <SkeletonBodyText lines={3} />
                  ) : (
                    <Text as="p">
                      過去30日間の総売上: ¥1,250,000 (前月比 +15%)
                      <br />
                      平均注文額: ¥8,500 (前月比 +5%)
                      <br />
                      注文数: 147 (前月比 +10%)
                    </Text>
                  )}
                </Card.Section>
              </Card>
            </Layout.Section>

            <Layout.Section oneHalf>
              <LegacyCard title="地域別売上">
                <LegacyCard.Section>
                  {isLoading ? (
                    <SkeletonBodyText lines={8} />
                  ) : (
                    <DataTable
                      columnContentTypes={["text", "numeric", "numeric", "numeric"]}
                      headings={["地域", "注文数", "平均注文額", "顧客あたり注文数"]}
                      rows={customerRows}
                    />
                  )}
                </LegacyCard.Section>
              </LegacyCard>
            </Layout.Section>

            <Layout.Section oneHalf>
              <LegacyCard title="売上貢献商品">
                <LegacyCard.Section>
                  {isLoading ? (
                    <SkeletonBodyText lines={8} />
                  ) : (
                    <DataTable
                      columnContentTypes={["text", "numeric", "numeric", "numeric"]}
                      headings={["商品名", "販売数", "売上", "評価"]}
                      rows={productRows}
                    />
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
                <Card.Section>
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
                      分析によると、20代の顧客は平日の夜に購入する傾向があり、商品Aと商品Cを組み合わせて購入することが多いです。
                      また、初回購入から30日以内に2回目の購入をする確率が高いため、初回購入後のフォローアップキャンペーンが効果的です。
                      <br />
                      <br />
                      40代以上の顧客は週末の朝に購入する傾向があり、商品Bへの関心が高いです。この層には商品Bに関連する特典や情報を提供することで、
                      顧客満足度とリピート率を向上させることができます。
                    </Text>
                  )}
                </Card.Section>
                <Card.Section>
                  <ButtonGroup>
                    <Button>詳細分析を見る</Button>
                    <Button primary>セグメント別キャンペーン作成</Button>
                  </ButtonGroup>
                </Card.Section>
              </Card>
            </Layout.Section>
          </Layout>
        )}

        {selected === 2 && (
          <Layout>
            <Layout.Section>
              <Card>
                <Card.Section>
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
                </Card.Section>
              </Card>
            </Layout.Section>

            <Layout.Section>
              <Card>
                <Card.Section>
                  <Text variant="headingMd" as="h2">
                    AIによる商品インサイト
                  </Text>
                  {isLoading ? (
                    <SkeletonBodyText lines={5} />
                  ) : (
                    <Text as="p">
                      商品Aと商品Cは一緒に購入されることが多く、バンドル販売の機会があります。
                      <br />
                      <br />
                      商品Dは数量は多いものの、利益率が低いため、価格戦略の見直しが推奨されます。
                      <br />
                      <br />
                      商品Bは閲覧数は多いものの、購入率が低いため、商品説明や画像の改善が効果的かもしれません。
                    </Text>
                  )}
                </Card.Section>
                <Card.Section>
                  <ButtonGroup>
                    <Button>詳細分析を見る</Button>
                    <Button primary>商品戦略の提案を見る</Button>
                  </ButtonGroup>
                </Card.Section>
              </Card>
            </Layout.Section>
          </Layout>
        )}

        {selected === 3 && (
          <Layout>
            <Layout.Section>
              <Card>
                <Card.Section>
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
                </Card.Section>
              </Card>
            </Layout.Section>

            <Layout.Section>
              <Card>
                <Card.Section>
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
                </Card.Section>
                <Card.Section>
                  <ButtonGroup>
                    <Button>詳細予測を見る</Button>
                    <Button primary>予測に基づく戦略を立てる</Button>
                  </ButtonGroup>
                </Card.Section>
              </Card>
            </Layout.Section>
          </Layout>
        )}
      </Tabs>
    </Page>
  )
}

