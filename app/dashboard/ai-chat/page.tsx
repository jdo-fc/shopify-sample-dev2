"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { Page, Layout, Card, TextField, Button, Text, Avatar, Spinner, Tag, ActionList, Popover } from "@shopify/polaris"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
  category?: string
}

const SUGGESTED_QUESTIONS = [
  {
    category: "売上分析",
    questions: [
      "先月の売上トップ3商品は何ですか？",
      "売上が最も伸びている時間帯はいつですか？",
      "今月の売上目標の達成率はどのくらいですか？"
    ]
  },
  {
    category: "商品分析",
    questions: [
      "在庫が少なくなっている商品はありますか？",
      "返品率が高い商品はどれですか？",
      "商品Aと相性の良い商品を教えてください"
    ]
  },
  {
    category: "顧客分析",
    questions: [
      "リピート率の高い顧客層を教えてください",
      "最近の顧客の年齢層の傾向を分析してください",
      "顧客の平均購入額はいくらですか？"
    ]
  }
]

export default function AIChat() {
  console.log("AIChat component rendered")

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "こんにちは！Shopifyストアのデータ分析について質問があればお答えします。\n\n以下のような質問に対応できます：\n・売上分析\n・商品分析\n・顧客分析\n・マーケティング戦略",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [popoverActive, setPopoverActive] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const handleInputChange = useCallback((value: string) => setInputValue(value), [])

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  const handleSendMessage = useCallback((text: string = inputValue) => {
    if (!text.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: text,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)
    setPopoverActive(false)

    // AIの応答をシミュレート
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(text),
        sender: "ai",
        timestamp: new Date(),
        category: detectCategory(text)
      }

      setMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
    }, 1500)
  }, [inputValue])

  const detectCategory = (text: string): string => {
    if (text.includes("売上") || text.includes("収益")) return "売上分析"
    if (text.includes("商品") || text.includes("在庫")) return "商品分析"
    if (text.includes("顧客") || text.includes("ユーザー")) return "顧客分析"
    return "その他"
  }

  const generateAIResponse = (text: string): string => {
    if (text.includes("売上")) {
      return "直近30日間の売上分析結果です：\n\n" +
        "・総売上: ¥18,500,000 (前月比 +15%)\n" +
        "・売上トップ3商品:\n" +
        "  1. パウンドケーキ箱(クラフト): ¥4,510,000\n" +
        "  2. UNIエコクラフトデコ箱4号H80: ¥2,530,000\n" +
        "  3. UNIライトプルーフ5号H65: ¥1,980,000\n\n" +
        "特に新規開業の洋菓子店からの注文が好調で、前年同期比で25%増加しています。"
    }
    if (text.includes("商品")) {
      return "商品分析結果です：\n\n" +
        "・売れ筋商品: パウンドケーキ箱(クラフト), UNIエコクラフトシリーズ\n" +
        "・在庫アラート: UNIライトプルーフ5号H65 (在庫残150個)\n" +
        "・高評価商品: nwホワイト4号H60 (評価平均4.9)\n\n" +
        "エコクラフトシリーズと紙袋のセット販売ページの作成を検討することをお勧めします。環境配慮型包装のニーズが高まっています。"
    }
    return "申し訳ありません。もう少し具体的な質問をいただけますでしょうか？\n例えば以下のような質問に回答できます：\n\n" +
      "・「今月の売上トップ商品は何ですか？」\n" +
      "・「どの包装資材が人気ですか？」\n" +
      "・「新商品の提案をしてください」"
  }

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        handleSendMessage()
      }
    },
    [handleSendMessage],
  )

  const togglePopover = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    [],
  )

  const activator = (
    <Button onClick={togglePopover}>
      質問例を見る
    </Button>
  )

  return (
    <Page
      title="AIアシスタント"
      subtitle="ストアのデータを分析し、最適な提案を行います"
      backAction={{ content: "ダッシュボードに戻る", url: "/dashboard" }}
    >
      <Layout>
        <Layout.Section>
          <Card>
            <div style={{ display: "flex", flexDirection: "column", height: "70vh" }}>
              <div style={{ flex: 1, overflowY: "auto", padding: "1rem" }}>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    style={{
                      display: "flex",
                      justifyContent: message.sender === "user" ? "flex-end" : "flex-start",
                      marginBottom: "1rem",
                    }}
                  >
                    {message.sender === "ai" && (
                      <Avatar
                        initials="AI"
                        customer
                      />
                    )}
                    <div
                      style={{
                        maxWidth: "70%",
                        padding: "0.75rem 1rem",
                        borderRadius: "1rem",
                        backgroundColor: message.sender === "user" ? "#5c6ac4" : "#f4f6f8",
                        color: message.sender === "user" ? "white" : "inherit",
                        marginLeft: message.sender === "ai" ? "0.5rem" : 0,
                        marginRight: message.sender === "user" ? "0.5rem" : 0,
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      <Text as="p">{message.content}</Text>
                      <div
                        style={{
                          fontSize: "0.75rem",
                          marginTop: "0.25rem",
                          opacity: 0.7,
                          display: "flex",
                          justifyContent: message.sender === "user" ? "flex-end" : "flex-start",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                      >
                        {message.category && <Tag>{message.category}</Tag>}
                        <span>{message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                      </div>
                    </div>
                    {message.sender === "user" && (
                      <Avatar customer initials="ME" />
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
                    <Avatar source="/ai-avatar.png" />
                    <div
                      style={{
                        maxWidth: "70%",
                        padding: "0.75rem 1rem",
                        borderRadius: "1rem",
                        backgroundColor: "#f4f6f8",
                        marginLeft: "0.5rem",
                      }}
                    >
                      <Spinner size="small" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              <div style={{ padding: "1rem", borderTop: "1px solid #dfe3e8" }}>
                <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
                  <Popover
                    active={popoverActive}
                    activator={activator}
                    onClose={togglePopover}
                    sectioned
                  >
                    <ActionList
                      sections={SUGGESTED_QUESTIONS.map((section) => ({
                        title: section.category,
                        items: section.questions.map((q) => ({
                          content: q,
                          onAction: () => handleSendMessage(q),
                        })),
                      }))}
                    />
                  </Popover>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                  <div style={{ flex: 1 }}>
                    <TextField
                      label=""
                      value={inputValue}
                      onChange={handleInputChange}
                      placeholder="AIアシスタントに質問する..."
                      multiline={3}
                      maxHeight={150}
                      autoComplete="off"
                    />
                  </div>
                  <div style={{ marginTop: "2px" }}>
                    <Button onClick={() => handleSendMessage()} variant="primary">
                      送信
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  )
}

