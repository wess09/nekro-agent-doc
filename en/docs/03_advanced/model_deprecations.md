# Model **Deprecations & Discontinuations & Redirections**

Due to adjustments by model providers, the following models will be discontinued
::: info Information
Automatic redirection operations are performed by **Google Gemini**, and **NekroAgent Official Relay** will not actively delete corresponding models to protect user service **stability**

After discontinuation, **experimental** models will be redirected to **stable versions**

**Older** models will be redirected to **newer** models

**Note:** After model discontinuation, we may switch the **billing** of **discontinued** models to the **billing** of **corresponding new version models** without notifying you

Please be sure to pay attention to this page in a timely manner
:::

::: warning Model Discontinuation Warning
Updated on April 18, 2026

According to the [Google Gemini API Deprecation Notice](https://ai.google.dev/gemini-api/docs/deprecations?hl=zh-cn) and [Version Notes](https://ai.google.dev/gemini-api/docs/changelog?hl=zh-cn), the following models have announced discontinuation plans. The dates listed in the table are the **earliest possible dates** for the models to be retired.

### Upcoming Discontinued Models (2026)
- **Gemini 2.5 Series**:
  - `gemini-2.5-pro`: **June 17, 2026** Discontinued (Recommend: `gemini-3.1-pro-preview`)
  - `gemini-2.5-flash`: **June 17, 2026** Discontinued (Recommend: `gemini-3-flash-preview`)
  - `gemini-2.5-flash-lite`: **July 22, 2026** Discontinued (Recommend: `gemini-3.1-flash-lite-preview`)
  - `gemini-2.5-flash-image`: **October 2, 2026** Discontinued (Recommend: `gemini-3.1-flash-image-preview`)
- **Gemini 2.0 Series**:
  - `gemini-2.0-flash / -001`: **June 1, 2026** Discontinued (Recommend: `gemini-2.5-flash`)
  - `gemini-2.0-flash-lite / -001`: **June 1, 2026** Discontinued (Recommend: `gemini-2.5-flash-lite`)
- **Other Models**:
  - `gemini-embedding-001`: **July 14, 2026** Discontinued
  - `imagen-4.0-generate-001 / ultra / fast`: **June 24, 2026** Discontinued
  - `gemini-robotics-er-1.5-preview`: **April 30, 2026** Discontinued (Recommend: `gemini-robotics-er-1.6-preview`)
:::

::: danger Discontinued Models
The following models have been closed, and requests will not be available or will be automatically redirected:

| Model Name | Discontinuation Date | Recommended Alternative |
| :--- | :--- | :--- |
| `gemini-3-pro-preview` | March 9, 2026 | `gemini-3.1-pro-preview` |
| `gemini-2.5-flash-lite-preview-09-2025` | March 31, 2026 | `gemini-3.1-flash-lite-preview` |
| `gemini-2.5-flash-preview-09-25` | February 17, 2026 | `gemini-3-flash-preview` |
| `imagen-4.0-generate-preview-06-06` | February 17, 2026 | `imagen-4.0-generate-001` |
| `gemini-2.5-flash-image-preview` | January 15, 2026 | `gemini-2.5-flash-image` |
| `text-embedding-004` | January 14, 2026 | `gemini-embedding-001` |
| `gemini-2.5-pro-preview (03-25/05-06/06-05)` | December 2, 2025 | `gemini-3.1-pro-preview` |
| `gemini-2.0-flash-lite-preview (-02-05)` | December 9, 2025 | `gemini-2.5-flash-lite` |
| `gemini-2.0-flash-live-001` | December 9, 2025 | `gemini-3.1-flash-live-preview` |
| `gemini-live-2.5-flash-preview` | December 9, 2025 | `gemini-3.1-flash-live-preview` |
| `gemini-2.5-flash-preview-05-20` | November 18, 2025 | `gemini-3-flash-preview` |
| `gemini-2.0-flash-preview-image-generation` | November 14, 2025 | `gemini-2.5-flash-image` |
| `veo-3.0-generate / fast-preview` | November 12, 2025 | `veo-3.1-generate-preview` |
| `imagen-3.0-generate-002` | November 10, 2025 | `imagen-4.0-generate-001` |
| `embedding-001 / gecko-001 / exp` | October 30, 2025 | `gemini-embedding-001` |

Automatic redirection operations are performed by Google Gemini, and NekroAgent Official Relay will not actively delete corresponding models to protect user service stability
:::

::: tip Experimental Model Description
Models marked as `exp` (experimental) or `preview` (preview) in the documentation are experimental models. These models:
- May be updated or closed at any time, with a short lifecycle
- It is recommended to regularly follow [Google Gemini API Version Notes](https://ai.google.dev/gemini-api/docs/changelog?hl=zh-cn) for the latest updates
- For production environments, it is recommended to prioritize stable version (GA) models, or prepare backup solutions
- Experimental models will usually be gradually closed after the stable version is released
- **Some preview models will automatically redirect to stable versions**, it is recommended to directly use stable version model names
:::