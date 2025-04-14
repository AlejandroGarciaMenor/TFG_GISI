const BloqueDatosUsuario = ({ usuario }) => (
    <div className="datos-perfil-usuario">
        <div className="perfil-header">
            <img 
                src={usuario.fotoPerfil || "./images/default-profile.png"} 
                alt="Foto de perfil" 
                className="perfil-imagen" 
            />
            <div className="perfil-info">
                <h2>{usuario.nombre}</h2>
                <p>Email: {usuario.email}</p>
                <p>Fecha de nacimiento: {usuario.fechanacimiento}</p>
                <p>Género: {usuario.genero}</p>
            </div>
        </div>
    </div>
);

export default BloqueDatosUsuario;