import {  Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import '../profile-menu/Profile-menu.css';
import { User } from '../../domain/User';

interface Props {
  user: User
}
export const ProfileMenu = ({ user }: Props) => {

  const labelPets = user.typeOfUser === "PETOWNER" ?  "Mis pacientes" :"Mis mascotas" ;

  return (
    <>
      <figure className="menu--image">
        <Avatar
          alt="Foto de perfil"
          src={user.photo}
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
        <Link className="menu__ul--link" to="/pets">{labelPets}</Link>
        <Link className="menu__ul--link" to="/medical-shift">Turnos</Link>
      </ul>
    </>
   

  );
};
