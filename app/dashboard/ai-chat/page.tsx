"use client"

import type React from "react"

import { useState, useCallback, useRef, useEffect } from "react"
import { Page, Layout, Card, TextField, Button, Text, Avatar, Spinner } from "@shopify/polaris"
import { SendMajor } from "@shopify/polaris-icons"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
}

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "こんにちは！Shopifyストアのデータ分析やマーケティング戦略について質問があればお気軽にどうぞ。",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const handleInputChange = useCallback((value: string) => setInputValue(value), [])

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  const handleSendMessage = useCallback(() => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // AIの応答をシミュレート
    setTimeout(() => {
      let aiResponse: Message

      if (inputValue.toLowerCase().includes("売上")) {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          content:
            "過去30日間の売上分析によると、前月比で15%増加しています。特に商品Cの売上が顕著で、全体の35%を占めています。週末のプロモーションが特に効果的でした。",
          sender: "ai",
          timestamp: new Date(),
        }
      } else if (inputValue.toLowerCase().includes("顧客") || inputValue.toLowerCase().includes("ユーザー")) {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          content:
            "顧客分析によると、リピート率は42%で、VIP顧客（5回以上の購入）は全体の15%です。20-35歳の女性が最も活発な顧客層で、平均購入額は¥12,500です。顧客維持のためにロイヤルティプログラムの導入を検討されてはいかがでしょうか？",
          sender: "ai",
          timestamp: new Date(),
        }
      } else if (inputValue.toLowerCase().includes("商品") || inputValue.toLowerCase().includes("プロダクト")) {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          content:
            "商品パフォーマンス分析によると、商品Aと商品Cが最も人気があります。商品Bは閲覧数は多いものの、コンバージョン率が低いため、商品説明や価格設定の見直しが推奨されます。また、商品AとCのバンドル販売を検討すると、平均注文額を15%程度向上させる可能性があります。",
          sender: "ai",
          timestamp: new Date(),
        }
      } else if (inputValue.toLowerCase().includes("マーケティング") || inputValue.toLowerCase().includes("広告")) {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          content:
            "マーケティング分析によると、Instagramからの流入が最も高いコンバージョン率を示しています。また、メールマーケティングは平均して18%の開封率と5%のクリック率を達成しています。次のキャンペーンでは、Instagramでの商品Cのプロモーションと、過去3ヶ月以内に購入した顧客へのフォローアップメールが効果的でしょう。",
          sender: "ai",
          timestamp: new Date(),
        }
      } else {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          content:
            "ご質問ありがとうございます。もう少し具体的に教えていただけますか？例えば、売上分析、顧客分析、商品パフォーマンス、マーケティング戦略などについて詳しく知りたい場合は、お気軽にお尋ねください。",
          sender: "ai",
          timestamp: new Date(),
        }
      }

      setMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
    }, 1500)
  }, [inputValue])

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        handleSendMessage()
      }
    },
    [handleSendMessage],
  )

  return (
    <Page title="AIアシスタント">
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
                    {message.sender === "ai" && <Avatar source="/ai-avatar.svg" size="small" />}
                    <div
                      style={{
                        maxWidth: "70%",
                        padding: "0.75rem 1rem",
                        borderRadius: "1rem",
                        backgroundColor: message.sender === "user" ? "#5c6ac4" : "#f4f6f8",
                        color: message.sender === "user" ? "white" : "inherit",
                        marginLeft: message.sender === "ai" ? "0.5rem" : 0,
                        marginRight: message.sender === "user" ? "0.5rem" : 0,
                      }}
                    >
                      <Text as="p">{message.content}</Text>
                      <div
                        style={{
                          fontSize: "0.75rem",
                          marginTop: "0.25rem",
                          textAlign: message.sender === "user" ? "right" : "left",
                          opacity: 0.7,
                        }}
                      >
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </div>
                    {message.sender === "user" && <Avatar customer initials="ME" size="small" />}
                  </div>
                ))}
                {isLoading && (
                  <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
                    <Avatar source="/ai-avatar.svg" size="small" />
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
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ flex: 1 }}>
                    <TextField
                      label=""
                      value={inputValue}
                      onChange={handleInputChange}
                      placeholder="AIアシスタントに質問する..."
                      multiline={3}
                      maxHeight={150}
                      autoComplete="off"
                      onKeyDown={handleKeyPress}
                    />
                  </div>
                  <div style={{ marginLeft: "1rem" }}>
                    <Button onClick={handleSendMessage} primary icon={SendMajor}>
                      送信
                    </Button>
                  </div>
                </div>
                <div style={{ marginTop: "0.5rem", fontSize: "0.8rem", color: "#637381" }}>
                  例:
                  「先月の売上はどうでしたか？」「人気商品は何ですか？」「効果的なマーケティング戦略を教えてください」
                </div>
              </div>
            </div>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  )
}

