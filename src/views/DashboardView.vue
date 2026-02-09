<script setup>
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { user, logout } = useAuth()

function handleLogout() {
  logout()
  router.push({ name: 'login' })
}
</script>

<template>
  <div class="dashboard">
    <header class="header">
      <h1>대시보드</h1>
      <div class="user-row">
        <span class="user-name">{{ user?.name ?? user?.email }}</span>
        <button type="button" class="btn-logout" @click="handleLogout">로그아웃</button>
      </div>
    </header>
    <main class="main">
      <p class="welcome">로그인에 성공했습니다.</p>
      <p class="email">이메일: {{ user?.email }}</p>
    </main>
  </div>
</template>

<style scoped>
.dashboard {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: #fff;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.header h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.user-row {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-name {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.9);
}

.btn-logout {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-logout:hover {
  background: rgba(255, 255, 255, 0.15);
}

.main {
  padding: 2rem;
  max-width: 640px;
}

.welcome {
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.95);
}

.email {
  margin: 0;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.7);
}
</style>
