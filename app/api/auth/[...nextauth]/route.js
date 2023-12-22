import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { compare } from 'bcrypt';
import { sql } from "@vercel/postgres";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const handler = NextAuth({
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/login'
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        return true;
      },
    }),
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET
    }),
    GitHubProvider({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET
    })
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if(account.provider === 'google') {
        try {
          profile.email = 'google:'+profile.email;
          let user = {}
          let response = await sql`
            SELECT * FROM users WHERE email=${profile.email} AND password IS NULL
          `
          if(response.rowCount == 0) {
            response = await sql`
                  INSERT INTO users (email, first_name, last_name)
                  VALUES (${profile.email}, ${profile.given_name}, ${profile.family_name})
            `;
            response = await sql`
              SELECT * FROM users WHERE email=${profile.email} AND password IS NULL
            `
          }
          user = {
            id: response.rows[0].id,
            email: response.rows[0].email.replace("google:", ""),
            first_name: response.rows[0].first_name,
            last_name: response.rows[0].last_name
          }
          return user;
        }
        catch(e) {
          console.log(e);
          return false;
        }
      }
      else if(account.provider === 'github'){
        try {
          profile.email = 'github:'+profile.email;
          let user = {}
          let response = await sql`
              SELECT * FROM users WHERE email=${profile.email} AND password IS NULL
            `
          if(response.rowCount == 0) {
            let fname = profile.name.split(" ")[0];
            let lname = profile.name.split(" ")[1]
            response = await sql`
                  INSERT INTO users (email, first_name, last_name)
                  VALUES (${profile.email}, ${fname}, ${lname})
            `;
            response = await sql`
              SELECT * FROM users WHERE email=${profile.email} AND password IS NULL
            `
          }
          user = {
            id: response.rows[0].id,
            email: response.rows[0].email.replace("github:", ""),
            first_name: response.rows[0].first_name,
            last_name: response.rows[0].last_name
          }
          return user;
        }
        catch(e){
          console.log(e);
          return false;
        }
        
      }
      else if(account.provider === 'credentials'){
        try {
          if(!credentials.email || !credentials.password){
            return Response.json({error: "Please enter an email and password"})
          }
          else {
            const response = await sql`
              SELECT * FROM users WHERE email=${credentials?.email} AND password IS NOT NULL
            `
            
            const user = response.rows[0];

            const passwordCorrect = await compare(credentials?.password, user.password)
            
            if(passwordCorrect){
              let profile = {
                id: user.id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name
              }
              console.log(profile)
              return profile;
            }
            else {
              return false;
            }
          }
        }
        catch(e) {
          console.log(e)
          return false;
        }
      }
      return false;
    }
  }
});

export {handler as GET, handler as POST};