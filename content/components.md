---
title: UI Components
description: A showcase of available UI components and content elements for this site template
keywords: components, UI elements, content blocks, examples, documentation
sitemap:
  changefreq: monthly
---

# Component Examples

This page demonstrates the various UI components and content elements available in this site template. Use this as a reference when creating your own content.

## Available Components

### ContentBox
```md
::ContentBox{bgColor="primary" bgShade="900" borderColor="primary" borderShade="500" shadow=true icon=true iconColor="primary" iconShade="400"}
# Optional with icon
<template #icon>
Your icon here (SVG or other content)
</template>

Content here
::
```

### InfoBox
```md
::InfoBox
Content here
::
```

### WarningBox
```md
::WarningBox
Content here
::
```

### EmphasisBox
```md
::EmphasisBox
Content here
::
```

### TwoColumn
```md
::TwoColumn
#left
Left column content
#right
Right column content
::
```

### FullWidthSection
```md
::FullWidthSection{variant="default" padding="lg"}
Content here
::
```

### ProseButton
```md
::ProseButton{variant="primary" to="/link"}
Button text
::
```

### ProseButtonGroup
```md
::ProseButtonGroup
::ProseButton{to="/link1"}Button 1::
::ProseButton{to="/link2"}Button 2::
::
```

# Content Box Examples

Below are examples of different styled content sections that you can use in your Markdown files.

## Basic Content Box

You can create a basic content box with a dark background and border:

::ContentBox
This is a content box with a dark background and border. You can use **Markdown formatting** inside it.

- List items work too
- Another list item
::

## Custom Content Box

You can customize the background and border colors:

::ContentBox{bgColor="primary" bgShade="900" borderColor="primary" borderShade="500" shadow=true}
This box uses a primary color scheme with a shadow effect.

### Headings work too

All markdown formatting works inside the box.
::

## Content Box with Icon

You can add an icon to your ContentBox:

::ContentBox{bgColor="primary" bgShade="800" borderColor="primary" borderShade="600" icon=true iconColor="primary" iconShade="400"}
<template #icon>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
  <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm0 8.625a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM15.375 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zM8.625 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
</svg>
</template>

This content box has a custom icon. You can use any SVG icon or other content in the icon slot.
::

## Info Box

For information and notes:

::InfoBox
**Important Information**

This is an information box that can be used to highlight important notes or tips in your content.
::

## Warning Box

For warnings or alerts:

::WarningBox
**Warning!**

This is a warning box that can be used to highlight important warnings or caution notices.
::

## Emphasis Box

For highlighting important content:

::EmphasisBox
**This content stands out!**

Use this box when you want to draw special attention to a section of content.
::

## Full Width Section

The FullWidthSection component creates horizontal sections that extend to the full width of the viewport with configurable backgrounds and padding:

::FullWidthSection{variant="default" padding="lg"}
### Default Style
This is a full-width section with the default styling and large padding.
::

::FullWidthSection{variant="primary" padding="md"}
### Primary Style
This is a full-width section with primary color styling and medium padding.
::

::FullWidthSection{variant="dark" padding="xl"}
### Dark Style
This is a full-width section with dark styling and extra-large padding.
::

## ContentBox Props

The ContentBox component accepts the following properties:

| Prop | Description | Type | Default |
|------|-------------|------|---------|
| bgColor | Background color name | String | 'zinc' |
| bgShade | Background color shade (100-950) | String | '800' |
| borderColor | Border color name | String | 'zinc' |
| borderShade | Border color shade (100-950) | String | '700' |
| shadow | Add shadow effect | Boolean | false |
| icon | Show icon area | Boolean | false |
| iconColor | Icon color name | String | (same as bgColor) |
| iconShade | Icon color shade (100-950) | String | '400' |

::ProseButtonGroup
  ::ProseButton{to="/" variant="secondary"}
    Back to Home
  ::
  ::ProseButton{to="/products" variant="primary"}
    View Products
  ::
:: 
