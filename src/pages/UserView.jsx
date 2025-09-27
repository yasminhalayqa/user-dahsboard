import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserView = () => {
    // const { id } = useParams();
    const param = useParams();
    const [user, setUser] = useState({})

    console.log(param.id);

    const getUser = async () => {
        try {
            const user = axios.get(`https://63a9bccb7d7edb3ae616b639.mockapi.io/users/${param.id}`);
            setUser((await user).data);
        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        getUser()
    }, [])
    return (
        <>

            <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {user.username}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    Email: {user.email}
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    City: {user.city}
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    State: {user.state}
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    Country: {user.country}
                </p>
            </div>
        </>
    )
}

export default UserView;