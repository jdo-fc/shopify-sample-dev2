"use client"

import { useState, useCallback } from "react"
import {
  Page,
  Layout,
  Card,
  Text,
  ButtonGroup,
  Button,
  Tabs,
  Select,
  TextField,
  DataTable,
  Badge,
  Box,
  Banner,
  List,
  LegacyCard,
  ProgressBar,
} from "@shopify/polaris"

export default function DirectMail() {
  const [selected, setSelected] = useState(0)
  const [selectedTemplate, setSelectedTemplate] = useState("template1")
  const [selectedGroup, setSelectedGroup] = useState("all")

  const handleTabChange = useCallback((selectedTabIndex: number) => setSelected(selectedTabIndex), [])

  const tabs = [
    {
      id: "dm-list",
      content: "宛名リスト作成",
      accessibilityLabel: "宛名リスト作成タブ",
      panelID: "dm-list-content",
    },
    {
      id: "dm-template",
      content: "DMテンプレート",
      accessibilityLabel: "DMテンプレートタブ",
      panelID: "dm-template-content",
    },
    {
      id: "dm-history",
      content: "発送履歴",
      accessibilityLabel: "発送履歴タブ",
      panelID: "dm-history-content",
    },
  ]

  const templateOptions = [
    { label: "新商品案内（エコ包材シリーズ）", value: "template1" },
    { label: "季節限定パッケージのご案内", value: "template2" },
    { label: "開店記念特別割引", value: "template3" },
  ]

  const groupOptions = [
    { label: "全店舗", value: "all" },
    { label: "新規開業店舗（3ヶ月以内）", value: "new" },
    { label: "定期発注店舗", value: "vip" },
    { label: "未発注店舗（3ヶ月以上）", value: "inactive" },
  ]

  const customerRows = [
    ["スイーツカフェ Bloom", "東京都渋谷区神宮前1-1-1", "2023-12-01", "作成済", "未発送"],
    ["パティスリーさくら", "大阪府大阪市中央区心斎橋2-2-2", "2023-12-01", "作成済", "発送済"],
    ["ケーキハウスメイプル", "愛知県名古屋市中区栄3-3-3", "2023-12-01", "作成中", "-"],
    ["洋菓子工房アンジュ", "福岡県福岡市中央区天神4-4-4", "2023-12-01", "作成済", "未発送"],
    ["カフェベーカリーオリーブ", "北海道札幌市中央区大通5-5-5", "2023-12-01", "作成済", "発送済"],
  ]

  const historyRows = [
    ["2024-02-01", "バレンタイン向けパッケージ案内", "250", "248", "2", "完了"],
    ["2024-01-15", "エコ包材新商品案内", "180", "178", "2", "完了"],
    ["2023-12-01", "年末年始ギフトボックス特集", "320", "315", "5", "完了"],
    ["2023-11-15", "クリスマス限定パッケージ案内", "280", "276", "4", "完了"],
  ]

  return (
    <Page
      title="DM作成・郵送"
      primaryAction={{
        content: "DMを作成",
        onAction: () => console.log("DM作成ボタンがクリックされました"),
      }}
    >
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
        {selected === 0 && (
          <Layout>
            <Layout.Section>
              <LegacyCard title="宛名リスト作成">
                <LegacyCard.Section>
                  <Select
                    label="顧客グループ"
                    options={groupOptions}
                    onChange={(value) => setSelectedGroup(value)}
                    value={selectedGroup}
                  />
                  <div style={{ marginTop: "1rem" }}>
                    <Banner status="info">
                      <p>選択された顧客グループ: {groupOptions.find((opt) => opt.value === selectedGroup)?.label}</p>
                      <List>
                        <List.Item>対象顧客数: 150名</List.Item>
                        <List.Item>推定郵送料: ¥12,000</List.Item>
                      </List>
                    </Banner>
                  </div>
                </LegacyCard.Section>
                <LegacyCard.Section>
                  <DataTable
                    columnContentTypes={["text", "text", "text", "text", "text"]}
                    headings={["顧客名", "住所", "登録日", "宛名状態", "発送状態"]}
                    rows={customerRows}
                  />
                </LegacyCard.Section>
                <LegacyCard.Section>
                  <ButtonGroup>
                    <Button variant="primary">宛名リストをダウンロード</Button>
                    <Button>PDFプレビュー</Button>
                  </ButtonGroup>
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
                  <Select
                    label="テンプレート選択"
                    options={templateOptions}
                    onChange={(value) => setSelectedTemplate(value)}
                    value={selectedTemplate}
                  />
                  <div style={{ marginTop: "1rem" }}>
                    <TextField 
                      label="件名" 
                      value="新作エコクラフトパッケージのご案内" 
                    />
                    <div style={{ marginTop: "1rem" }}>
                      <TextField 
                        label="本文" 
                        multiline={4} 
                        value="拝啓　時下ますますご清祥のこととお慶び申し上げます。

この度、環境に配慮した新しいエコクラフトパッケージシリーズを発売することとなりました。
SDGsに対応した包装で、お客様の環境への取り組みをサポートいたします。

・エコクラフトギフトボックス（3サイズ）
・リサイクルペーパー手提げ袋
・生分解性リボン

ぜひ新商品をご検討いただけますと幸いです。" 
                      />
                    </div>
                  </div>
                </Box>
                <Box padding="4">
                  <ButtonGroup>
                    <Button variant="primary">テンプレートを保存</Button>
                    <Button>プレビュー</Button>
                  </ButtonGroup>
                </Box>
              </Card>
            </Layout.Section>

            <Layout.Section secondary>
              <Card>
                <Box padding="4">
                  <Text variant="headingMd" as="h2">
                    テンプレートのヒント
                  </Text>
                  <List>
                    <List.Item>顧客名や購入履歴などの変数を使用できます</List.Item>
                    <List.Item>画像やロゴを追加することができます</List.Item>
                    <List.Item>デザインテンプレートから選択可能です</List.Item>
                  </List>
                </Box>
              </Card>
            </Layout.Section>
          </Layout>
        )}

        {selected === 2 && (
          <Layout>
            <Layout.Section>
              <LegacyCard title="発送履歴">
                <LegacyCard.Section>
                  <DataTable
                    columnContentTypes={["text", "text", "numeric", "numeric", "numeric", "text"]}
                    headings={["発送日", "DM種類", "発送数", "到着数", "不着数", "状態"]}
                    rows={historyRows}
                  />
                </LegacyCard.Section>
                <LegacyCard.Section>
                  <ButtonGroup>
                    <Button>CSVエクスポート</Button>
                    <Button>詳細レポート</Button>
                  </ButtonGroup>
                </LegacyCard.Section>
              </LegacyCard>
            </Layout.Section>

            <Layout.Section>
              <Card>
                <Box padding="4">
                  <Text variant="headingMd" as="h2">
                    発送状況サマリー
                  </Text>
                  <List>
                    <List.Item>今月の総発送数: 580通</List.Item>
                    <List.Item>平均到着率: 99.1%</List.Item>
                    <List.Item>平均受注率: 18.5%</List.Item>
                  </List>
                </Box>
              </Card>
            </Layout.Section>
          </Layout>
        )}
      </Tabs>
    </Page>
  )
} 