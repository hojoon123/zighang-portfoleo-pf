"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Edit, Save, X, Plus } from "lucide-react"
import { updateUserProfile } from "@/lib/supabase/database"
import { useRouter } from "next/navigation"
import type { User } from "@supabase/supabase-js"
import type { UserProfile } from "@/types/profile"

interface ProfileInfoProps {
  user: User
  profile: UserProfile | null
}

export default function ProfileInfo({ user, profile }: ProfileInfoProps) {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || "",
    phone: profile?.phone || "",
    age: profile?.age || "",
    gender: profile?.gender || "",
    education_level: profile?.education_level || "",
    university: profile?.university || "",
    major: profile?.major || "",
    experience_years: profile?.experience_years || "",
    address: profile?.address || "",
    bio: profile?.bio || "",
    skills: profile?.skills || [],
    preferred_locations: profile?.preferred_locations || [],
    preferred_categories: profile?.preferred_categories || [],
  })

  const [newSkill, setNewSkill] = useState("")
  const [newLocation, setNewLocation] = useState("")
  const [newCategory, setNewCategory] = useState("")

  // Calculate profile completion
  const calculateCompletion = () => {
    const fields = [
      formData.full_name,
      formData.phone,
      formData.age,
      formData.gender,
      formData.education_level,
      formData.university,
      formData.major,
      formData.experience_years,
      formData.bio,
      formData.skills.length > 0,
      formData.preferred_locations.length > 0,
      formData.preferred_categories.length > 0,
    ]
    const completed = fields.filter(Boolean).length
    return Math.round((completed / fields.length) * 100)
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      const updates = {
        ...formData,
        age: formData.age ? Number.parseInt(formData.age.toString()) : null,
        experience_years: formData.experience_years ? Number.parseInt(formData.experience_years.toString()) : null,
        is_profile_complete: calculateCompletion() >= 80,
      }

      const { error } = await updateUserProfile(user.id, updates)
      if (error) {
        console.error("Error updating profile:", error)
        return
      }

      setIsEditing(false)
      router.refresh()
    } catch (error) {
      console.error("Error updating profile:", error)
    } finally {
      setLoading(false)
    }
  }

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData({ ...formData, skills: [...formData.skills, newSkill.trim()] })
      setNewSkill("")
    }
  }

  const removeSkill = (skill: string) => {
    setFormData({ ...formData, skills: formData.skills.filter((s) => s !== skill) })
  }

  const addLocation = () => {
    if (newLocation.trim() && !formData.preferred_locations.includes(newLocation.trim())) {
      setFormData({ ...formData, preferred_locations: [...formData.preferred_locations, newLocation.trim()] })
      setNewLocation("")
    }
  }

  const removeLocation = (location: string) => {
    setFormData({ ...formData, preferred_locations: formData.preferred_locations.filter((l) => l !== location) })
  }

  const addCategory = () => {
    if (newCategory.trim() && !formData.preferred_categories.includes(newCategory.trim())) {
      setFormData({ ...formData, preferred_categories: [...formData.preferred_categories, newCategory.trim()] })
      setNewCategory("")
    }
  }

  const removeCategory = (category: string) => {
    setFormData({ ...formData, preferred_categories: formData.preferred_categories.filter((c) => c !== category) })
  }

  const completion = calculateCompletion()

  return (
    <div className="space-y-6">
      {/* Profile Completion */}
      <Card>
        <CardHeader>
          <CardTitle>프로필 완성도</CardTitle>
          <CardDescription>프로필을 완성하여 더 나은 맞춤 추천을 받아보세요</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>완성도</span>
              <span>{completion}%</span>
            </div>
            <Progress value={completion} className="w-full" />
          </div>
        </CardContent>
      </Card>

      {/* Basic Information */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>기본 정보</CardTitle>
            <CardDescription>기본적인 개인 정보를 관리하세요</CardDescription>
          </div>
          {!isEditing ? (
            <Button variant="outline" onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-2" />
              편집
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                <X className="h-4 w-4 mr-2" />
                취소
              </Button>
              <Button onClick={handleSave} disabled={loading}>
                <Save className="h-4 w-4 mr-2" />
                저장
              </Button>
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">이메일</Label>
              <Input id="email" value={user.email || ""} disabled />
            </div>
            <div>
              <Label htmlFor="full_name">이름</Label>
              <Input
                id="full_name"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="phone">전화번호</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="age">나이</Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="gender">성별</Label>
              <Select
                value={formData.gender}
                onValueChange={(value) => setFormData({ ...formData, gender: value })}
                disabled={!isEditing}
              >
                <SelectTrigger>
                  <SelectValue placeholder="성별을 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">남성</SelectItem>
                  <SelectItem value="female">여성</SelectItem>
                  <SelectItem value="other">기타</SelectItem>
                  <SelectItem value="prefer_not_to_say">선택하지 않음</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="experience_years">경력 (년)</Label>
              <Input
                id="experience_years"
                type="number"
                value={formData.experience_years}
                onChange={(e) => setFormData({ ...formData, experience_years: e.target.value })}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="address">주소</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              disabled={!isEditing}
            />
          </div>

          <div>
            <Label htmlFor="bio">자기소개</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              disabled={!isEditing}
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Education Information */}
      <Card>
        <CardHeader>
          <CardTitle>학력 정보</CardTitle>
          <CardDescription>학력 관련 정보를 입력하세요</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="education_level">학력</Label>
              <Select
                value={formData.education_level}
                onValueChange={(value) => setFormData({ ...formData, education_level: value })}
                disabled={!isEditing}
              >
                <SelectTrigger>
                  <SelectValue placeholder="학력을 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high_school">고등학교</SelectItem>
                  <SelectItem value="associate">전문대학</SelectItem>
                  <SelectItem value="bachelor">대학교</SelectItem>
                  <SelectItem value="master">대학원 (석사)</SelectItem>
                  <SelectItem value="doctorate">대학원 (박사)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="university">학교명</Label>
              <Input
                id="university"
                value={formData.university}
                onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="major">전공</Label>
              <Input
                id="major"
                value={formData.major}
                onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                disabled={!isEditing}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skills */}
      <Card>
        <CardHeader>
          <CardTitle>보유 스킬</CardTitle>
          <CardDescription>보유하고 있는 기술 스택을 추가하세요</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {formData.skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="text-sm">
                {skill}
                {isEditing && (
                  <button onClick={() => removeSkill(skill)} className="ml-2 text-red-500">
                    ×
                  </button>
                )}
              </Badge>
            ))}
          </div>
          {isEditing && (
            <div className="flex space-x-2">
              <Input
                placeholder="새 스킬 추가"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addSkill()}
              />
              <Button onClick={addSkill}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Preferences */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>선호 지역</CardTitle>
            <CardDescription>근무를 희망하는 지역을 추가하세요</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {formData.preferred_locations.map((location) => (
                <Badge key={location} variant="outline" className="text-sm">
                  {location}
                  {isEditing && (
                    <button onClick={() => removeLocation(location)} className="ml-2 text-red-500">
                      ×
                    </button>
                  )}
                </Badge>
              ))}
            </div>
            {isEditing && (
              <div className="flex space-x-2">
                <Input
                  placeholder="새 지역 추가"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addLocation()}
                />
                <Button onClick={addLocation}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>관심 직무</CardTitle>
            <CardDescription>관심 있는 직무 분야를 추가하세요</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {formData.preferred_categories.map((category) => (
                <Badge key={category} variant="outline" className="text-sm">
                  {category}
                  {isEditing && (
                    <button onClick={() => removeCategory(category)} className="ml-2 text-red-500">
                      ×
                    </button>
                  )}
                </Badge>
              ))}
            </div>
            {isEditing && (
              <div className="flex space-x-2">
                <Input
                  placeholder="새 직무 추가"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addCategory()}
                />
                <Button onClick={addCategory}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
