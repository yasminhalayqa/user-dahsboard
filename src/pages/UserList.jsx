import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Loading from "../components/Loading";
import { useSearch } from "../context/SearchContext";

const UserList = () => {
    const [userList, setUserList] = useState([]);
    const [loading, setLoading] = useState(true);
    const { searchTerm } = useSearch();

    const getUsers = async () => {
        try {
            const users = await axios.get('https://63a9bccb7d7edb3ae616b639.mockapi.io/users');
            setUserList(users.data);

        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        getUsers()
    }, [])

    const handleDelete = async (id) => {
        try {
            const confirmDelete = window.confirm('Are sure do you want to delete user?');
            if (confirmDelete) {
                await axios.delete(`https://63a9bccb7d7edb3ae616b639.mockapi.io/users/${id}`);
                getUsers();
            }
        } catch (error) {
            console.log(error);
        }
    }
    const filteredUsers = userList.filter((user) =>
        user.username.toLowerCase().trim() == searchTerm.toLowerCase().trim() ||
        user.email.toLowerCase().trim() == searchTerm.toLowerCase().trim()
    );

    return (
        <>
            <Link to='/add-user' className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                Add User
            </Link>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">

                {loading ? <Loading /> : (
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Username
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    City
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    State
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Country
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchTerm == '' ? userList.map((user) => (
                                <tr key={user.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {user.username}
                                    </th>
                                    <td className="px-6 py-4">
                                        {user.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.city}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.state}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.country}
                                    </td>
                                    <td className="px-6 py-4 flex gap-2">
                                        <Link to={`/user-view/${user.id}`} className="font-medium text-stone-950 dark:text-blue-500 hover:underline">View</Link>
                                        <Link to={`/edit-user/${user.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                                        <button
                                            className="font-medium text-rose-600 dark:text-red-500 hover:underline cursor-pointer"
                                            onClick={() => { handleDelete(user.id) }}

                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )) : filteredUsers.map((user) => (
                                <tr key={user.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {user.username}
                                    </th>
                                    <td className="px-6 py-4">
                                        {user.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.city}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.state}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.country}
                                    </td>
                                    <td className="px-6 py-4 flex gap-2">
                                        <Link to={`/user-view/${user.id}`} className="font-medium text-stone-950 dark:text-blue-500 hover:underline">View</Link>
                                        <Link to={`/edit-user/${user.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                                        <button
                                            className="font-medium text-rose-600 dark:text-red-500 hover:underline cursor-pointer"
                                            onClick={() => { handleDelete(user.id) }}

                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

        </>
    )
}

export default UserList