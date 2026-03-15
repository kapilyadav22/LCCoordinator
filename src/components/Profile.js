import { useEffect, useState } from "react";
import { User } from "lucide-react";
import {
  CODECHEF,
  CODEFORCES,
  GFG,
  GITHUB,
  LEETCODE_QUERY,
} from "../constants/urlConstants";
import { getData, postData } from "../utils/httpRequestUtils";
import EditProfile from "./EditProfile";
import YearCalendarHeatmap from "./generateHeatmap";

export const Profile = () => {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [lcData, setLCData] = useState({});
  const [ccData, setCCData] = useState({});
  const [cfData, setCfData] = useState({});
  const [gfgData, setGFGData] = useState({});
  const [githubData, setGithubData] = useState({});
11
  const handleEditProfile = () => {
    setShowEditProfile(true);
  };

  useEffect(() => {
    fetchLeetcodeData();
    fetchCodeforcesData();
    fetchCodeChefData();
    // fetchGFGData();
    fetchGithubData();
  }, []);

  const fetchLeetcodeData = async () => {
    const res = await postData(
      "http://localhost:4000/leetcode",
      LEETCODE_QUERY("kapilyadav22")
    );
    if (res.success) {
      setLCData(res.data);
    }
  };

  const fetchCodeforcesData = async () => {
    const res = await getData(CODEFORCES + "kapilyadav22");
    if (res.success) {
      setCfData(res.data);
    }
  };

  const fetchCodeChefData = async () => {
    const res = await getData(CODECHEF + "/kapilyadav22");
    if (res.success) {
      setCCData(res.data);
    }
  };

  const fetchGFGData = async () => {
    const res = await getData(GFG);
    if (res.success) {
      setGFGData(res.data);
    }
  };

  const fetchGithubData = async () => {
    const res = await getData(GITHUB + "/kapilyadav22");
    if (res.success) {
      setGithubData(res.data);
    }
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Left Profile Bar */}
        <div className="w-full md:w-1/3 lg:w-1/4">
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm min-h-[50vh] flex flex-col justify-between bg-white dark:bg-gray-800">
            <div className="flex justify-center mb-4 relative">
              <div className="w-[100px] h-[100px] rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                {/* Replace with actual Avatar/Image if available, fallback to Icon */}
                <User className="w-12 h-12 text-gray-500" />
              </div>
            </div>
            <div className="text-center">
              <h6 className="text-lg font-medium text-text-primary">
                Kapil Yadav
              </h6>
              <p className="text-sm text-gray-500 mt-1">
                singhkapil347@gmail.com
              </p>
            </div>
            <ul className="mt-4">
              <li
                className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded text-center text-text-primary transition-colors"
                onClick={handleEditProfile}
              >
                Edit Details
              </li>
            </ul>
          </div>
        </div>

        <div className="w-full md:w-2/3 lg:w-3/4">
          <YearCalendarHeatmap />
          {showEditProfile ? (
            <EditProfile />
          ) : (
            <h5 className="text-xl font-medium text-center text-text-primary mt-4">
              Welcome to your profile
            </h5>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
