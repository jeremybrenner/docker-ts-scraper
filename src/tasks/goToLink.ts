import { createPage } from '../utils/browserManager';


export async function navigateToLink(url: string): Promise<string> {
    const page = await createPage();

    try {
        await page.goto(url, { waitUntil: 'networkidle2' });
        const content = await page.content();
        return content;
    } catch (error) {
        console.error(`Error navigating to ${url}:`, error);
        throw error;
    } finally {
        await page.close();
    }
}