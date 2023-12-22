import { NextResponse } from "next/server";
import { hash } from 'bcrypt';
import { sql } from '@vercel/postgres'


const register = async (request) => {
    try {
        const userData = await request.json();
        if (!userData.first_name || !userData.last_name || !userData.email || !userData.password) {
            return Response.json({ error: 'Please enter all the information required' });
        }
        else if ( userData.password.search(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,}$`) === -1 ) {
            return Response.json({ error: 'The password must contain one uppercase letter, one lowercase letter, one number, one special character and be a minimum of 8 characters' });
        }
        else {
            const hashedPassword = await hash(userData.password, 10);

            const reponse = await sql`
                INSERT INTO users (email, password, first_name, last_name)
                VALUES (${userData.email}, ${hashedPassword}, ${userData.first_name}, ${userData.last_name})
            `;
            return Response.json({ message: 'Your account has been successfully created' })
        }
        
    }
    catch (e) {
        if (e.code == 23505) {
            return Response.json({ error: 'The email is already in use' });
        }
        console.log(e)
        return Response.json({ error: 'Fail' })
    }

}
export { register as POST };