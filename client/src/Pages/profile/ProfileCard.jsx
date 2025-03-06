import { UserRound, MapPin, Phone, Mail, Globe } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../store/auth';
import { toast } from 'react-toastify';
import SummaryApi from '../../Utils/Utils';

const ProfileCard = () => {
  const { user, courses } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const getProfileData = async () => {
      if (!user._id) return;
      try {
        const response = await fetch(SummaryApi.getProfile.url, {
          method: SummaryApi.getProfile.method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: user._id }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.msg !== "no profile found") {
            setProfile(data.msg);
          }
        }
      } catch (error) {
        console.error("Error fetching profile", error);
      }
    };
    getProfileData();
  }, [user]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="p-4 lg:p-16">
        <div className="p-8 bg-white shadow mt-24">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
              <div>
                <p className="font-bold text-gray-700 text-xl">5</p>
                <p className="text-gray-400">Applied Complaints</p>
              </div>
              <div>
                <p className="font-bold text-gray-700 text-xl">{courses.length}</p>
                <p className="text-gray-400">Disposed Complaints</p>
              </div>
              <div>
                <p className="font-bold text-gray-700 text-xl">0</p>
                <p className="text-gray-400">Pending Complaints</p>
              </div>
            </div>
            <div className="relative">
              <div className="md:w-48 md:h-48 w-40 h-40 bg-neutral-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-neutral-700">
                <UserRound className="w-28 h-28" />
              </div>
            </div>
            <div className="flex justify-center sm:justify-between mt-32 md:mt-0 md:justify-evenly w-full flex-wrap items-center gap-3">
              <Link to='/TrackerPage'>
                <button className="text-white text-sm py-2 px-4 md:w-[10rem] sm:w-1/4 uppercase rounded bg-black hover:bg-black/80 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                  Tracker
                </button>
              </Link>
              <NavLink to='/complete_profile'>
                <button className="text-black py-2 px-4 md:w-[10rem] flex items-center w-full uppercase rounded border border-black hover:bg-border/80 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                  <span className="mx-2 text-sm">Update Profile</span>
                </button>
              </NavLink>
            </div>
          </div>

          {/* Profile Details */}
          <div className="mt-20 text-center border-b pb-12">
            <h1 className="text-4xl font-bold text-gray-700">{user.username}</h1>
            <div className="mt-12 flex flex-col justify-center">
            <p className="text-gray-700 text-center font-sm lg:px-16">
              Your area falls under the jurisdiction of <b className='font-medium'>[Municipal Corporation {profile?.city}]</b>, 
              ensuring civic amenities, infrastructure development, and public services.
              The corporation oversees sanitation, water supply, road maintenance, waste management, 
              and community welfare programs to enhance the quality of life for residents.
            </p>
          </div>
          <div className="mt-5">
                <p className="text-gray-600 flex items-center justify-center gap-2"><MapPin className="w-5 h-5" /> {profile?.address || "Not Available"}</p>
                <p className="text-gray-600 flex items-center justify-center gap-2"><Phone className="w-5 h-5" /> {profile?.phone_no || "Not Available"}</p>
                <p className="text-gray-600 flex items-center justify-center gap-2"><Phone className="w-5 h-5" /> {profile?.alternative_phone_no}</p>
                <p className="text-gray-600 flex items-center justify-center gap-2"><Globe className="w-5 h-5" /> www.mnc-{profile?.city}.com</p>
              </div>
            <h1 className="mt-4 text-xl font-medium text-gray-500">
              Email: {user.email}
            </h1>
          </div>

          {/* Additional Profile Info */}
          <div className="grid grid-cols-1 mt-4 md:grid-cols-3">
            <div className="grid grid-cols-2 text-center">
              <div>
                <p className="font-bold text-gray-700 text-xl">Phone</p>
                <p className="text-gray-400">{profile?.phone_no}</p>
              </div>
              <div>
                <p className="font-bold text-gray-700 text-xl">Complaint Interest</p>
                <p className="text-gray-400">{profile?.complaint_interest}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 text-center">
              <div>
                <p className="font-bold text-gray-700 text-xl">Language</p>
                <p className="text-gray-400">{profile?.language}</p>
              </div>
              <div>
                <p className="font-bold text-gray-700 text-xl">Twitter</p>
                <p className="text-gray-400">{profile?.twitter || "N/A"}</p>
              </div>
            </div>
                        <div className="grid grid-cols-2 text-center">
              <div>
                <p className="font-bold text-gray-700 text-xl">City</p>
                <p className="text-gray-400">{profile?.city}</p>
              </div>
              <div>
                <p className="font-bold text-gray-700 text-xl">State</p>
                <p className="text-gray-400">{profile?.state || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
