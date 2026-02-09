import { ref, computed } from 'vue'

const user = ref(null)
const INITIAL_USER_KEY = 'login_user'

function loadStoredUser() {
  try {
    const stored = localStorage.getItem(INITIAL_USER_KEY)
    if (stored) user.value = JSON.parse(stored)
  } catch (_) {
    user.value = null
  }
}
loadStoredUser()

export function useAuth() {
  const isLoggedIn = computed(() => !!user.value)

  function login(email, password) {
    // 데모: 이메일 형식 + 비밀번호 6자 이상이면 성공
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    const passwordValid = typeof password === 'string' && password.length >= 6
    if (!emailValid || !passwordValid) {
      return { ok: false, message: '이메일 형식과 비밀번호(6자 이상)를 확인해주세요.' }
    }
    const profile = { email, name: email.split('@')[0] }
    user.value = profile
    localStorage.setItem(INITIAL_USER_KEY, JSON.stringify(profile))
    return { ok: true }
  }

  function logout() {
    user.value = null
    localStorage.removeItem(INITIAL_USER_KEY)
  }

  return { user, isLoggedIn, login, logout }
}
