import { NextResponse } from 'next/server';
import { getPool } from '@/lib/db';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const db = getPool();

        // --- 1. Extract Filters & Pagination from Request ---
        const type = body.type || 'All'; // Default to All if not provided
        const page = parseInt(body.page) || 1;
        const limit = parseInt(body.limit) || 10;
        const offset = (page - 1) * limit;

        // --- 2. Build the Query Dynamically ---
        let query = `SELECT * FROM app_updates WHERE is_active = 1`;
        const params: any[] = [];

        // Apply Type Filter (if not 'All')
        // We map 'All' to allow fetching everything if needed
        const validTypes = ['Announcement', 'Honours', 'Statements', 'Trust'];
        
        if (type !== 'All') {
            if (validTypes.includes(type)) {
                query += ` AND type = ?`;
                params.push(type);
            } else {
                // Handle invalid type gracefully or return error
                // For now, defaulting to 'Announcement' if invalid type sent
                query += ` AND type = ?`;
                params.push('Announcement'); 
            }
        }

        // Add Ordering and Pagination
        query += ` ORDER BY published_at DESC LIMIT ? OFFSET ?`;
        params.push(limit, offset);

        // --- 3. Execute Query ---
        const [rows] = await db.query(query, params);

        // --- 4. Get Total Count (For Pagination UI) ---
        // We need a separate query to count total items for the specific filter
        let countQuery = `SELECT COUNT(*) as total FROM app_updates WHERE is_active = 1`;
        const countParams: any[] = [];
        
        if (type !== 'All' && validTypes.includes(type)) {
            countQuery += ` AND type = ?`;
            countParams.push(type);
        }
        
        const [countResult] = await db.query(countQuery, countParams);
        const totalItems = (countResult as any[])[0].total;
        const totalPages = Math.ceil(totalItems / limit);

        // --- 5. Helper Functions ---
        const formatDate = (dateString: string) => {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
        };

        const checkIsNew = (dateString: string) => {
            const date = new Date(dateString);
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
            return date > sevenDaysAgo;
        };

        // --- 6. Format Response ---
        const formattedData = (rows as any[]).map((item) => ({
            id: item.id,
            type: item.type, // Including type so UI knows what it is
            title: item.title,
            content: item.content,
            date: formatDate(item.published_at),
            isNew: checkIsNew(item.published_at),
            link: item.action_link,
            actionText: item.action_text
        }));

        return NextResponse.json({
            data: formattedData,
            pagination: {
                currentPage: page,
                totalPages: totalPages,
                totalItems: totalItems,
                limit: limit
            }
        });

    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: "Failed to fetch updates" }, { status: 500 });
    }
}