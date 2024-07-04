function ProfileData() {
  const profileMenuData = [
    {
      id: "menu-profile",
      title: "Profile",
      icon: "profile",
      customLabelStyle: "rounded-tl-2xl",
      url: "/profile/summary",
    },
    {
      id: "menu-profile-img",
      title: "Profile Image",
      icon: "profileImage",
      url: "/profile/img",
    },
    {
      id: "menu-stats",
      title: "Stats",
      icon: "stats",
      url: "/profile/stats",
    },
    {
      id: "menu-achievements",
      title: "Achievements",
      icon: "achievements",
      url: "/profile/achievements",
    },
    {
      id: "menu-themes",
      title: "Themes",
      checked: false,
      icon: "sparkle",
      url: "/profile/themes",
    },
    {
      id: "menu-account",
      title: "Account Settings",
      checked: false,
      icon: "profileSettings",
      customLabelStyle: "md:rounded-bl-2xl rounded-tr-2xl md:rounded-tr-none",
      url: "/profile/account",
    },
  ];

  return profileMenuData;
}

export default ProfileData;
