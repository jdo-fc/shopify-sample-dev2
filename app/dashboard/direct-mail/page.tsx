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
    { label: "新商品案内テンプレート", value: "template1" },
    { label: "セール告知テンプレート", value: "template2" },
    { label: "お誕生日お祝いテンプレート", value: "template3" },
  ]

  const groupOptions = [
    { label: "全顧客", value: "all" },
    { label: "新規顧客（3ヶ月以内）", value: "new" },
    { label: "VIP顧客", value: "vip" },
    { label: "休眠顧客", value: "inactive" },
  ]

  const customerRows = [
    ["田中太郎", "東京都新宿区", "2023-12-01", "作成済", "未発送"],
    ["鈴木花子", "大阪府大阪市", "2023-12-01", "作成済", "発送済"],
    ["佐藤健一", "愛知県名古屋市", "2023-12-01", "作成中", "-"],
    ["山田優子", "福岡県福岡市", "2023-12-01", "作成済", "未発送"],
    ["中村一郎", "北海道札幌市", "2023-12-01", "作成済", "発送済"],
  ]

  const historyRows = [
    ["2023-12-01", "新商品案内DM", "150", "145", "5", "完了"],
    ["2023-11-15", "冬季セールDM", "200", "198", "2", "完了"],
    ["2023-11-01", "会員限定DM", "80", "78", "2", "完了"],
    ["2023-10-15", "お誕生日DM", "30", "30", "0", "完了"],
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
                    <TextField label="件名" value="新商品のご案内" />
                    <div style={{ marginTop: "1rem" }}>
                      <TextField label="本文" multiline={4} value="拝啓　時下ますますご清祥のこととお慶び申し上げます。" />
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
                    <List.Item>今月の総発送数: 460通</List.Item>
                    <List.Item>平均到着率: 98.2%</List.Item>
                    <List.Item>平均反応率: 12.5%</List.Item>
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