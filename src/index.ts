import axios from "axios";
import * as cheerio from "cheerio";
import { scrapeHeadings } from "./tasks/scrapeHeadings";
import { scrapeLinks } from "./tasks/scrapeLinks";
import { navigateToLink } from "./tasks/goToLink";
import { closeBrowser } from "./utils/browserManager";

const url = "https://example.com/"

async function scrape() {
    try {
        const response = await axios.get(url);
        const html = response.data;

        const headings = scrapeHeadings(html);
        console.log('Home Headings', headings);

        const links = scrapeLinks(html);
        console.log('Home Links', links);

        if (links.length > 0) {
            const firstLink = links[0];
            console.log('Navigating to first link:', firstLink);

            const linkedPageHtml = await navigateToLink(firstLink);
            const linkedPageHeadings = scrapeHeadings(linkedPageHtml);

            console.log('Headings from linked page', linkedPageHeadings);
        }
    }catch(error) {
        console.error("Error occurred while scraping", error);
    }finally {
        await closeBrowser();
    }
}

scrape();