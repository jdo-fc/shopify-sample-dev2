"use client"

import { EmptyState, Layout, Page } from "@shopify/polaris"
import { useEffect } from "react"

export default function Home() {
  useEffect(() => {
    console.log('Home page mounted')
    try {
      console.log('Window object available:', typeof window !== 'undefined')
      console.log('Document object available:', typeof document !== 'undefined')
    } catch (error) {
      console.error('Error checking environment:', error)
    }
  }, [])

  return (
    <Page>
      <Layout>
        <Layout.Section>
          <EmptyState
            heading="Shopifyアプリへようこそ"
            action={{ content: "ダッシュボードを見る", url: "/dashboard" }}
            image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
          >
            <p>このアプリはShopifyストアのデータを分析し、AIを活用した提案を行います。</p>
          </EmptyState>
        </Layout.Section>
      </Layout>
    </Page>
  )
}

