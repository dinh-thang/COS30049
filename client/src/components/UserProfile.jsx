import { FaUser } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { Link } from 'react-router-dom';

// This component renders the user profile
// including hard-coded username and logout link
const UserProfile = () => {
  const username = "thang@example.com"; // hard-coded username

  return (
    <section className="flex justify-center items-center flex-col">
      <div className="flex flex-row items-center font-bold text-lg">
        <FaUser className="mr-2" />
        <h2>
          Welcome <span className="text-blue-600">{username}</span>
        </h2>
      </div>
      {/* The actual logout functionality is to be implemented in assignment 2 */}
      <Link
        className="text-red-500 hover:underline flex flex-row items-center"
        to="#"
      >
        <BiLogOut className="mr-1" /> Logout
      </Link>
    </section>
  );
};

export default UserProfile;
