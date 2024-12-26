import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import theme from './dark-theme.json';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import sitemap from '@astrojs/sitemap';

const prettyCodeOptions = {
    theme,
    onVisitHighlightedLine(node) {
        node?.properties?.className?.push('highlight-line');
    },
    onVisitHighlightedChars(node) {
        if (node?.properties?.className) {
            node.properties.className.push('highlighted-chars');
        } else {
            node.properties.className = ['highlighted-chars'];
        }
    },
    tokensMap: {},
};

// https://astro.build/config
export default defineConfig({
    site: 'https://rajumodi27.github.io/',
    integrations: [tailwind(), react(), mdx(), sitemap()],
    markdown: {
        syntaxHighlight: false,
        extendDefaultPlugins: true,
        rehypePlugins: [
            [rehypePrettyCode, prettyCodeOptions],
            rehypeSlug,
            [
                rehypeAutolinkHeadings,
                {
                    properties: {
                        className: ['anchor'],
                    },
                },
            ],
        ],
        shikiConfig: {
            theme,
        },
    },
});
