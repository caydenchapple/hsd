import React from 'react';

interface IconProps {
  active?: boolean;
  filled?: boolean;
  className?: string;
}

export const HomeIcon = ({ active, className }: IconProps) => (
  <svg aria-label="Home" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24" className={className}>
    {active ? (
      <path d="M22 10.188V22h-9v-9h-2v9H2V10.188l10-7.534 10 7.534Z" />
    ) : (
      <path d="M9.005 16.545a2.997 2.997 0 0 1 2.997-2.997A2.997 2.997 0 0 1 15 16.545V22h7V11.543L12 2 2 11.543V22h7.005Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
    )}
  </svg>
);

export const SearchIcon = ({ active, className }: IconProps) => (
  <svg aria-label="Search" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24" className={className}>
    <path d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? "3" : "2"} />
    <line x1="16.511" x2="22" y1="16.511" y2="22" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? "3" : "2"} />
  </svg>
);

export const ExploreIcon = ({ active, className }: IconProps) => (
  <svg aria-label="Explore" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24" className={className}>
    <polygon points="13.941 13.953 7.581 16.424 10.06 10.056 16.42 7.585 13.941 13.953" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    <polygon points="13.941 13.953 7.581 16.424 10.06 10.056 16.42 7.585 13.941 13.953" fill="currentColor" />
    <circle cx="12" cy="12" fill="none" r="9" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
  </svg>
);

export const ReelsIcon = ({ active, className }: IconProps) => (
  <svg aria-label="Reels" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24" className={className}>
    <line x1="2.049" x2="21.95" y1="7.002" y2="7.002" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    <line x1="13.504" x2="16.362" y1="2.001" y2="7.002" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    <line x1="7.207" x2="10.002" y1="2.11" y2="7.002" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    <path d="M2 12.001v3.449c0 2.849.698 4.006 1.606 4.945.94.908 2.098 1.607 4.946 1.607h6.896c2.848 0 4.006-.699 4.946-1.607.908-.939 1.606-2.096 1.606-4.945V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.699 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.546 2 5.703 2 8.552Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    <path d="M9.763 17.664a.908.908 0 0 1-.454-.787V11.63a.909.909 0 0 1 1.364-.788l4.545 2.624a.909.909 0 0 1 0 1.575l-4.545 2.624a.91.91 0 0 1-.91 0Z" fillRule="evenodd" />
  </svg>
);

export const MessagesIcon = ({ active, className }: IconProps) => (
  <svg aria-label="Messenger" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24" className={className}>
    <path d="M12.003 2.001a9.705 9.705 0 1 1-6.09 17.587l-3.467 1.139a.952.952 0 0 1-1.214-1.155l.89-3.793a9.664 9.664 0 0 1-2.118-5.776A9.699 9.699 0 0 1 12.003 2.001Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    <path d="m17.064 7.962-4.145 6.452a1.056 1.056 0 0 1-1.64.123l-2.61-2.585a.53.53 0 0 0-.742-.012l-4.148 3.96c-.492.47-.993-.324-.555-.88l4.146-6.45a1.055 1.055 0 0 1 1.639-.125l2.61 2.587a.528.528 0 0 0 .741.012l4.148-3.962c.493-.47.994.325.556.88Z" fillRule="evenodd" />
  </svg>
);

export const NotificationsIcon = ({ active, className }: IconProps) => (
  <svg aria-label="Notifications" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24" className={className}>
    <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072 2.652 4.956 2.514 9.126-.041 1.25-.813 2.037-2.319 2.333-.6.118-1.21.176-1.815.176H4.12c-.605 0-1.215-.058-1.815-.176-1.506-.296-2.278-1.083-2.319-2.333C-.138 14.078 2.514 12.194 2.514 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.679 1.969 4.21 4.21 0 0 1 3.679-1.969 4.987 4.987 0 0 1 2.226.001Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
  </svg>
);

export const CreateIcon = ({ active, className }: IconProps) => (
  <svg aria-label="New post" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24" className={className}>
    <path d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.297 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.699 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.546 2 5.703 2 8.552Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    <line x1="6.545" x2="17.455" y1="12.001" y2="12.001" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    <line x1="12.003" x2="12.003" y1="6.545" y2="17.455" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
  </svg>
);

export const ProfileIcon = ({ className }: IconProps) => (
    <div className={`w-6 h-6 rounded-full bg-gray-200 border border-gray-300 overflow-hidden relative ${className}`}>
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-full h-full text-gray-400 absolute top-1">
             <path d="M24 22.525H0l1.24-2.148C2.565 18.3 4.295 17.5 6.07 17.5h11.85c1.775 0 3.505.8 4.83 2.877l1.25 2.148zM12 16.5c3.585 0 6.5-2.915 6.5-6.5S15.585 3.5 12 3.5 5.5 6.415 5.5 10s2.915 6.5 6.5 6.5z" />
        </svg>
    </div>
);

