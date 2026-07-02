import { useState } from "react";
import { createMember } from "../services/memberService";

function MemberForm({ onMemberAdded }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const member = await createMember({
        name,
        email,
        phone,
      });

      onMemberAdded(member);

      setName("");
      setEmail("");
      setPhone("");
      setMessage("Member added successfully.");
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Failed to add member."
      );
    }
  };

  return (
    <>
      <h2>Add Member</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Phone</label>
          <br />
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <br />

        <button type="submit">
          Add Member
        </button>

        {message && <p>{message}</p>}
      </form>
    </>
  );
}

export default MemberForm;