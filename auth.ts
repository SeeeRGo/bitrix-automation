import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: (credentials) => {
 
        // logic to salt and hash password
 
        // logic to verify if the user exists
        console.log('credentials', credentials);
        console.log('process.env.ADMIN_LOGIN', process.env.ADMIN_LOGIN);
        console.log('process.env.ADMIN_PASSWORD', process.env.ADMIN_PASSWORD);
        
        const user = credentials?.email && credentials?.password && credentials?.email === process.env.ADMIN_LOGIN && credentials?.password === process.env.ADMIN_PASSWORD
 
        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error("User not found.")
        }
 
        // return user object with their profile data
        return {
          id: '1'
        }
      },
    }),
  ],
})