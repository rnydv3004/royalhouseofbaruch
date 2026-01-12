// app/api/gallery/route.ts
import { NextResponse } from 'next/server';
import { getPool } from '@/lib/db'; 

export async function GET(request: Request) {
    try {
        const db = getPool();
        const { searchParams } = new URL(request.url);
        
        const limit = parseInt(searchParams.get('limit') || '4');
        const page = parseInt(searchParams.get('page') || '1');
        const type = searchParams.get('type'); 
        const offset = (page - 1) * limit;

        let whereClause = "";
        const queryParams: any[] = [];

        // LOGIC: 
        // 1. "image" -> Gets standard images AND featured images
        // 2. "video" -> Gets standard videos AND featured videos
        // 3. "featured" -> Gets ONLY featured items (FIMG + FVID)
        
        if (type) {
            const t = type.toLowerCase();
            
            if (t === 'image') {
                whereClause = "WHERE file_type IN (?, ?)";
                queryParams.push('IMAGE', 'FIMG');
            } 
            else if (t === 'video') {
                whereClause = "WHERE file_type IN (?, ?)";
                queryParams.push('VIDEO', 'FVID');
            } 
            else if (t === 'featured') {
                whereClause = "WHERE file_type IN (?, ?)";
                queryParams.push('FIMG', 'FVID');
            }
        }

        const [rows] = await db.query(
            `SELECT id, file_type, file_url, title, description 
             FROM media_files 
             ${whereClause} 
             ORDER BY file_type ASC, id DESC 
             LIMIT ? OFFSET ?`,
            [...queryParams, limit, offset]
        );

        const [countResult]: any = await db.query(
            `SELECT COUNT(*) as total FROM media_files ${whereClause}`, 
            queryParams
        );
        
        const total = countResult[0].total;
        const hasMore = offset + limit < total;

        return NextResponse.json({ data: rows, hasMore, page });

    } catch (error) {
        console.error("Gallery API Error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}