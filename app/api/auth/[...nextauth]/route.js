import { connectMongoDB } from '@/connectDB/mongodb'
import User from '@/models/user'
import NextAuth from 'next-auth/next'
import CredentialProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

export const authOptions = {
        providers: [
            CredentialProvider({
                name: 'credentials',
                credentials: {},

                // function to get credential
                async authorize(credentials) {
                    const {email, password} = credentials
                    try {
                        await connectMongoDB()
                        const user = await User.findOne({email})

                        //  check user exist or not
                        if(!user) return null

                        // if exist compare the password
                        const passwordMatch = await bcrypt.compare(password, user.password)

                        // if invalid password
                        if(!passwordMatch) return null

                        // if match login user
                        return user

                    } catch (error) {
                        console.log(error)
                    }
                    // return user
                }
            })
        ],
        session: {
            strategy: 'jwt',
        },
        secret: process.env.NEXTAUTH_SECRET,
        pages:{
            signIn: '/'
        }
}

const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}