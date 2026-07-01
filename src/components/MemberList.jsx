function MemberList({
  members,
  isLoading,
  error,
  onDeleteMember,
}) {
  if (isLoading) {
    return <p>Loading members...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (members.length === 0) {
    return <p>No members found.</p>;
  }

  return (
    <>
      <h2>Members</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {members.map((member) => (
            <tr key={member._id}>
              <td>{member.name}</td>
              <td>{member.email}</td>
              <td>{member.phone}</td>
              <td>
                <button
                  onClick={() =>
                    onDeleteMember(member._id)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default MemberList;