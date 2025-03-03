# Shopify AIアシスタント分析ダッシュボード

このアプリは、Shopifyストアの顧客行動と商品パフォーマンスを分析し、AIを活用した提案を提供するダッシュボードアプリです。Shopify管理画面からアクセス可能な外部ダッシュボードとして機能します。

## 主な機能

- **AIによるデータ分析**: 顧客行動と商品パフォーマンスを自動分析
- **インタラクティブダッシュボード**: 売上、コンバージョン、顧客データの可視化
- **AIチャットアシスタント**: 自然言語でデータ分析や提案を質問可能
- **顧客セグメント分析**: 顧客層ごとの購買行動分析
- **マーケティング提案**: AIによる効果的なマーケティング施策の提案
- **Shopify管理画面との統合**: Admin Linkによる簡単アクセス

## 技術スタック

- **フロントエンド**: Next.js 14, React 18, TypeScript
- **UI**: Shopify Polaris (公式UIコンポーネント)
- **認証**: NextAuth.js, Shopify OAuth
- **Shopify連携**: Shopify App Bridge, Shopify API
- **デプロイ**: Vercel

## 前提条件

- Node.js 20.17.0
- Shopifyパートナーアカウント
- Shopifyストア（開発用または本番用）
- Windows開発環境（WSL2推奨）

## Node.jsバージョン管理

このプロジェクトはNode.js 20.17.0で開発されています。fnmを使用してバージョンを管理することを推奨します。

### Windowsでのfnmセットアップ

1. [fnm for Windows](https://github.com/Schniz/fnm)をインストール
```bash
# wingetを使用する場合
winget install Schniz.fnm

# または chocolateyを使用する場合
choco install fnm
```

2. Node.jsバージョンを設定
```bash
# 必要なバージョンをインストール
fnm install 20.17.0

# プロジェクトディレクトリで使用するバージョンを設定
fnm use 20.17.0
```

## セットアップ手順

1. リポジトリをクローン
```bash
git clone https://github.com/yourusername/shopify-ai-assistant.git
cd shopify-ai-assistant
```

2. Node.jsのバージョンを設定
```bash
fnm use 20.17.0
```

3. 依存関係をインストール
```bash
npm install
```

4. 環境変数を設定
`.env`ファイルを作成し、以下の情報を設定します：

```
# Shopify API Credentials
SHOPIFY_API_KEY=your_api_key
SHOPIFY_API_SECRET=your_api_secret
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_APP_URL=https://your-app-url.vercel.app

# Next Auth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# Public Variables
NEXT_PUBLIC_SHOPIFY_API_KEY=your_api_key
```

5. 開発サーバーを起動
```bash
npm run dev
```

6. ブラウザで http://localhost:3000 にアクセス

## Windows開発環境での注意点

- **パス長制限**: Windowsのパス長制限に注意してください。深いネストを避けるか、長いパス名を有効にしてください。
- **改行コード**: git configでautocrlf設定を確認し、一貫した改行コードを維持してください。
- **パフォーマンス**: ファイル監視のパフォーマンスを向上させるには、Windows Subsystem for Linux (WSL2)の使用を検討してください。

## Shopifyアプリ開発設定

1. [Shopifyパートナーダッシュボード](https://partners.shopify.com)にアクセス
2. 「アプリ」セクションで「アプリを作成」をクリック
3. アプリ名と目的を入力
4. アプリURLを設定（開発時は `http://localhost:3000`）
5. リダイレクトURLを設定（`http://localhost:3000/api/auth/callback/shopify`）
6. APIキーとシークレットを取得し、`.env`ファイルに設定

## デプロイ

このアプリはVercelを使用して簡単にデプロイできます：

```bash
# Vercel CLIを使用する場合
vercel

# または手動でビルドして起動
npm run build
npm run start
```

デプロイ後、ShopifyパートナーダッシュボードでアプリのURLを更新してください。

## Shopifyストアへのインストール

1. Shopifyパートナーダッシュボードから「テストリンク」を生成
2. リンクを使用してテストストアにアプリをインストール
3. インストール後、Shopify管理画面の「アプリ」セクションからアクセス可能

## プロジェクト構造

```
├── app/                  # Next.js アプリケーションコード
│   ├── api/              # APIエンドポイント
│   ├── auth/             # 認証関連
│   ├── dashboard/        # ダッシュボード画面
│   │   ├── ai-chat/      # AIチャット機能
│   │   ├── analytics/    # 分析ページ
│   │   ├── customers/    # 顧客管理ページ
│   │   └── page.tsx      # メインダッシュボード
│   └── page.tsx          # ランディングページ
├── components/           # 共通コンポーネント
├── lib/                  # ユーティリティ関数
├── public/               # 静的ファイル
└── styles/               # スタイルシート
```

## トラブルシューティング

- **依存関係の問題**: Node.jsのバージョンが20.17.0であることを確認してください。
- **ビルドエラー**: TypeScriptの型定義ファイルが見つからない場合は、`npm install`を再実行してください。
- **Windows固有の問題**: 
  - `ENOSPC`エラーが発生した場合は、ファイル監視の制限を増やしてください。
  - パス長の問題が発生した場合は、プロジェクトをルートに近い場所に移動してください。

## 今後の開発予定

- AIモデルとの統合強化
- 高度な顧客セグメンテーション機能
- カスタマイズ可能なダッシュボードウィジェット
- マーケティングキャンペーン自動生成機能

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。 