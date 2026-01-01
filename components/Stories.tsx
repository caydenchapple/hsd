export default function Stories() {
  const stories = [
    { name: 'openai', seen: false },
    { name: 'google_ai', seen: false },
    { name: 'midjourney', seen: true },
    { name: 'stability', seen: false },
    { name: 'anthropic', seen: false },
    { name: 'meta_ai', seen: false },
    { name: 'huggingface', seen: false },
    { name: 'runwayml', seen: false },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-[8px] mb-6 p-4 overflow-x-auto scrollbar-hide max-w-[630px] w-full mx-auto md:w-full">
      <div className="flex space-x-4">
        {stories.map((story, i) => (
          <div key={i} className="flex flex-col items-center flex-shrink-0 cursor-pointer w-[66px]">
            <div className={`w-[66px] h-[66px] rounded-full p-[2px] ${story.seen ? 'bg-gray-200' : 'bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]'}`}>
                <div className="w-full h-full rounded-full bg-white p-[2px]">
                    <div className="w-full h-full rounded-full bg-gray-200" />
                </div>
            </div>
            <span className="text-xs text-[#262626] mt-1.5 truncate w-full text-center">
                {story.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
