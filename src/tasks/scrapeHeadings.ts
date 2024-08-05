import * as cheerio from 'cheerio';

export function scrapeHeadings(html: string): string[] {
    const $ = cheerio.load(html);
    const headings = $('h1, h2, h3').map((_, element) => $(element).text().trim()).get();
    return headings;
}