<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { login } = useAuth()

const form = reactive({
  email: '',
  password: '',
})
const error = ref('')
const loading = ref(false)

async function onSubmit() {
  error.value = ''
  loading.value = true
  const result = login(form.email.trim(), form.password)
  loading.value = false
  if (result.ok) {
    router.push({ name: 'dashboard' })
  } else {
    error.value = result.message || '로그인에 실패했습니다.'
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login-card">
      <h1>로그인</h1>
      <p class="subtitle">이메일과 비밀번호(6자 이상)를 입력하세요.</p>

      <form @submit.prevent="onSubmit" class="login-form">
        <div class="field">
          <label for="email">이메일</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            placeholder="you@example.com"
            autocomplete="email"
            required
          />
        </div>
        <div class="field">
          <label for="password">비밀번호</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            placeholder="6자 이상"
            autocomplete="current-password"
            required
          />
        </div>
        <p v-if="error" class="error">{{ error }}</p>
        <button type="submit" class="btn-primary" :disabled="loading">
          {{ loading ? '로그인 중...' : '로그인' }}
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
}

.login-card {
  width: 100%;
  max-width: 400px;
  padding: 2.5rem;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

h1 {
  margin: 0 0 0.5rem;
  font-size: 1.75rem;
  font-weight: 600;
  color: #fff;
}

.subtitle {
  margin: 0 0 1.75rem;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.65);
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.field label {
  font-size: 0.85rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
}

.field input {
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.field input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.field input:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.25);
}

.error {
  margin: 0;
  padding: 0.6rem;
  font-size: 0.875rem;
  color: #f87171;
  background: rgba(248, 113, 113, 0.15);
  border-radius: 8px;
}

.btn-primary {
  margin-top: 0.25rem;
  padding: 0.85rem 1.25rem;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.15s;
}

.btn-primary:hover:not(:disabled) {
  opacity: 0.95;
  transform: translateY(-1px);
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>
