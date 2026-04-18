# モデルの**非推奨・廃止・リダイレクト**

モデルプロバイダーの調整により、以下のモデルは廃止されます
::: info 情報
自動リダイレクト操作は**Google Gemini**によって実行され、**NekroAgent公式リレー**はユーザーサービスの**安定性**を保護するために、対応するモデルを積極的に削除しません

廃止後、**実験的**モデルは**安定版**にリダイレクトされます

**古い**モデルは**新しい**モデルにリダイレクトされます

**注意：** モデル廃止後、**廃止された**モデルの**課金**を**対応する新バージョンモデル**の**課金**に通知なしで切り替える場合があります

必ずこのページに適時注意してください
:::

::: warning モデル廃止警告
2026年4月18日更新

[Google Gemini API非推奨通知](https://ai.google.dev/gemini-api/docs/deprecations)および[バージョン注意事項](https://ai.google.dev/gemini-api/docs/changelog)によると、以下のモデルは廃止計画が発表されています。表に記載されている日付は、モデルが廃止される**最も早い日付**です。

### 今後廃止予定のモデル (2026年)
- **Gemini 2.5 シリーズ**:
  - `gemini-2.5-pro`: **2026 年 6 月 17 日** 廃止 (推奨: `gemini-3.1-pro-preview`)
  - `gemini-2.5-flash`: **2026 年 6 月 17 日** 廃止 (推奨: `gemini-3-flash-preview`)
  - `gemini-2.5-flash-lite`: **2026 年 7 月 22 日** 廃止 (推奨: `gemini-3.1-flash-lite-preview`)
  - `gemini-2.5-flash-image`: **2026 年 10 月 2 日** 廃止 (推奨: `gemini-3.1-flash-image-preview`)
- **Gemini 2.0 シリーズ**:
  - `gemini-2.0-flash / -001`: **2026 年 6 月 1 日** 廃止 (推奨: `gemini-2.5-flash`)
  - `gemini-2.0-flash-lite / -001`: **2026 年 6 月 1 日** 廃止 (推奨: `gemini-2.5-flash-lite`)
- **その他のモデル**:
  - `gemini-embedding-001`: **2026 年 7 月 14 日** 廃止
  - `imagen-4.0-generate-001 / ultra / fast`: **2026 年 6 月 24 日** 廃止
  - `gemini-robotics-er-1.5-preview`: **2026 年 4 月 30 日** 廃止 (推奨: `gemini-robotics-er-1.6-preview`)
:::

::: danger 廃止されたモデル
以下のモデルは閉鎖されており、リクエストは利用できないか、自動的にリダイレクトされます。

| モデル名 | 廃止日 | 推奨代替案 |
| :--- | :--- | :--- |
| `gemini-3-pro-preview` | 2026 年 3 月 9 日 | `gemini-3.1-pro-preview` |
| `gemini-2.5-flash-lite-preview-09-2025` | 2026 年 3 月 31 日 | `gemini-3.1-flash-lite-preview` |
| `gemini-2.5-flash-preview-09-25` | 2026 年 2 月 17 日 | `gemini-3-flash-preview` |
| `imagen-4.0-generate-preview-06-06` | 2026 年 2 月 17 日 | `imagen-4.0-generate-001` |
| `gemini-2.5-flash-image-preview` | 2026 年 1 月 15 日 | `gemini-2.5-flash-image` |
| `text-embedding-004` | 2026 年 1 月 14 日 | `gemini-embedding-001` |
| `gemini-2.5-pro-preview (03-25/05-06/06-05)` | 2025 年 12 月 2 日 | `gemini-3.1-pro-preview` |
| `gemini-2.0-flash-lite-preview (-02-05)` | 2025 年 12 月 9 日 | `gemini-2.5-flash-lite` |
| `gemini-2.0-flash-live-001` | 2025 年 12 月 9 日 | `gemini-3.1-flash-live-preview` |
| `gemini-live-2.5-flash-preview` | 2025 年 12 月 9 日 | `gemini-3.1-flash-live-preview` |
| `gemini-2.5-flash-preview-05-20` | 2025 年 11 月 18 日 | `gemini-3-flash-preview` |
| `gemini-2.0-flash-preview-image-generation` | 2025 年 11 月 14 日 | `gemini-2.5-flash-image` |
| `veo-3.0-generate / fast-preview` | 2025 年 11 月 12 日 | `veo-3.1-generate-preview` |
| `imagen-3.0-generate-002` | 2025 年 11 月 10 日 | `imagen-4.0-generate-001` |
| `embedding-001 / gecko-001 / exp` | 2025 年 10 月 30 日 | `gemini-embedding-001` |

自動リダイレクト操作は Google Gemini によって実行され、NekroAgent 公式リレーはユーザーサービスの安定性を保護するために、対応するモデルを積極的に削除しません
:::

::: tip 実験的モデルの説明
ドキュメントで`exp`（実験的）または`preview`（プレビュー）とマークされたモデルは実験的モデルです。これらのモデルは：
- いつでも更新または閉鎖される可能性があり、ライフサイクルが短い
- [Google Gemini APIバージョン注意事項](https://ai.google.dev/gemini-api/docs/changelog)を定期的にフォローして最新の更新を確認することを推奨
- 本番環境では、安定版（GA）モデルを優先するか、バックアップソリューションを準備することを推奨
- 実験的モデルは通常、安定版がリリースされた後に徐々に閉鎖されます
- **一部のプレビューモデルは安定版に自動的にリダイレクトされます**、安定版モデル名を直接使用することを推奨
:::