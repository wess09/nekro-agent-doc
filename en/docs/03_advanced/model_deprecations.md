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
Updated on December 10, 2025

According to the [Google Gemini API Deprecation Notice](https://ai.google.dev/gemini-api/docs/deprecations?hl=zh-cn) and [Version Notes](https://ai.google.dev/gemini-api/docs/changelog?hl=zh-cn), the following models will be discontinued at the specified time. Please migrate in a timely manner:

- **gemini-2.0-flash**: Expected to be discontinued as early as **February 2026**, recommend switching to `gemini-2.5-flash`
- **gemini-2.5-pro**: Expected to be discontinued as early as **June 2026**, recommend switching to `gemini-3-pro`
- **gemini-2.5-flash**: Expected to be discontinued as early as **June 2026**
- **gemini-2.5-flash-thinking**: Expected to be discontinued as early as **June 2026**
- **gemini-2.5-flash-image-preview**: Will be closed on **January 15, 2026**

::: danger Discontinued Models
The following models have been closed, and requests will not be available or will be automatically redirected:

**Closed (June 26, 2025)**:
- `gemini-2.5-pro-exp-03-25` - Closed, please use `gemini-2.5-pro`

**Closed (September 29, 2025)**:
- `gemini-1.5-pro` - Closed
- `gemini-1.5-flash` - Closed
- `gemini-1.5-flash-8b` - Closed

**Closed (November 10, 2025)**:
- `imagen-3.0-generate-002` - Closed, please switch to Imagen 4

**Closed (Announced November 4, 2025)**:
- `gemini-2.5-flash-lite-preview-06-17` - Closed November 18, 2025
- `gemini-2.5-flash-preview-05-20` - Closed November 18, 2025
- `gemini-2.0-flash-thinking-exp` - Closed December 2, 2025
- `gemini-2.0-flash-thinking-exp-01-21` - Closed December 2, 2025
- `gemini-2.0-flash-thinking-exp-1219` - Closed December 2, 2025
- `gemini-2.5-pro-preview-03-25` - Closed December 2, 2025
- `gemini-2.5-pro-preview-05-06` - Closed December 2, 2025
- `gemini-2.5-pro-preview-06-05` - Closed December 2, 2025
- `gemini-2.0-flash-lite-preview` - Closed December 9, 2025
- `gemini-2.0-flash-lite-preview-02-05` - Closed December 9, 2025

**Automatic Redirection (June 26, 2025)**:
- `gemini-2.5-pro-preview-05-06` → Automatically redirects to `gemini-2.5-pro`
- `gemini-2.5-pro-preview-03-25` → Automatically redirects to `gemini-2.5-pro`

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