"use client"
import {useEffect, useState} from "react";
import {usePathname} from "next/navigation";

export const SettingSidebar = ({currentUser}) => {
  const [lastPathName, setLastPathName] = useState()
  const pathName = usePathname()
  useEffect(() => {
    const splittedPath = pathName.split("/")
    setLastPathName(splittedPath[splittedPath.length - 1]);
    console.log(splittedPath)
  }, [pathName]);
  return (lastPathName && (<ul className="nav nav-pills flex-column">
    <li className="nav-item"><a href="/admin/settings/general-data"
                                className={`nav-link ${lastPathName === 'general-data' ? 'active' : ''}`}>General</a>
    </li>
    <li className="nav-item"><a href="/admin/settings/password"
                                className={`nav-link ${lastPathName === 'password' ? 'active' : ''}`}>Password</a>
    </li>
    <li className="nav-item"><a href="/admin/settings/mentor-information-account"
                                className={`nav-link ${lastPathName === 'mentor-information-account' ? 'active' : ''}`}>Informasi
      Rekening</a></li>
    {currentUser?.mentorId && (<>
      <li className="nav-item"><a href="/admin/settings/mentor-information"
                                  className={`nav-link ${lastPathName === 'mentor-information' ? 'active' : ''}`}>Informasi
        Mentor</a></li>
    </>)}

  </ul>))
}