import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import MemberForm from "../components/MemberForm";
import MemberList from "../components/MemberList";

import {
  getMembers,
  deleteMember,
} from "../services/memberService";

function Members() {
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadMembers = async () => {
    try {
      setIsLoading(true);
      setError("");

      const data = await getMembers();
      setMembers(data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to load members."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const handleMemberAdded = (newMember) => {
    setMembers((currentMembers) => [
      ...currentMembers,
      newMember,
    ]);
  };

  const handleDeleteMember = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this member?"
    );

    if (!confirmDelete) return;

    try {
      await deleteMember(id);

      setMembers((currentMembers) =>
        currentMembers.filter(
          (member) => member._id !== id
        )
      );
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to delete member."
      );
    }
  };

  return (
    <>
      <Navbar />

      <main
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "20px",
        }}
      >
        <h1>Members</h1>

        <p
          style={{
            color: "#555",
            marginBottom: "30px",
          }}
        >
          Manage all registered library members.
        </p>

        <MemberForm
          onMemberAdded={handleMemberAdded}
        />

        <MemberList
          members={members}
          isLoading={isLoading}
          error={error}
          onDeleteMember={handleDeleteMember}
        />
      </main>
    </>
  );
}

export default Members;