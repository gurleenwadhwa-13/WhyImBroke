const AccountsPage = async ({ params }: any) => {
  console.log(params.url);
  return (
    <>
    <div>{params.type}</div>
    </>
  )
}

export default AccountsPage;

