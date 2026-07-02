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
    return (
      <p
        style={{
          color: "red",
          fontWeight: "bold",
        }}
      >
        {error}
      </p>
    );
  }

  if (members.length === 0) {
    return (
      <p
        style={{
          fontStyle: "italic",
        }}
      >
        No members have been added yet.
      </p>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        padding: "25px",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h2
        style={{
          marginTop: 0,
          marginBottom: "20px",
        }}
      >
        Existing Members
      </h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead
          style={{
            backgroundColor: "#1577ff",
            color: "#ffffff",
          }}
        >
          <tr>
            <th style={{ padding: "12px" }}>Name</th>
            <th style={{ padding: "12px" }}>Email</th>
            <th style={{ padding: "12px" }}>Phone</th>
            <th style={{ padding: "12px" }}>Action</th>
          </tr>
        </thead>

        <tbody>
          {members.map((member) => (
            <tr
              key={member._id}
              style={{
                borderBottom: "1px solid #ddd",
                textAlign: "center",
              }}
            >
              <td style={{ padding: "12px" }}>
                {member.name}
              </td>

              <td style={{ padding: "12px" }}>
                {member.email}
              </td>

              <td style={{ padding: "12px" }}>
                {member.phone}
              </td>

              <td style={{ padding: "12px" }}>
                <button
                  onClick={() =>
                    onDeleteMember(member._id)
                  }
                  style={{
                    backgroundColor: "#ef4444",
                    color: "#ffffff",
                    border: "none",
                    padding: "8px 14px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MemberList;