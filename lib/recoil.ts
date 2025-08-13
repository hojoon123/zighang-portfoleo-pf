import { atom, selector } from "recoil"

// 사용자 상태 타입 정의
interface UserState {
  id: number | null
  name: string
  email: string
  isLoggedIn: boolean
}

// 예시 상태 atoms
export const userState = atom<UserState>({
  key: "userState",
  default: {
    id: null,
    name: "",
    email: "",
    isLoggedIn: false,
  },
})

export const themeState = atom<"light" | "dark">({
  key: "themeState",
  default: "light",
})

export const counterState = atom<number>({
  key: "counterState",
  default: 0,
})

// 예시 selector - 안전한 방식으로 수정
export const userInfoSelector = selector<string>({
  key: "userInfoSelector",
  get: ({ get }) => {
    try {
      const user = get(userState)
      return user.isLoggedIn ? `${user.name} (${user.email})` : "게스트 사용자"
    } catch (error) {
      return "게스트 사용자"
    }
  },
})

// 추가 selector - 사용자 로그인 상태
export const isLoggedInSelector = selector<boolean>({
  key: "isLoggedInSelector",
  get: ({ get }) => {
    try {
      const user = get(userState)
      return user.isLoggedIn
    } catch (error) {
      return false
    }
  },
})
