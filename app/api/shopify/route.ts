import { NextResponse } from "next/server"

// Shopify APIとの通信をシミュレートするモックデータ
const mockData = {
  products: [
    { id: 1, title: "パウンドケーキ箱(クラフト)", price: "90200", inventory: 850, rating: 4.8 },
    { id: 2, title: "UNIエコクラフトデコ箱4号H80", price: "50600", inventory: 650, rating: 4.7 },
    { id: 3, title: "UNIライトプルーフ5号H65", price: "79200", inventory: 150, rating: 4.6 },
    { id: 4, title: "nwホワイト4号H60", price: "44000", inventory: 780, rating: 4.9 },
    { id: 5, title: "パウンドケーキ箱S(ニュートラルグレー)", price: "66000", inventory: 420, rating: 4.5 },
  ],
  customers: [
    { id: 1, name: "スイーツカフェ Bloom", email: "bloom@example.com", orders: 25, totalSpent: "2250000" },
    { id: 2, name: "パティスリーさくら", email: "sakura@example.com", orders: 18, totalSpent: "1580000" },
    { id: 3, name: "ケーキハウスメイプル", email: "maple@example.com", orders: 12, totalSpent: "980000" },
    { id: 4, name: "洋菓子工房アンジュ", email: "ange@example.com", orders: 30, totalSpent: "2780000" },
    { id: 5, name: "カフェベーカリーオリーブ", email: "olive@example.com", orders: 15, totalSpent: "1250000" },
  ],
  orders: [
    { id: 1, orderNumber: "#1001", customer: "スイーツカフェ Bloom", date: "2023-10-15", total: "451000", status: "完了" },
    { id: 2, orderNumber: "#1002", customer: "パティスリーさくら", date: "2023-10-12", total: "253000", status: "完了" },
    { id: 3, orderNumber: "#1003", customer: "ケーキハウスメイプル", date: "2023-10-10", total: "396000", status: "処理中" },
    { id: 4, orderNumber: "#1004", customer: "洋菓子工房アンジュ", date: "2023-10-08", total: "440000", status: "完了" },
    { id: 5, orderNumber: "#1005", customer: "カフェベーカリーオリーブ", date: "2023-10-05", total: "330000", status: "完了" },
  ],
  analytics: {
    sales: {
      total: "18500000",
      previousPeriod: "16087500",
      averageOrder: "185000",
      orders: 147,
    },
    customers: {
      total: 523,
      active: 312,
      new: 78,
      returning: 234,
    },
    products: {
      topSelling: ["パウンドケーキ箱(クラフト)", "UNIエコクラフトデコ箱4号H80", "UNIライトプルーフ5号H65", "nwホワイト4号H60", "パウンドケーキ箱S(ニュートラルグレー)"],
      inventory: {
        inStock: 2850,
        lowStock: 150,
        outOfStock: 8,
      },
    },
  },
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const resource = searchParams.get("resource")

  // リソースに基づいてデータを返す
  switch (resource) {
    case "products":
      return NextResponse.json(mockData.products)
    case "customers":
      return NextResponse.json(mockData.customers)
    case "orders":
      return NextResponse.json(mockData.orders)
    case "analytics":
      return NextResponse.json(mockData.analytics)
    default:
      return NextResponse.json({ error: "Invalid resource" }, { status: 400 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // ここでShopify APIへのリクエストをシミュレート
    return NextResponse.json({ success: true, message: "Operation completed successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}

