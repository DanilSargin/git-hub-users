import React, {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {API} from "./constants/constants.ts";

type UserDataType = {
    id: number
    avatar_url: string
    login: string
    name: string
    location: string
    bio: string
    email: string
    followers: number
    following: number
    created_at: string
    blog: string
}

type UserReposType = {
    name: string
    id: number
    forks_count: number
    stargazers_count: number
    html_url: string
}

export const useUserProfile = (userName: string) => {
    const [loading, setLoading] = useState<boolean>(true)
    const [userData, setUserData] = useState<UserDataType>({
        avatar_url: "",
        bio: "",
        blog: "",
        created_at: "",
        email: "",
        followers: 0,
        following: 0,
        id: 0,
        location: "",
        login: "",
        name: ""
    })
    const [userRepos, setUserRepos] = useState<UserReposType[]>([])

    const getUserProfile = () => {
        axios.get(`${API}/users/${userName}`)
            .then((response: AxiosResponse) => {
                let data: UserDataType

                data = response.data

                setUserData(data)
            })
            .catch(function (error) {
                console.log(error);
            })

        axios.get(`${API}/users/${userName}/repos`)
            .then((response: AxiosResponse) => {
                let data: UserReposType[]

                data = response.data.map((item: UserReposType) => {
                    return {
                        name: item.name,
                        id: item.id,
                        forks_count: item.forks_count,
                        stargazers_count: item.stargazers_count,
                        html_url: item.html_url
                    }
                })

                setUserRepos(data)
                setLoading(false)
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false)
            })
            .then(function () {
                setLoading(false)
            });
    }
    
    useEffect(() => {
        if(loading && userName) {
            getUserProfile()
        }
    }, [loading, userName])

    return {
        userData,
        userRepos,
        loading,
    }
}