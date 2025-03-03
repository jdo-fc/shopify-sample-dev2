import { NextResponse } from "next/server"

// Shopify APIとの通信をシミュレートするモックデータ
const mockData = {
  products: [
    { id: 1, title: "商品A", price: "12000", inventory: 120, rating: 4.5 },
    { id: 2, title: "商品B", price: "8500", inventory: 85, rating: 4.2 },
    { id: 3, title: "商品C", price: "15000", inventory: 60, rating: 4.8 },
    { id: 4, title: "商品D", price: "5000", inventory: 200, rating: 3.9 },
    { id: 5, title: "商品E", price: "9800", inventory: 75, rating: 4.1 },
  ],
  customers: [
    { id: 1, name: "山田太郎", email: "yamada@example.com", orders: 5, totalSpent: "45000" },
    { id: 2, name: "佐藤花子", email: "sato@example.com", orders: 3, totalSpent: "28500" },
    { id: 3, name: "鈴木一郎", email: "suzuki@example.com", orders: 1, totalSpent: "12000" },
    { id: 4, name: "高橋みどり", email: "takahashi@example.com", orders: 8, totalSpent: "78000" },
    { id: 5, name: "田中健太", email: "tanaka@example.com", orders: 2, totalSpent: "15800" },
  ],
  orders: [
    { id: 1, orderNumber: "#1001", customer: "山田太郎", date: "2023-10-15", total: "15000", status: "完了" },
    { id: 2, orderNumber: "#1002", customer: "佐藤花子", date: "2023-10-12", total: "8500", status: "完了" },
    { id: 3, orderNumber: "#1003", customer: "鈴木一郎", date: "2023-10-10", total: "12000", status: "処理中" },
    { id: 4, orderNumber: "#1004", customer: "高橋みどり", date: "2023-10-08", total: "20000", status: "完了" },
    { id: 5, orderNumber: "#1005", customer: "田中健太", date: "2023-10-05", total: "7800", status: "完了" },
  ],
  analytics: {
    sales: {
      total: "1250000",
      previousPeriod: "1087500",
      averageOrder: "8500",
      orders: 147,
    },
    customers: {
      total: 523,
      active: 312,
      new: 78,
      returning: 234,
    },
    products: {
      topSelling: ["商品D", "商品A", "商品E", "商品B", "商品C"],
      inventory: {
        inStock: 540,
        lowStock: 85,
        outOfStock: 12,
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

