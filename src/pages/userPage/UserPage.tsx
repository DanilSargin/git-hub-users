import React, {useState} from "react";
import {useParams} from "react-router-dom";
import Wrapper from "../../components/wrapper/Wrapper";
import {useUserProfile} from "../../hooks/useUserProfile";
import './styles.scss'
import SearchInput from "../../components/textInput/SearchInput";
import SearchItem from "../../components/searchItem/SearchItem";

function UserPage () {
    const {userName} = useParams()
    const [searchValue, setSearchValue] = useState<string>('')
    const {userData, loading, userRepos} = useUserProfile(userName ? userName : '')

    return (
        <Wrapper>
            <div className={'userInfo'}>
                <img src={userData.avatar_url} alt={'User avatar'}/>
                <div>
                    <p>
                        <span>Name: </span>{userData.name || 'Does not exist :)'}
                    </p>
                    <p>
                        <span>Email: </span>{userData.email || 'Does not exist :)'}
                    </p>
                    <p>
                        <span>Location: </span>{userData.location || 'Does not exist :)'}
                    </p>
                    <p>
                        <span>Join: </span>{userData.created_at || 'Does not exist :)'}
                    </p>
                    <p>
                        <span>Followers: </span>{userData.followers || '0'}
                    </p>
                    <p>
                        <span>Following: </span>{userData.following || '0'}
                    </p>
                </div>
            </div>
            <p className={'bio'}>{userData.bio}</p>
            <div className={'searchRepoResult'}>
                <SearchInput value={searchValue} onValueChange={(e) => {
                    setSearchValue(e.target.value)
                }} placeholder={'Введите название репозитория'}/>

                {!loading && userRepos.filter((item) => item.name.includes(searchValue)).map((item) => (
                    <a key={`${item.id}`} href={item.html_url}>
                        <SearchItem  name={item.name} firstRightParam={item.forks_count} secondRightParam={item.stargazers_count} mode={'repo'}/>
                    </a>
                ))}
            </div>
        </Wrapper>
    )
}

export default UserPage