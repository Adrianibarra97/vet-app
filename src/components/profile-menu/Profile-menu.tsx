import {  Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import '../profile-menu/Profile-menu.css';
import { User } from '../../domain/User';

interface Props {
  user: User
}
export const ProfileMenu = ({ user }: Props) => {
  return (
    <>
      <figure className="menu--image">
        <Avatar
          alt="Foto de perfil"
          src={user.photoUrl}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '50%',
          }}
          className="image"
        />
      </figure>

      <ul className="menu__ul">
        <Link className="menu__ul--link" to="/profile">Perfil</Link>
        <Link className="menu__ul--link" to="/pets">Mis pacientes</Link>
        <Link className="menu__ul--link" to="/medical-shift">Turnos</Link>
      </ul>
    </>
   

  );
};
