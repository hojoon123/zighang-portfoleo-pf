"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProfileInfo from "./profile-info"
import ProfileApplications from "./profile-applications"
import ProfileBookmarks from "./profile-bookmarks"
import type { User } from "@supabase/supabase-js"
import type { UserProfile } from "@/types/profile"

interface ProfileTabsProps {
  user: User
  profile: UserProfile | null
}

export default function ProfileTabs({ user, profile }: ProfileTabsProps) {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3 mb-8">
        <TabsTrigger value="profile">프로필 정보</TabsTrigger>
        <TabsTrigger value="applications">지원 현황</TabsTrigger>
        <TabsTrigger value="bookmarks">관심 공고</TabsTrigger>
      </TabsList>

      <TabsContent value="profile">
        <ProfileInfo user={user} profile={profile} />
      </TabsContent>

      <TabsContent value="applications">
        <ProfileApplications userId={user.id} />
      </TabsContent>

      <TabsContent value="bookmarks">
        <ProfileBookmarks userId={user.id} />
      </TabsContent>
    </Tabs>
  )
}
