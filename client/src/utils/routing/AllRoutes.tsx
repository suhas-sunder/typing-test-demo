import loadable from "@loadable/component";
import { Navigate, Route, Routes } from "react-router-dom";
import LessonOneBeginner from "../../components/layout/LessonOneBeginner";
import LessonTwoIntermediate from "../../components/layout/LessonTwoIntermediate";
import LessonThreeAdvanced from "../../components/layout/LessonThreeAdvanced";
import LessonFourGraduation from "../../components/layout/LessonFourGraduation";
import VerifyEmail from "../../pages/VerifyEmail";
import ForgotPassword from "../../pages/ForgotPassword";
const Lesson = loadable(() => import("../../pages/Lesson"));

const CalculatorGame = loadable(() => import("../../pages/CalculatorGame"));

const ProfileStats = loadable(
  () => import("../../components/layout/ProfileStats"),
);
const ProfileImages = loadable(
  () => import("../../components/layout/ProfileImages"),
);
const ProfileAchievements = loadable(
  () => import("../../components/layout/ProfileAchievements"),
);
const ProfileThemes = loadable(
  () => import("../../components/layout/ProfileThemes"),
);
const ProfileAccount = loadable(
  () => import("../../components/layout/ProfileAccount"),
);

const ProtectedRoutes = loadable(
  () => import("../../utils/routing/ProtectedRoutes"),
);
const Home = loadable(() => import("../../pages/Home"));
const Lessons = loadable(() => import("../../pages/Lessons"));
const Register = loadable(() => import("../../pages/Register"));
const PageNotFound = loadable(() => import("../../pages/PageNotFound"));
const ProfileSummary = loadable(
  () => import("../../components/layout/ProfileSummary"),
);
const Profile = loadable(() => import("../../pages/Profile"));
const TermsOfService = loadable(() => import("../../pages/TermsOfService"));
const CookiesPolicy = loadable(() => import("../../pages/CookiesPolicy"));
const PrivacyPolicy = loadable(() => import("../../pages/PrivacyPolicy"));
const Login = loadable(() => import("../../pages/Login"));
const Games = loadable(() => import("../../pages/Games"));

//I have too many routes for dnd it's cluttering App.tsx so I'm loading it here.
export default function AllRoutes({ isAuthenticated, from, handleAuth }) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/lessons" element={<Lessons />}>
        <Route path="beginner" element={<LessonOneBeginner />} />
        <Route path="intermediate" element={<LessonTwoIntermediate />} />
        <Route path="advanced" element={<LessonThreeAdvanced />} />
        <Route path="graduation" element={<LessonFourGraduation />} />

        <Route path="lesson/*" element={<Lesson />} />
      </Route>
      <Route path="/games">
        <Route index element={<Games />} />
        <Route path="calculator" element={<CalculatorGame />} />
      </Route>
      <Route path="/privacypolicy" element={<PrivacyPolicy />} />
      <Route path="/cookiespolicy" element={<CookiesPolicy />} />
      <Route path="/termsofservice" element={<TermsOfService />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/profile" element={<Profile />}>
          <Route path="summary" element={<ProfileSummary />} />
          <Route path="img" element={<ProfileImages />} />
          <Route path="stats" element={<ProfileStats />} />
          <Route path="achievements" element={<ProfileAchievements />} />
          <Route path="themes" element={<ProfileThemes />} />
          <Route path="account" element={<ProfileAccount />} />
        </Route>
      </Route>
      <Route
        path="/login"
        element={!isAuthenticated ? <Login /> : <Navigate to={from} replace />}
      />
      <Route
        path="/register"
        element={
          !isAuthenticated ? (
            <Register setAuth={handleAuth} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
