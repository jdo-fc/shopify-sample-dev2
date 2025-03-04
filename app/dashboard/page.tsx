"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
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
  const router = useRouter()

  const toggleIsLoading = useCallback(() => setIsLoading((isLoading) => !isLoading), [])

  const handleAIChatClick = useCallback(() => {
    console.log("AIチャットボタンがクリックされました")
    try {
      console.log("画面遷移を試みます: /dashboard/ai-chat")
      router.push("/dashboard/ai-chat")
      console.log("router.push が実行されました")
    } catch (error) {
      console.error("画面遷移エラー:", error)
    }
  }, [router])

  // サンプルデータ
  const rows = [
    ["パウンドケーキ箱(クラフト)", "¥90,200", "1,342", "4.8"],
    ["UNIエコクラフトデコ箱4号H80", "¥50,600", "956", "4.7"],
    ["UNIライトプルーフ5号H65", "¥79,200", "789", "4.6"],
    ["nwホワイト4号H60", "¥44,000", "867", "4.9"],
    ["パウンドケーキ箱S(ニュートラルグレー)", "¥66,000", "845", "4.5"],
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
                  最近の購買動向分析によると、パウンドケーキ箱と紙袋のセット注文が増加傾向にあります。
                  セット販売の商品ページ作成をおすすめします。また、エコクラフトシリーズは新規開業の洋菓子店からの注文が25%増加しています。
                </Text>
              )}
            </Box>
            <Box padding="4">
              <ButtonGroup>
                <Button variant="secondary">詳細を見る</Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    console.log("AIチャットボタンがクリックされました")
                    router.push("/dashboard/ai-chat")
                  }}
                >
                  AIに質問する
                </Button>
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
                  過去30日間の購入データに基づくと、環境配慮型のエコクラフトシリーズが新規開業の20-30代オーナー層に支持されています。
                  InstagramやTikTokでSDGsやエシカル消費を意識した包装のスタイリング提案を行うことで、新規顧客獲得率が35%向上する可能性があります。
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

