"use client"

import { Page, Card, Button, Text, EmptyState } from "@shopify/polaris"
import { useRouter } from "next/navigation"

export default function Welcome() {
  const router = useRouter()

  return (
    <Page>
      <Card>
        <div style={{ padding: "2rem" }}>
          <EmptyState
            heading="Shopifyアプリへようこそ"
            image="/welcome-image.svg"
            action={{
              content: "ダッシュボードを見る",
              onAction: () => router.push("/dashboard"),
            }}
          >
            <p>
              このアプリはShopifyストアのデータを分析し、AIを活用した提案を行います。
              <br />
              売上、顧客、商品の分析や、AIによるマーケティング提案を確認できます。
            </p>
          </EmptyState>
        </div>
      </Card>
    </Page>
  )
}

