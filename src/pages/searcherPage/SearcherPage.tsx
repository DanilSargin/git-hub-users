import React, { useState} from "react";
import './styles.scss'
import Wrapper from "../../components/wrapper/Wrapper";
import SearchItem from "../../components/searchItem/SearchItem";
import useSearcherUser from "../../hooks/useSearcherUser";
import {Link} from "react-router-dom";
import SearchInputWithButton from "../../components/textInputWithButton/TextInputWithButton";

function SearcherPage () {
    const [searchValueInput, setSearchValueInput] = useState<string | number | readonly string[] | undefined>('')

    const {users, loading, searchUser, refresh} = useSearcherUser()

    // let loading = false
    // Мокап для теста
    // let users: UsersType[] = [
    //     {
    //         login: 'Danil',
    //         avatar_url: 'https://avatars.githubusercontent.com/u/18?v=4',
    //         id: 10
    //     },
    //     {
    //         login: 'Kirill',
    //         avatar_url: 'https://avatars.githubusercontent.com/u/18?v=4',
    //         id: 11
    //     },
    //     {
    //         login: 'Irina',
    //         avatar_url: 'https://avatars.githubusercontent.com/u/18?v=4',
    //         id: 12
    //     },{
    //         login: 'Vova',
    //         avatar_url: 'https://avatars.githubusercontent.com/u/18?v=4',
    //         id: 13
    //     },
    //
    // ]

    return (
        <Wrapper>
            <SearchInputWithButton
                onSubmit={() => {
                    searchUser(searchValueInput as string)
                }}
                disabled={!searchValueInput}
                placeholder={'Введите имя пользователя'}
                value={searchValueInput}
                onValueChange={(event) => {
                    event.target.value === ''
                        ? refresh()
                        : searchUser(event.target.value)
                    //Alert: если нужно мгновенно выводить результаты поиска, можно делать так,
                    // но я не авторизирован, так что кол-во запросов у меня ограниченно(только 60 в час),
                    // и в целом это не лучшая практика:)

                    event.target.value === '' && refresh()
                    setSearchValueInput(event.target.value)
                }}
            />

            <div className={'innerContainer'}>
                {!loading && users
                    .filter((item) => item.login.includes(searchValueInput as string))
                    .map((item) => (
                    <Link key={`${item.id}`} style={{textDecoration: "none"}} to={`/user/${item.login}`}>
                        <SearchItem mode={'user'} name={item.login} img={item.avatar_url} firstRightParam={item.public_repos}/>
                    </Link>
                ))}

                {users.length === 0 && (
                    <h3>Пользователь(-ли) не найдены</h3>
                )}
            </div>

        </Wrapper>
    )
}

export default SearcherPage

