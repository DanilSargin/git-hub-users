import {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {API} from "./constants/constants.ts";

export type UsersType = {
    login: string
    id: number
    avatar_url: string
    public_repos: number
}

const useSearcherUser = () => {
    const [loading, setLoading] = useState<boolean>(true)
    const [users, setUsers] = useState<UsersType[]>([])


    const refresh = () => {
        setLoading(true)
    }

    const getUsers = () => {
        axios.get(`${API}/users`)
            .then((response: AxiosResponse) => {
                let data: UsersType[]
                data = response.data.map((item: UsersType) => {
                    return {
                        id: item.id,
                        login: item.login,
                        avatar_url: item.avatar_url,
                        public_repos: item.public_repos || 0
                        // TODO: у меня тут возникла проблема,
                        // метод /users не возвращает кол-во репозиториев, получается тут или использовать два метода в связке
                        // или не использовать /users вообще, или есть 3 вариант о котором я не знаю:)
                    }
                })

                setUsers(data)
                setLoading(false)
            })
            .catch(function (error) {
                console.log(error);
                setUsers([])
                setLoading(false)
            })
            .then(function () {
                setLoading(false)
            });
    }

    const searchUser = (userName: string) => {
        axios.get(`${API}/users/${userName}`)
            .then((response: AxiosResponse) => {
                let data: UsersType
                data = response.data
                setUsers([data])
            })
            .catch(function (error) {
                setUsers([])
                console.log(error);
            })
    }

    useEffect(() => {
        if (loading) {
            getUsers()
        }
    }, [loading])

    return {
        loading,
        users,
        searchUser,
        refresh
    }
}


export default useSearcherUser