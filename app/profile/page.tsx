import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Header from "@/components/landing/header"
import Footer from "@/components/landing/footer"
import ProfileTabs from "@/components/profile/profile-tabs"
import { getUserProfile } from "@/lib/supabase/database"

export default async function ProfilePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await getUserProfile(user.id)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">마이페이지</h1>
            <p className="text-gray-600 mt-2">프로필 정보를 관리하고 지원 현황을 확인하세요</p>
          </div>
          <ProfileTabs user={user} profile={profile} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
