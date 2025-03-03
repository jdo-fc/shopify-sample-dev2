import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const shop = searchParams.get("shop")

  if (!shop) {
    return NextResponse.json({ error: "Missing shop parameter" }, { status: 400 })
  }

  try {
    // Shopify OAuth認証URLを生成
    const apiKey = process.env.SHOPIFY_API_KEY
    const redirectUri = `${process.env.SHOPIFY_APP_URL}/api/auth/callback`
    const scopes = "read_products,write_products,read_customers,write_customers,read_orders,write_orders"

    const authUrl = `https://${shop}/admin/oauth/authorize?client_id=${apiKey}&scope=${scopes}&redirect_uri=${redirectUri}`

    return NextResponse.redirect(authUrl)
  } catch (error) {
    console.error("Authentication error:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}

