"use client"

import { useState, useCallback } from "react"
import {
  Page,
  Layout,
  Card,
  Button,
  Text,
  SkeletonBodyText,
  LegacyCard,
  DataTable,
  ButtonGroup,
  Box,
} from "@shopify/polaris"

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false)

  const toggleIsLoading = useCallback(() => setIsLoading((isLoading) => !isLoading), [])

  // サンプルデータ
  const rows = [
    ["商品A", "¥12,000", "120", "4.5"],
    ["商品B", "¥8,500", "85", "4.2"],
    ["商品C", "¥15,000", "60", "4.8"],
    ["商品D", "¥5,000", "200", "3.9"],
    ["商品E", "¥9,800", "75", "4.1"],
  ]

  return (
    <Page title="ダッシュボード" primaryAction={{ content: "データを更新", onAction: toggleIsLoading }}>
      <Layout>
        <Layout.Section>
          <Card>
            <Box padding="4">
              <Text variant="headingMd" as="h2">
                AIによる分析概要
              </Text>
              {isLoading ? (
                <SkeletonBodyText lines={3} />
              ) : (
                <Text as="p">
                  最近の顧客行動分析によると、商品Aと商品Cの組み合わせ購入が増加しています。
                  バンドル販売の検討をおすすめします。また、リピート購入率が15%向上しています。
                </Text>
              )}
            </Box>
            <Box padding="4">
              <ButtonGroup>
                <Button variant="secondary">詳細を見る</Button>
                <Button variant="primary">AIに質問する</Button>
              </ButtonGroup>
            </Box>
          </Card>
        </Layout.Section>

        <Layout.Section variant="oneHalf">
          <LegacyCard title="売上とコンバージョン">
            <LegacyCard.Section>
              {isLoading ? (
                <SkeletonBodyText lines={8} />
              ) : (
                <div>売上とコンバージョンのグラフ</div>
              )}
            </LegacyCard.Section>
          </LegacyCard>
        </Layout.Section>

        <Layout.Section variant="oneHalf">
          <LegacyCard title="人気商品">
            <LegacyCard.Section>
              {isLoading ? (
                <SkeletonBodyText lines={8} />
              ) : (
                <DataTable
                  columnContentTypes={["text", "numeric", "numeric", "numeric"]}
                  headings={["商品名", "売上", "販売数", "評価"]}
                  rows={rows}
                />
              )}
            </LegacyCard.Section>
          </LegacyCard>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <Box padding="4">
              <Text variant="headingMd" as="h2">
                AIによるマーケティング提案
              </Text>
              {isLoading ? (
                <SkeletonBodyText lines={3} />
              ) : (
                <Text as="p">
                  過去30日間の購入データに基づくと、20代女性向けの商品Bのプロモーションが効果的です。
                  週末にSNSキャンペーンを実施することで、コンバージョン率が約25%向上する可能性があります。
                </Text>
              )}
            </Box>
            <Box padding="4">
              <Button variant="primary">キャンペーンを作成</Button>
            </Box>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  )
}

