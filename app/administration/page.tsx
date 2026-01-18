import { Metadata } from 'next';
import { getPool } from '@/lib/db';
import AdministrationContent, { AdminMember } from './AdministrationContent';

export const metadata: Metadata = {
    title: 'Administration | Royal House of Bharuch',
    description: 'Chancellery, Royal Advisory Council, and Royal Delegations of the Royal House of Bharuch.',
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

    // 3. Fallback dummy data if DB is empty
    let finalMembers = members;

    if (members.length === 0) {
        finalMembers = [
            // --- Chancellery ---
            {
                id: 101,
                name: "H.E. The Chancellor",
                role_title: "Chancellor of the Royal House",
                category: "OFFICER",
                display_order: 1,
                bio: "Appointed by the Head of the House to oversee the general administration of the Royal Household. The Chancellor serves as the chief administrative officer, ensuring the seamless execution of royal decrees and the maintenance of protocol across all departments.\n\nResponsible for the Chancellery's strategic direction and daily operations.",
                image_url: "" // Placeholder
            },
            {
                id: 102,
                name: "H.E. The Vice Chancellor",
                role_title: "Vice Chancellor",
                category: "OFFICER",
                display_order: 2,
                bio: "Assists the Chancellor in all administrative duties and deputizes when required. The Vice Chancellor plays a pivotal role in coordinating between various departments and ensuring that the Royal House's directives are implemented with precision and dignity.",
                image_url: "" // Placeholder
            },
            {
                id: 103,
                name: "The Marshal",
                role_title: "Marshal of the Royal House",
                category: "OFFICER",
                display_order: 3,
                bio: "Responsible for ceremonial protocol, precedence, and the organization of official royal events."
            },
            {
                id: 104,
                name: "The Chamberlain",
                role_title: "Chamberlain",
                category: "OFFICER",
                display_order: 4,
                bio: "Oversees the internal management of the Royal Household and personal affairs of the Head of the House."
            },
            {
                id: 105,
                name: "The Vice Chamberlain",
                role_title: "Vice Chamberlain",
                category: "OFFICER",
                display_order: 5,
                bio: "Supports the Chamberlain in managing the household's domestic operations and staff."
            },
            // --- Advisors ---
            {
                id: 201,
                name: "Legal Advisor",
                role_title: "Legal Council",
                category: "ADVISOR",
                display_order: 1,
                bio: "Provides counsel on matters of international and customary law."
            },
            {
                id: 202,
                name: "Cultural Advisor",
                role_title: "Heritage Council",
                category: "ADVISOR",
                display_order: 2,
                bio: "Advises on the preservation and promotion of cultural heritage and traditions."
            },
            {
                id: 203,
                name: "Strategic Advisor",
                role_title: "Strategy Council",
                category: "ADVISOR",
                display_order: 3,
                bio: "Offers strategic guidance on the Royal House's long-term objectives and external relations."
            },
            // --- Delegations ---
            {
                id: 301,
                name: "Delegate Name",
                role_title: "Delegate for Europe",
                category: "DELEGATE",
                display_order: 1,
                bio: "Representing the Royal House in diplomatic and cultural engagements across Europe."
            },
            {
                id: 302,
                name: "Delegate Name",
                role_title: "Delegate for Americas",
                category: "DELEGATE",
                display_order: 2,
                bio: "Fostering relations and representing the interests of the House in the Americas."
            },
            {
                id: 303,
                name: "Delegate Name",
                role_title: "Delegate for Asia",
                category: "DELEGATE",
                display_order: 3,
                bio: "Promoting the House's values and maintaining connections within the Asian region."
            }
        ];
    }

    // 4. Filter data
    const officers = finalMembers.filter(m => m.category === 'OFFICER');
    const advisors = finalMembers.filter(m => m.category === 'ADVISOR');
    const delegates = finalMembers.filter(m => m.category === 'DELEGATE');

    // 4. Render Client Component
    return (
        <AdministrationContent
            officers={officers}
            advisors={advisors}
            delegates={delegates}
        />
    );
}
