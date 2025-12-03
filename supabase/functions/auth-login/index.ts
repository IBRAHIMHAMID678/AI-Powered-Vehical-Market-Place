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
    const { email, password } = await req.json();

    console.log('Login request received for email:', email);

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
    // // Find user
    // const user = await users.findOne({ email });
    // if (!user) {
    //   return new Response(
    //     JSON.stringify({ error: 'Invalid credentials' }),
    //     { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    //   );
    // }
    //
    // // Verify password
    // const isValid = await verifyPassword(password, user.password);
    // if (!isValid) {
    //   return new Response(
    //     JSON.stringify({ error: 'Invalid credentials' }),
    //     { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    //   );
    // }
    //
    // // Generate token (JWT or session)
    // const token = generateToken(user);

    // Placeholder response - replace with actual MongoDB logic
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Login successful',
        user: { email },
        // Remove this note after implementing MongoDB
        note: 'MongoDB connection not yet implemented - add your logic above'
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: unknown) {
    console.error('Login error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: 'Login failed', details: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
