'use server';

import { getPool } from '@/lib/db';

export async function getRoyalUpdates() {

    const db = getPool();

    try {
        // Query 1: Fetch Announcements (Decrees) - Limit 10
        const [announcements] = await db.query(`
            SELECT * FROM app_updates 
            WHERE type = 'ANNOUNCEMENT' AND is_active = 1 
            ORDER BY published_at DESC 
            LIMIT 10
        `);

        // Query 2: Fetch News (Chronicle) - Limit 4
        const [news] = await db.query(`
            SELECT * FROM app_updates 
            WHERE type = 'NEWS' AND is_active = 1 
            ORDER BY published_at DESC 
            LIMIT 4
        `);

        // Helper to format dates (e.g., "2024-11-05" -> "Nov 05")
        const formatDate = (dateString: string | Date) => {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
        };

        // Helper to check if news is "New" (e.g., posted within last 7 days)
        const checkIsNew = (dateString: string | Date) => {
            const date = new Date(dateString);
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
            return date > sevenDaysAgo;
        };

        // Normalize Data for UI
        return {
            decrees: (announcements as any[]).map((item) => ({
                id: item.id,
                date: formatDate(item.published_at),
                text: item.content || item.title, // Use content, fallback to title
                isNew: checkIsNew(item.published_at)
            })),
            news: (news as any[]).map((item) => ({
                id: item.id,
                category: "Official", // Default category since not in DB
                date: formatDate(item.published_at),
                title: item.title,
                excerpt: item.content ? item.content.substring(0, 100) + "..." : "Click to read more.", // Truncate content
                readTime: "2 min read", // Placeholder or calculate based on word count
                link: item.action_link // Pass link if needed
            }))
        };

    } catch (error) {
        console.error("Database Error:", error);
        return { decrees: [], news: [] }; // Return empty arrays on error so UI doesn't crash
    }
}