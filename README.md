## Liquid Challenge Answers

### 1. Editable text setting in schema and Liquid

Add a text setting in the section schema, then render it with `section.settings`.

Schema:

```json
{
  "name": "Promo Text",
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "Welcome to our store"
    }
  ],
  "presets": [
    {
      "name": "Promo Text"
    }
  ]
}
```

Liquid:

```liquid
{% if section.settings.heading != blank %}
  <h2>{{ section.settings.heading }}</h2>
{% endif %}
```

### 2. Reusable collection banner using the collection featured image

Create a section intended for collection templates and render `collection.featured_image`. To make it reusable across templates, allow a fallback image and heading in schema, then use the collection data when it exists.

Liquid:

```liquid
{% assign banner_image = collection.featured_image | default: section.settings.fallback_image %}
{% assign banner_title = collection.title | default: section.settings.fallback_title %}

{% if banner_image %}
  <section class="collection-banner">
    {{ banner_image | image_url: width: 1600 | image_tag: loading: 'lazy', alt: banner_title }}
    <div class="collection-banner__content">
      <h1>{{ banner_title }}</h1>
      {% if collection.description != blank %}
        <div>{{ collection.description }}</div>
      {% endif %}
    </div>
  </section>
{% endif %}

{% schema %}
{
  "name": "Collection Banner",
  "settings": [
    {
      "type": "image_picker",
      "id": "fallback_image",
      "label": "Fallback image"
    },
    {
      "type": "text",
      "id": "fallback_title",
      "label": "Fallback title",
      "default": "Collection"
    }
  ],
  "templates": ["collection"],
  "presets": [
    {
      "name": "Collection Banner"
    }
  ]
}
{% endschema %}
```

This works best in collection context because the `collection` object is automatically available on collection templates.

### 3. Toggle visibility of a component with a section setting

Use a checkbox setting and conditionally render the component.

Schema:

```json
{
  "name": "Promo Banner",
  "settings": [
    {
      "type": "checkbox",
      "id": "show_banner",
      "label": "Show banner",
      "default": true
    },
    {
      "type": "text",
      "id": "banner_text",
      "label": "Banner text",
      "default": "Free shipping on orders over $50"
    }
  ]
}
```

Liquid:

```liquid
{% if section.settings.show_banner %}
  <div class="promo-banner">
    {{ section.settings.banner_text }}
  </div>
{% endif %}
```

### 4. Render current product title, price, and featured image

Inside a product template or a section rendered in product context, Shopify exposes the `product` object. You can read its fields directly.

Liquid:

```liquid
{% if product %}
  <section class="product-hero">
    <h1>{{ product.title }}</h1>
    <p>{{ product.price | money }}</p>

    {% if product.featured_image %}
      {{ product.featured_image | image_url: width: 1200 | image_tag: alt: product.title }}
    {% endif %}
  </section>
{% endif %}
```

Required context:

- this must run on a product template, or in a section/snippet that receives a valid `product`
- otherwise the `product` object will be empty or unavailable

### 5. Repeatable block with title and text

Define blocks in schema, then loop through `section.blocks`.

Schema:

```json
{
  "name": "Info List",
  "blocks": [
    {
      "type": "item",
      "name": "Item",
      "settings": [
        {
          "type": "text",
          "id": "title",
          "label": "Title"
        },
        {
          "type": "textarea",
          "id": "text",
          "label": "Text"
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Info List",
      "blocks": [
        { "type": "item" },
        { "type": "item" }
      ]
    }
  ]
}
```

Liquid:

```liquid
<section class="info-list">
  {% for block in section.blocks %}
    <div class="info-list__item" {{ block.shopify_attributes }}>
      {% if block.settings.title != blank %}
        <h3>{{ block.settings.title }}</h3>
      {% endif %}

      {% if block.settings.text != blank %}
        <p>{{ block.settings.text }}</p>
      {% endif %}
    </div>
  {% endfor %}
</section>
```

# Frontend Challenge

Small React/Vite storefront page with a completed `ProductCarousel` and a refactored `ProductCard`.

## Run

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```

## What I changed

- Completed `ProductCarousel` so it renders the provided product data in a reusable section.
- Added a simple `variant` prop to `ProductCarousel` with `default` and `compact` layout support.
- Styled the carousel mobile-first to roughly match the provided design.
- Kept 2 products visible on mobile in the New Arrivals section.
- Refactored `ProductCard` into clearer image/content/title/type/price elements.
- Tuned mobile and desktop typography for the product card.
- Updated the price styling to use `Pacifico`.
- Removed the track overflow behavior that was interfering with page scroll.

## Approach

I kept the carousel simple:

- render the provided products through a reusable `ProductCarousel`
- support layout variation with a `variant` prop
- use small arrow controls with `scrollBy` instead of adding a slider library
- keep `ProductCard` lean and focused on the provided data

Current usage:

```jsx
<ProductCarousel title="New Arrivals" products={products} variant="default" />
```

Also supported:

```jsx
<ProductCarousel title="Featured" products={products} variant="compact" />
```

## Tradeoffs

- I avoided a third-party carousel package to keep the implementation small and easy to review.
- The carousel uses simple arrow-driven scrolling logic instead of more complex slide state management.
- Styling is intentionally close to the design rather than pixel-perfect.

## What I would improve with more time

- add tests for rendering and `variant` behavior
- improve keyboard support and carousel accessibility
- disable or fade arrows at the edges
- refine spacing and typography further against the design file
