function Page({ user }) {
  return (
    <Header user={user} />
  )
}

function Header({ user }) {
  return (
    <UserInfo user={user} />
  )
}

function UserInfo({ user }) {
  return (
    <div> {user.name} </div>
  )
}

export default function App2() {
  const user = { // 数据 登录状态
    name: 'Andrew',
  };
  return (
    <Page user={user} >
      123123
    </Page>
  )
}