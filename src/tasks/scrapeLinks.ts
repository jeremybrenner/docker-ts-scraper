import * as cheerio from 'cheerio';

export function scrapeLinks(html: string): string[] {
    const $ = cheerio.load(html);
    const links = $('a').map((_, element) => $(element).attr('href')).get().filter(link => link);
    return links;
}