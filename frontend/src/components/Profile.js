function Profile({ user, handleLogout }) {
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Profile;