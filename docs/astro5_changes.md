Title: Astro 5.0

URL Source: https://astro.build/blog/astro-5/

Published Time: 2024-12-03T00:00:00.000Z

Markdown Content:
**Introducing Astro 5.0!** With Astro Content Layer to load your content from any source, and Server Islands to combine cached, static content with dynamic, personalized content. Read on to learn more about these powerful new features and more!

**What is Astro?** [Astro](https://astro.build/) is the web framework for building content-driven websites including blogs, marketing, and e-commerce. If you need a website that loads fast with great SEO, then Astro is for you.

**Release highlights include:**

*   **[Content Layer](https://astro.build/blog/astro-5/#content-layer)**
*   **[Server Islands](https://astro.build/blog/astro-5/#server-islands)**
*   **[Simplified prerendering](https://astro.build/blog/astro-5/#simplified-prerendering)**
*   **[Type-safe environment variables](https://astro.build/blog/astro-5/#astroenv)**
*   **[Vite 6](https://astro.build/blog/astro-5/#vite-6)**
*   **[Experimental features](https://astro.build/blog/astro-5/#experimental-features)**

Visit [astro.new](https://astro.new/latest/) to try Astro 5.0 directly in your browser, or to start a new project using Astro 5.0, run the `create astro` command for your package manager:

To upgrade an existing project, use the automated `@astrojs/upgrade` CLI tool. Alternatively, upgrade manually by running the install command for your package manager.


Recommended:npx @astrojs/upgrade# Manual:npm install astropnpm install astroyarn add astro

Check out [our upgrade guide](https://docs.astro.build/en/guides/upgrade-to/v5/) for full details and individual upgrade guidance for each change of this release.

Content Layer
-------------

Astro is the best framework for content-driven sites, and with Astro 5.0 we’re making it even better. The **Astro Content Layer** is a new flexible and pluggable way to manage content, providing a unified, type-safe API to define, load, and access your content in your Astro project, no matter where it comes from.



// src/content.config.tsimport { defineCollection, z } from ‘astro:content’;import { glob } from ‘astro/loaders’;import { notionLoader } from “notion-astro-loader”;const blog = defineCollection({ // Load data from Markdown files on disk loader: glob({ pattern: "**/.md", base: “./src/data/blog” }), schema: z.object({ / optionally define a schema for type-safe data / }),});const database = defineCollection({ // Automatically fetch content in one line with a loader loader: notionLoader({ / … */ })});const countries = defineCollection({ // Load data from anywhere! loader: () => fetch(‘https://api.example.com/countries’).then(res => res.json()),});export const collections = { blog, database, countries }


Since Astro 2.0, content collections have allowed you to organize your static content in type-safe collections, and then use them in any page on your site. However, as your site grows, having your content in Markdown files in a Git repository may become less practical. You might want to use a CMS, have some sections of your site powered by a REST API, or use optimized images coming from an asset management system like Cloudinary. This can quickly become a mess to manage, requiring various APIs and data-fetching strategies.

The content layer is the solution to this, bringing all of your content into one friendly, type-safe data store, ready to use across your site. They are the content collections you know and love but with the extra power of **loaders** – pluggable functions that fetch and transform data from any source. With the content layer, you can:

*   Use the [built-in loaders](https://docs.astro.build/en/guides/content-collections/#built-in-loaders) to load content from anywhere on disk.
*   Define your own loader to fetch content from any API in [just a few lines of code](https://docs.astro.build/en/guides/content-collections/#building-a-custom-loader).
*   Use one of the growing number of [community-built and third-party loaders](https://astro.build/integrations/?search=&categories%5B%5D=loaders) to fetch content from popular sources like [Storyblok](https://astro.build/blog/storyblok-loader/), [Cloudinary](https://astro.build/blog/cloudinary-loader/), or [Hygraph](https://astro.build/blog/hygraph-loader/).

When you build your site, Astro loads the data from all of these sources and caches the collections in a single, type-safe data store that you can use in your pages.

![Image 9](https://astro.build/_astro/content-layer-architecture.D58x9rAj_1eUG2s.webp)The content layer doesn’t just let you load your content from more places. It also brings big improvements to the performance of your current site. In Astro 5, your content collections now build up to 5x faster for Markdown pages on content-heavy sites and up to 2x faster for MDX, while memory use is cut by 25-50%.

The content layer is a big change to the way content collections are handled, but our built-in backwards compatibility means most people will not have to make any changes to their existing code. See [the migration guide](https://docs.astro.build/en/guides/upgrade-to/v5/#legacy-v20-content-collections-api) for full details.

To get started with collections using the new content layer, check out the [content collections guide](https://docs.astro.build/en/guides/content-collections/).

Server Islands
--------------

Server islands are an evolution of the [islands architecture](https://astro.build/blog/introducing-astro/) concept that Astro helped bring to the mainstream. **Server islands** extend this same idea to the server. With server islands, you can combine high-performance static HTML and dynamic server-generated components on the same page.

On any given web page you might have content that is:

*   Completely static and never changes.
*   Dynamically backed by a database that changes infrequently, but more often than you deploy.
*   _Personalized_ content, tailored to individual users.

Previously, you had to choose one caching strategy for all of these types of content, and if the page is a logged-in experience that usually means no caching at all. Now, with server islands, you get the best of both worlds.

![Image 10: A diagram showing the server island population parts of the page from the server.](https://astro.build/_astro/dark-mode-server-islands-diag.CCPm1I4W_ZDEJr.webp)Server islands are used for your most dynamic content: personalized content like a user’s avatar, their shopping cart, and product reviews. When these components are deferred, you’re free to more aggressively cache the page itself.

This means that users logged in or not, will see the most critical parts of the page instantly, as they are caching on Edge CDNs. You can also set custom fallback content to show briefly before the dynamic islands are loaded.

Each island is loaded independently to optimize the visitor experience. This means a slower island, such as one connected to a legacy backend, won’t delay the rest of the personalized content from being seen and interacted with.

Server islands have been available for testing over the past several months. During that time, we have listened to your feedback and enhanced server islands by making it possible to:

*   Set headers inside of the island, allowing you to customize the cache lifetime of individual islands.
*   Use server islands on platforms that perform automatic page compression.
*   Increase privacy by automatically encrypting server island props using a key generated on the server.

With Astro 5, we are [rethinking what it means for a site to be “static”](https://astro.build/blog/astro-5/#simplified-prerendering). Server islands provide a foundational primitive for how you build static projects in Astro in the future, with dynamic bits only where you need them.

To learn more about server islands, check out the [server islands guide](https://docs.astro.build/en/guides/server-islands/).

### Simplified prerendering

Ever since Astro’s 1.0 release, 2+ years ago, Astro has supported multiple output modes for websites: Static, which builds the website once at build-time to good old static `.html` files, and Server, where the pages are instead rendered at runtime, allowing you to build highly dynamic websites.

After many requests, [in Astro 2.0 we made this more granular by creating a third output mode: Hybrid](https://astro.build/blog/hybrid-rendering/), that allows mixing both statically and server-rendered pages in the same website.

As Astro grew and gained powerful features like actions or server islands, which cannot be used in a purely static output mode, we realized that the matrix of “What settings do I need to use this feature?” became large and tiresome to explain and document. We also found that people ended up server-rendering more than they needed to because it was easier than using the fine-grained controls, making their sites slower than they needed to be.

In Astro 5.0, we’re happy to say that we’ve simplified all of this: **the hybrid and static options have been merged into the default `static` option.** This now allows you to render individual routes at runtime on the server just by adding an adapter, no other configuration is required.

Fear not, if you still want good old statically generated `.html` files, you’ll still get them: Astro is still static by default! But, if you happen to set one of your pages to `prerender = false`, Astro will now dynamically switch its output mode, allowing you to use features that require server-side rendering without figuring out which configuration mode you need.

Want to learn more about the new output modes? Check out our [updated documentation on on-demand rendering](https://docs.astro.build/en/guides/on-demand-rendering/#enabling-on-demand-rendering).

astro:env
---------

Configuring your application is an important, but complicated part of the development process. New in Astro 5 is the `astro:env` module, which gives you a type-safe way to define the environment variables your application expects and needs.

Using `astro:env` you are able to:

*   Configure whether your variables are to be used in the **client** or **server**, to help segment different uses.
*   Designate variables as **secrets**, such as API keys that you do not want to be exposed in the client nor inlined into the server build (which can be viewed by anyone with access to the build output).
*   Specify whether a variable is **required** or just an optional enhancement, allowing you to catch mistakes before the server is fully booted.
*   Define the **type** of the variable, such as string, number, boolean, or enum, preventing the need to cast in your application.

We built `astro:env` to provide more control and structure over environment variables and to give you type-safety. Once you have defined your variables you can simply import and use them in any module.



import { STRIPE_API_KEY } from ‘astro:env/server’;


For more information on how to use `astro:env`, see our guide on [type safe environment variables](https://docs.astro.build/en/guides/environment-variables/#type-safe-environment-variables).

Vite 6
------

Astro 5 is one of the first frameworks to ship with Vite 6, just released a week ago. (Don’t worry: we’ve been working with beta releases so you likely won’t need to change any code when upgrading to Astro 5.)

The highlight of Vite 6 is a new Environment API, an internal refactor that allows creating new environments to more closely align the development experience to how your code runs in production. Integration authors can begin using this new API today; in the future, we hope to find ways to use it in core, such as providing better development compatibility for Cloudflare users or providing Edge runtimes to test locally.

To learn more about Vite 6, check out their [official release announcement](https://vite.dev/blog/announcing-vite6).

Experimental features
---------------------

The following are new experimental features we have been cooking up over the last few months. They are available now to preview by enabling an `experimental` flag and will become stable in a future minor release of Astro 5.x.



// astro.config.mjsimport { defineConfig } from “astro/config”;export default defineConfig({ experimental: { responsiveImages: true, svg: true, }});


### Experimental: Image cropping support

Astro now supports cropping images when using its default Sharp image service for image processing.

Using the new `fit` and `position` props, you can now create images that perfectly match their container, saving precious bytes.



—import logo from “…/logo.png”;—


For more information on this feature, read [our reference on experimental responsive image support](https://docs.astro.build/en/reference/experimental-flags/responsive-images/#responsive-image-properties).

### Experimental: Responsive image layouts

Images are tough: there are many screen densities, many screen sizes… many _a lot_ of things. It can be challenging to get images to look good on all devices, not to mention the obvious performance implications of serving a 4K image to small screens.

Astro’s newest experimental image feature supports setting pre-defined responsive image layouts. These will automatically generate the proper `srcset` and `sizes` values to make your images look good and perform well on all devices.



—import { Image } from "astro:assets"import rocket from “./rocket.jpg”—


For more information on this feature, visit [our reference on experimental responsive image support](https://docs.astro.build/en/reference/experimental-flags/responsive-images/#responsive-image-properties).

### Experimental: SVG Component

Did you ever wish it was easier to use SVGs in Astro? So did we! And what’s more Astro than components?

With Astro 5’s experimental SVG flag, you can import `.svg` files and use them just like any other Astro component. You can pass props such as `width`, `height`, `fill`, `stroke`, and any other attribute accepted by the native `<svg>` element to have them automatically applied:



—import Logo from ‘…/assets/logo.svg’—


For more information on SVG components and how to use them, visit [our reference on SVG components](https://docs.astro.build/en/reference/experimental-flags/svg/).
