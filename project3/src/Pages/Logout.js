import Button from "react-bootstrap/Button";

function logout() {
  document.cookie = 'userToken=none; path=/';
  window.location = '/';
}

export default function Logout() {
  return (
    <Button onClick={() => logout()} className="btn btn-outline-light text-white p-2 mt-3 align-left"> Logout </Button>
  );
}
