import useLoadAnimation from "../hooks/useLoadAnimation";

//Used by Profile.tsx component
export default function ProfileThemes() {
  const { fadeAnim } = useLoadAnimation();

  return (
    <div id="profile-img" className={`${fadeAnim}`}>
      Profile Themes Coming Soon...
    </div>
  );
}
