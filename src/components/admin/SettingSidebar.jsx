import Link from "next/link";

export const SettingSidebar = ({currentUser, lastPathName}) => {
 
  return (<ul className="nav nav-pills flex-column">
    <li className="nav-item"><Link href="/admin/settings/general-data"
                                   className={`nav-link ${lastPathName === 'general-data"' ? 'active' : ''}`}>General</Link>
    </li>
    <li className="nav-item"><Link href="/admin/settings/password"
                                   className={`nav-link ${lastPathName === 'password' ? 'active' : ''}`}>Password</Link>
    </li>
    {currentUser?.mentorId && (<>
      <li className="nav-item"><Link href="/admin/settings/mentor-information"
                                     className={`nav-link ${lastPathName === 'mentor-information' ? 'active' : ''}`}>Informasi
        Mentor</Link></li>
      <li className="nav-item"><Link href="/admin/settings/mentor-information-account"
                                     className={`nav-link ${lastPathName === 'mentor-information-account' ? 'active' : ''}`}>Informasi
        Rekening</Link></li>
    </>)}

  </ul>)
}