export const MoreIcon = ({ className }: IconProps) => (
  <svg aria-label="Settings" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24" className={className}>
    <line x1="3" x2="21" y1="4" y2="4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    <line x1="3" x2="21" y1="12" y2="12" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    <line x1="3" x2="21" y1="20" y2="20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
  </svg>
);

export const InstagramLogo = ({ className }: IconProps) => (
  <svg aria-label="Instagram" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24" className={className}>
     {/* This is the camera logo, but for the main logo text we usually use an image or text.
         Since the prompt asks for "exact copy", the sidebar usually has the script text "Instagram".
         I will stick to the text "Instagram" in the sidebar for now, but provide the icon for mobile. */}
    <path d="M12.002 2.001c2.723 0 3.036.012 4.106.06 1.07.05 1.802.217 2.44.465.66.257 1.218.6 1.773 1.156.556.555.899 1.114 1.156 1.773.248.638.416 1.37.465 2.44.048 1.07.06 1.383.06 4.106 0 2.723-.012 3.036-.06 4.106-.05 1.07-.217 1.802-.465 2.44-.257.66-.6 1.218-1.156 1.773-.555.556-1.114.899-1.156 1.773-.248.638-.416 1.37-.465 2.44-.048 1.07-.06 1.383-.06 4.106 0 2.723.012 3.036.06 4.106.05 1.07.217 1.802.465 2.44.257.66.6 1.218 1.156 1.773.556.555 1.114.899 1.773 1.156.638.248 1.37.416 2.44.465 1.07.048 1.383.06 4.106.06 2.723 0 3.036-.012 4.106-.06 1.07-.05 1.802-.217 2.44-.465.66-.257 1.218-.6 1.773-1.156.555-.556.899-1.114 1.156-1.773.248-.638.416-1.37.465-2.44.048-1.07.06-1.383.06-4.106-.06ZM12 21.632c-2.696 0-3.009-.01-4.073-.06-.99-.047-1.529-.214-1.889-.355-.476-.184-.816-.405-1.173-.762-.357-.357-.578-.697-.762-1.173-.14-.36-.308-.898-.355-1.889-.049-1.064-.06-1.377-.06-4.073 0-2.696.01-3.009.06-4.073.047-1.002.214-1.54.355-1.89.184-.476.405-.816.762-1.173.357-.357.697-.578 1.173-.762.36-.14.898-.308 1.89-.355 1.063-.049 1.376-.06 4.072-.06 2.696 0 3.009.01 4.073.06.99.047 1.529.214 1.889.355.476.184.816.405 1.173.762.357.357.578.697.762 1.173.14.36.308.898.355 1.889.049 1.064.06 1.377.06 4.073 0 2.696-.01 3.009-.06 4.073-.047.99-.214 1.529-.355 1.889-.184.476-.405.816-.762 1.173-.357.357-.697.578-1.173.762-.36.14-.898.308-1.889.355-1.064.049-1.377.06-4.073.06Z" />
    <path d="M12.002 5.838a6.164 6.164 0 1 0 6.164 6.164 6.164 6.164 0 0 0-6.164-6.164Zm0 10.165a4.001 4.001 0 1 1 4.001-4.001 4.001 4.001 0 0 1-4.001 4.001Z" />
    <circle cx="18.406" cy="5.594" r="1.44" />
  </svg>
);

// Actions
export const HeartIcon = ({ filled, className }: IconProps) => (
  <svg aria-label="Like" fill={filled ? "#ff3040" : "currentColor"} height="24" role="img" viewBox="0 0 24 24" width="24" className={className}>
    <path d={filled 
        ? "M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.956-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.679 1.969 4.21 4.21 0 0 1 3.679-1.969 4.987 4.987 0 0 1 2.226.001Z" 
        : "M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.956-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.679 1.969 4.21 4.21 0 0 1 3.679-1.969 4.987 4.987 0 0 1 2.226.001Z"} 
        fill={filled ? "#ff3040" : "none"} stroke={filled ? "none" : "currentColor"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
  </svg>
);

export const CommentIcon = ({ className }: IconProps) => (
  <svg aria-label="Comment" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24" className={className}>
    <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
  </svg>
);

export const ShareIcon = ({ className }: IconProps) => (
  <svg aria-label="Share Post" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24" className={className}>
    <line x1="22" x2="11" y1="2" y2="13" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
  </svg>
);

export const BookmarkIcon = ({ filled, className }: IconProps) => (
  <svg aria-label="Save" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24" className={className}>
    <polygon points="20 21 12 13.44 4 21 4 3 20 3 20 21" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
  </svg>
);

export const VpnIcon = ({ active, className }: IconProps) => (
  <svg aria-label="VPN" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24" className={className}>
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
  </svg>
);

export const EmojiIcon = ({ className }: IconProps) => (
    <svg aria-label="Emoji" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24" className={className}>
        <path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5 11.5 11.5 0 0 0-11.5-11.5Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
    </svg>
);
