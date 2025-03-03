// Shopify APIとの通信を行うユーティリティ関数

export async function fetchShopifyData(resource: string) {
  try {
    const response = await fetch(`/api/shopify?resource=${resource}`)
    if (!response.ok) {
      throw new Error(`Error fetching ${resource}: ${response.statusText}`)
    }
    return await response.json()
  } catch (error) {
    console.error(`Failed to fetch ${resource}:`, error)
    throw error
  }
}

export async function sendShopifyData(resource: string, data: any) {
  try {
    const response = await fetch(`/api/shopify?resource=${resource}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`Error sending ${resource}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Failed to send ${resource}:`, error)
    throw error
  }
}

// Shopify Admin APIのURLを生成する関数
export function getShopifyAdminUrl(path: string) {
  const shopDomain = process.env.SHOPIFY_STORE_DOMAIN || ""
  return `https://${shopDomain}/admin/${path}`
}

