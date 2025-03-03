"use client"

import type React from "react"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Page, Layout, Card, FormLayout, TextField, Button, Text, Banner } from "@shopify/polaris"

export default function SignIn() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const result = await signIn("credentials", {
        username,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError("ユーザー名またはパスワードが正しくありません。")
        setIsLoading(false)
      } else {
        router.push("/dashboard")
      }
    } catch (error) {
      setError("ログイン中にエラーが発生しました。もう一度お試しください。")
      setIsLoading(false)
    }
  }

  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Card>
            <div style={{ padding: "2rem" }}>
              <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                <img src="/shopify-logo.svg" alt="Shopify Logo" style={{ width: "150px", marginBottom: "1rem" }} />
                <Text variant="headingLg" as="h1">
                  Shopifyアプリにログイン
                </Text>
              </div>

              {error && (
                <Banner status="critical" title="ログインエラー">
                  <p>{error}</p>
                </Banner>
              )}

              <form onSubmit={handleSubmit}>
                <FormLayout>
                  <TextField
                    label="ユーザー名"
                    value={username}
                    onChange={setUsername}
                    autoComplete="username"
                    required
                  />
                  <TextField
                    label="パスワード"
                    value={password}
                    onChange={setPassword}
                    type="password"
                    autoComplete="current-password"
                    required
                  />
                  <Button submit primary fullWidth loading={isLoading}>
                    ログイン
                  </Button>
                </FormLayout>
              </form>

              <div style={{ marginTop: "1rem", textAlign: "center" }}>
                <Text variant="bodyMd" as="p" color="subdued">
                  デモ用アカウント: admin / password
                </Text>
              </div>
            </div>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  )
}

