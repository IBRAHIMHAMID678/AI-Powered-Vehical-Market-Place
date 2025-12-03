import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, password } = await req.json();

    console.log('Register request received for email:', email);

    // Validate input
    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: 'Email and password are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // TODO: Add your MongoDB connection here
    // Example:
    // const mongoClient = new MongoClient(Deno.env.get('MONGODB_URI'));
    // await mongoClient.connect();
    // const db = mongoClient.db('your_database');
    // const users = db.collection('users');
    // 
    // // Check if user exists
    // const existingUser = await users.findOne({ email });
    // if (existingUser) {
    //   return new Response(
    //     JSON.stringify({ error: 'User already exists' }),
    //     { status: 409, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    //   );
    // }
    //
    // // Hash password and save user
    // const hashedPassword = await hashPassword(password);
    // await users.insertOne({ name, email, password: hashedPassword });

    // Placeholder response - replace with actual MongoDB logic
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'User registered successfully',
        // Remove this note after implementing MongoDB
        note: 'MongoDB connection not yet implemented - add your logic above'
      }),
      { status: 201, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: unknown) {
    console.error('Registration error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: 'Registration failed', details: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
