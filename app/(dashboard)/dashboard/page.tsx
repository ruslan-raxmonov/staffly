import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getUserById } from '@/lib/store';
import Link from 'next/link';
import { LogOut, Settings, Users, BarChart3 } from 'lucide-react';

async function getUser() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('staffly_user_session');
  
  if (!sessionCookie) {
    return null;
  }

  const user = await getUserById(sessionCookie.value);
  return user;
}

export default async function DashboardPage() {
  const user = await getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-[#08090d]">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0d0f16]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple/20 text-lg font-bold text-purple">
              {user.firstName.charAt(0)}
            </div>
            <div>
              <h1 className="text-lg font-semibold text-white">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-xs text-muted-2">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {user.role === 'owner' && (
              <Link
                href="/admin"
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition-all hover:bg-white/10"
              >
                <Settings size={16} />
                Admin
              </Link>
            )}
            <form action="/api/auth/logout" method="POST">
              <button
                type="submit"
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition-all hover:bg-white/10"
              >
                <LogOut size={16} />
                Chiqish
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white">
            Xush kelibsiz, {user.firstName}!
          </h2>
          <p className="mt-1 text-sm text-muted">
            Staffly platformasiga muvaffaqiyatli kirdingiz
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-[#0d0f16]/90 p-6 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple/20">
                <Users className="text-purple" size={24} />
              </div>
              <div>
                <p className="text-sm text-muted-2">Organization</p>
                <p className="text-lg font-semibold text-white">{user.organizationId}</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#0d0f16]/90 p-6 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald/20">
                <BarChart3 className="text-emerald" size={24} />
              </div>
              <div>
                <p className="text-sm text-muted-2">Rol</p>
                <p className="text-lg font-semibold capitalize text-white">{user.role}</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#0d0f16]/90 p-6 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/20">
                <Settings className="text-blue-400" size={24} />
              </div>
              <div>
                <p className="text-sm text-muted-2">Status</p>
                <p className="text-lg font-semibold text-white">
                  {user.active ? 'Faol' : 'Nofaol'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="mt-8 rounded-3xl border border-white/10 bg-[#0d0f16]/90 p-8 backdrop-blur-xl">
          <h3 className="text-xl font-semibold text-white">
            🎉 Hisobingiz faollashtirildi
          </h3>
          <p className="mt-3 text-sm text-muted">
            Staffly platformasiga xush kelibsiz! Siz endi barcha funksiyalardan foydalanishingiz mumkin.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 rounded-2xl bg-purple px-5 py-3 text-sm font-medium text-white transition-all hover:bg-purple/90"
            >
              <Settings size={18} />
              Admin panel
            </Link>
            <a
              href="https://t.me/stafflyio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white transition-all hover:bg-white/10"
            >
              Telegram kanalga qo&apos;shiling
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
