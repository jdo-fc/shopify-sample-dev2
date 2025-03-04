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
    ["スイーツカフェ Bloom", "東京都渋谷区", "25回", "¥2,250,000", "4.8"],
    ["パティスリーさくら", "大阪府大阪市", "18回", "¥1,580,000", "4.5"],
    ["ケーキハウスメイプル", "愛知県名古屋市", "12回", "¥980,000", "4.2"],
    ["洋菓子工房アンジュ", "福岡県福岡市", "30回", "¥2,780,000", "4.7"],
    ["カフェベーカリーオリーブ", "北海道札幌市", "15回", "¥1,250,000", "4.0"],
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
              <Box padding="4">
                <Text variant="headingMd" as="h2">
                  顧客概要
                </Text>
                {isLoading ? (
                  <SkeletonBodyText lines={3} />
                ) : (
                  <Text as="p">
                    総顧客数: 523店舗 (前月比 +8%)
                    <br />
                    平均月間購入額: ¥185,000
                    <br />
                    平均注文頻度: 2.8回/月
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
                    headings={["店舗名", "所在地", "購入回数", "累計購入額", "評価"]}
                    rows={customerRows}
                  />
                )}
              </LegacyCard.Section>
            </LegacyCard>
          </Layout.Section>

          <Layout.Section>
            <Card>
              <Box padding="4">
                <Text variant="headingMd" as="h2">
                  AIによる顧客インサイト
                </Text>
                {isLoading ? (
                  <SkeletonBodyText lines={5} />
                ) : (
                  <Text as="p">
                    最近の顧客動向分析：
                    <br />
                    1. エコ包材への関心が高まっており、特に新規開業店舗の78%がエコクラフトシリーズを選択
                    <br />
                    2. 季節商品（バレンタイン、クリスマス等）の発注が2ヶ月前から増加傾向
                    <br />
                    3. ギフトボックスと紙袋のセット購入率が前年比25%上昇
                    <br />
                    4. SNS映えする包装資材を求める顧客が増加中（特に20-30代オーナー）
                  </Text>
                )}
              </Box>
              <Box padding="4">
                <ButtonGroup>
                  <Button variant="primary">詳細分析を表示</Button>
                  <Button variant="secondary">キャンペーンを作成</Button>
                </ButtonGroup>
              </Box>
            </Card>
          </Layout.Section>

          <Layout.Section>
            <Card>
              <Box padding="4">
                <EmptyState
                  heading="顧客フィードバック"
                  action={{ content: "フィードバックを収集" }}
                  image="/feedback-empty-state.svg"
                >
                  <p>
                    商品の使用感や改善要望を収集し、より良い包装資材の開発に活用しましょう。
                    特に季節商品や新商品について、お客様の声をお待ちしています。
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

