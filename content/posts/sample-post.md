---
title: 'Adding a Logo to Product Output'
description: 'Learn how to customize your documents with a logo and organization information'
date: '2023-06-15'
keywords: customization, logo, branding, tutorial, configuration
---

# Adding a Logo to Product Output

::InfoBox
This article is intended for technical staff. It includes configuration examples that might be difficult to understand for the non-initiated. If you need help implementing these customizations, please [contact our support team](/contact).
::

## Recap: Basic Output

In our previous post, we covered the installation and configuration of basic output with our product. While this setup works for basic use cases, most organizations want to include their identity on their printed output.

This guide will show you how to enhance your output by adding your organization's logo and name to every document.

::TwoColumn
#left
### Before: Basic Output
![Basic output without customization](/images/posts/adding-a-logo-to-dicom-printer-2-output/8x10-Ceph-no-logo.jpg)
*Basic output without customization*

#right
### After: Customized Output
![Enhanced output with organization branding](/images/posts/adding-a-logo-to-dicom-printer-2-output/8x10-Ceph-logo-and-facility.jpg)
*Enhanced output with organization branding*
::

## Adding Your Logo

### Step 1: Prepare Your Logo Image

First, we need to save the logo image to a location where our product can find it. The best place for this is the configuration folder:

1. Open the Product Control Center
2. Click the shortcut to the configuration folder
   ![Configuration folder shortcut](/images/posts/adding-a-logo-to-dicom-printer-2-output/go_to_config.jpg)
3. Save your logo in this folder
   ![Logo in explorer window](/images/posts/adding-a-logo-to-dicom-printer-2-output/saving_logo.jpg)

::EmphasisBox
### Logo Image Tips
- Use PNG format for best quality
- Recommended size: 200 x 100 pixels
- The full path will typically be: `C:\ProgramData\Company\Product\config\logo.png`
- On Windows, you can also use the environment variable path: `%ProgramData%\Company\Product\config\logo.png`
::

### Step 2: Create the PrintImage Action

The logo is placed onto each page using a **PrintImage** action in your configuration. Here's how to configure it:

```xml
<PrintImage name="addLogo">
    <ImagePath>C:\ProgramData\Company\Product\config\logo.png</ImagePath>
    <X>1</X>
    <Y>1</Y>
    <Width>16</Width>
    <Height>16</Height>
    <Aspect>keep</Aspect>
</PrintImage>
```

Important parameters explained:

- `name="addLogo"` - This identifier will be used to call the action in the workflow
- `<X>1</X>` and `<Y>1</Y>` - Position the logo 1% from the top and 1% from the left of the page
- `<Width>16</Width>` and `<Height>16</Height>` - The logo will be placed in a box that is 16% of the page width and height
- `<Aspect>keep</Aspect>` - Maintain the original aspect ratio of the logo image

### Step 3: Integrate into Your Configuration

When included as part of your complete configuration, the XML would look like this:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ProductConfig>
    <General>
        <CheckingInterval>1</CheckingInterval>
        <SuspensionTime>1</SuspensionTime>
        <Verbosity>30</Verbosity>
    </General>
    <ActionsList>
        <Print name="PrintOnDevice">
            <Resolution>320 x 320</Resolution>
            <PrintMode>Grayscale12</PrintMode>
            <ConnectionParameters>
                <MyId>PRODUCT</MyId>
                <DestinationId>PRINTER</DestinationId>
                <Host>192.168.1.100</Host>
                <Port>5040</Port>
                <Timeout>10</Timeout>
            </ConnectionParameters>
        </Print>
        <PrintImage name="addLogo">
            <ImagePath>C:\ProgramData\Company\Product\config\logo.png</ImagePath>
            <X>1</X>
            <Y>1</Y>
            <Width>16</Width>
            <Height>16</Height>
            <Aspect>keep</Aspect>
        </PrintImage>
    </ActionsList>
    <Workflow>
        <Perform action="addLogo" onError="Ignore"/>
        <Perform action="PrintOnDevice" onError="Discard"/>
    </Workflow>
</ProductConfig>
```

### Step 4: Restart the Service

After saving your configuration, you need to restart the service:

1. Stop the service
   ![Stop the service](/images/posts/adding-a-logo-to-dicom-printer-2-output/save_config.jpg)

2. Start the service again
   ![Start the service](/images/posts/adding-a-logo-to-dicom-printer-2-output/restart_after_save.jpg)

## Testing Your Configuration

Now when you print from your application, your logo should appear at the top left of each document.

::WarningBox
If your logo doesn't appear, check that:
1. The file path in your configuration matches where you saved the logo
2. The logo file format is supported (PNG is recommended)
3. The service was successfully restarted
::

## Adding Organization Information (Text)

You can also add organization name or other text to your output by using the `PrintText` action, which works similarly to the `PrintImage` action. Here's an example configuration:

```xml
<PrintText name="addOrganizationName">
    <Text>Example Organization</Text>
    <X>50</X>
    <Y>98</Y>
    <Font>Arial</Font>
    <FontSize>9</FontSize>
    <Color>Black</Color>
    <Alignment>Center</Alignment>
</PrintText>
```

Add this to your `ActionsList` section and include `<Perform action="addOrganizationName" onError="Ignore"/>` in your workflow to display the organization name at the bottom of the page.

## Advanced Customizations

Our product allows for even more advanced customizations:

- **Document information**: Extract information using a `ParseFile` action and display it with `PrintText`
- **Multiple logos**: Add different logos at different positions on the page
- **Conditional display**: Only show certain elements based on document type or content

::ProseButtonGroup
  ::ProseButton{to="/products/product-sample" variant="primary"}
  View Product Details
  ::
  ::ProseButton{to="/contact"}
  Contact Us
  ::
::

::EmphasisBox
Our product is an affordable solution for customizing your output. Our fully-functional 30-day evaluation allows you to test all features before purchasing.
::

## Related Resources

- [Product Overview](/products/product-sample)
- [Product Features](/products/product-sample/features)
- [Case Study](/case-studies)

::WarningBox
Need help with your specific configuration? Our specialists can help customize our product for your unique requirements. [Contact us](/contact) for personalized assistance.
::

::ProseButtonGroup{class="justify-between"}
  ::ProseButton{to="/blog" class="hidden md:inline-flex"}
    ← Back to Blog
  ::
  ::ProseButton{to="/blog" class="md:hidden"}
    ← Back
  ::
  ::ProseButton{to="/products/product-sample" variant="primary" class="hidden md:inline-flex"}
    View Product →
  ::
  ::ProseButton{to="/products/product-sample" variant="primary" class="md:hidden"}
    Product →
  ::
::
