
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '@/shared/config/supabaseClient'
import { useAuth } from '@/shared/hooks/useAuth'
import { useState } from 'react'



export default function AuthForm() {
  const { isAuthenticated } = useAuth()
  const [loading, setLoading] = useState(false)


  const handleDemoLogin = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: 'demo@stelllar.com',
      password: 'Demo2025',
    })

    if (error) {
      alert('Failed to sign in as demo user: ' + error.message)
    }
    setLoading(false)
  }

  if (!isAuthenticated) {
    return (
      <div className=' w-sm  p-10 flex flex-col justify-center  rounded-2xl '>

        <div className="flex flex-col space-y-2 mb-4">
          <button
            onClick={handleDemoLogin}
            className="w-full py-2 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition"
          >
            🚀 Sign in with Demo Account
          </button>
        </div>
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: 'red',
                  brandAccent: 'darkred',
                },
              },
            },
          }}
          theme='dark'
          providers={['google']}
          redirectTo={window.location.origin}
          localization={{
            variables: {
              forgotten_password: {
                link_text: undefined,
              },
            },
          }}
        />

      </div>
    )
  }

}