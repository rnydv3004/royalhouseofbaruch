import { Metadata } from 'next';
import { getPool } from '@/lib/db';
import AdministrationContent, { AdminMember } from './AdministrationContent';

export const metadata: Metadata = {
    title: 'Administration | Royal House of Bharuch',
    description: 'Governance, Stewardship, and the Official Officers of the Royal Household of Bharuch.',
};

export const revalidate = 0; // Ensure fresh data on every request

async function getAdministrationData() {
    try {
        const db = getPool();
        const [rows] = await db.query(
            `SELECT * FROM royal_administration WHERE is_active = 1 ORDER BY category, display_order ASC`
        );
        return rows as AdminMember[];
    } catch (error) {
        console.error("Database Error:", error);
        return [];
    }
}

export default async function AdministrationPage() {
    // 1. Fetch data from DB
    const members = await getAdministrationData();

    // 2. Filter data by category
    const officers = members.filter(m => m.category === 'OFFICER');
    const advisors = members.filter(m => m.category === 'ADVISOR');
    const delegates = members.filter(m => m.category === 'DELEGATE');

    // 3. Fallback dummy data if DB is empty (for development/demo purposes)
    // If the DB return is empty, we show the structure with placeholders so the UI isn't broken.
    if (members.length === 0) {
        // Returning empty arrays will trigger the "Information pending..." state in the client component
        // which is better than broken UI.
    }

    // 4. Render Client Component
    return (
        <AdministrationContent
            officers={officers}
            advisors={advisors}
            delegates={delegates}
        />
    );
}
