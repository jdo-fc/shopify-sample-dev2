import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const shop = searchParams.get("shop")
  const code = searchParams.get("code")

  if (!shop || !code) {
    return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
  }

  try {
    // 実際のアプリでは、ここでShopifyのOAuth認証フローを完了させます
    // 今回はモックとして簡易的に実装します

    // アクセストークンを取得したと仮定
    const accessToken = "mock_access_token"

    // ダッシュボードにリダイレクト
    return NextResponse.redirect(new URL("/dashboard", request.url))
  } catch (error) {
    console.error("Authentication error:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}

