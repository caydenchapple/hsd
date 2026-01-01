import Link from 'next/link';

export default function Suggestions() {
  const suggestions = [
    { username: 'ai_daily_news', subtitle: 'New to Instagram' },
    { username: 'midjourney_art', subtitle: 'Followed by openai + 2 more' },
    { username: 'chatgpt_tips', subtitle: 'Suggested for you' },
    { username: 'stable_diffusion_wrld', subtitle: 'Followed by stabilityai' },
    { username: 'tech_crunch', subtitle: 'Follows you' },
  ];

  return (
    <div className="hidden lg:block w-[320px] pl-16 mt-9 fixed right-0 h-full">
      {/* Current User Switcher */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
            <div className="w-[44px] h-[44px] rounded-full bg-gray-200 cursor-pointer border border-gray-100" />
            <div className="ml-3">
                <div className="text-sm font-semibold text-[#262626] cursor-pointer">current_user</div>
                <div className="text-sm text-[#8e8e8e]">AI Enthusiast</div>
            </div>
        </div>
        <button className="text-xs font-semibold text-[#0095f6] hover:text-[#00376b]">Switch</button>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-semibold text-[#8e8e8e]">Suggested for you</span>
        <button className="text-xs font-semibold text-[#262626] hover:opacity-50">See All</button>
      </div>

      {/* List */}
      <div className="space-y-4 mb-8">
        {suggestions.map((user, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center">
                <div className="w-[32px] h-[32px] rounded-full bg-gray-200 cursor-pointer" />
                <div className="ml-3">
                    <div className="text-sm font-semibold text-[#262626] hover:opacity-50 cursor-pointer">{user.username}</div>
                    <div className="text-xs text-[#8e8e8e] truncate w-40">{user.subtitle}</div>
                </div>
            </div>
            <button className="text-xs font-semibold text-[#0095f6] hover:text-[#00376b]">Follow</button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="space-y-4">
        <div className="flex flex-wrap gap-x-1 gap-y-0 text-xs text-[#c7c7c7]">
            {['About', 'Help', 'Press', 'API', 'Jobs', 'Privacy', 'Terms', 'Locations', 'Language', 'Meta Verified'].map((link, i) => (
                <span key={i} className="cursor-pointer hover:underline">
                    {link}{i < 9 && <span className="mx-0.5">·</span>}
                </span>
            ))}
        </div>
        <div className="text-xs text-[#c7c7c7] uppercase">
            © 2026 AI GRAM FROM META
        </div>
      </div>
    </div>
  );
}
