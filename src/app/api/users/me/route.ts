import { connectDB } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest , NextResponse} from 'next/server'
import { getDataFromToken } from '@/helpers/getDataFromToken';

connectDB();

export async function POST(request: NextRequest, response: NextResponse) {

    try {
        const userId = await getDataFromToken(request); // extract data from token 

        const user = await User.findById(userId).select('-password'); // get user from database 

        return NextResponse.json({message: "User found successfully", data: user });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}