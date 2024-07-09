// Manejador del formulario de inicio de sesión
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de la manera tradicional
    
    let loginName = document.getElementById('loginName').value;
    let loginPassword = document.getElementById('loginPassword').value;
    
    let users = JSON.parse(localStorage.getItem('loginUsers')) || [];
    
    let user = users.find(user => user.name === loginName && user.password === loginPassword);
    
    if(user) {
        document.getElementById('loginMessage').innerText = 'Inicio de sesión exitoso';
        document.getElementById('loginMessage').style.color = 'green';
        document.getElementById('loginContainer').classList.remove('active');
        document.getElementById('userFormContainer').classList.add('active');
    } else {
        document.getElementById('loginMessage').innerText = 'Nombre o contraseña incorrectos';
        document.getElementById('loginMessage').style.color = 'red';
    }
});

// Mostrar el formulario de registro de usuario para el inicio de sesión
document.getElementById('showRegisterFormButton').addEventListener('click', function() {
    document.getElementById('loginContainer').classList.remove('active');
    document.getElementById('registerLoginContainer').classList.add('active');
});

// Manejador del formulario de registro de usuario para el inicio de sesión
document.getElementById('registerLoginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de la manera tradicional
    
    let registerName = document.getElementById('registerName').value;
    let registerPassword = document.getElementById('registerPassword').value;
    
    let users = JSON.parse(localStorage.getItem('loginUsers')) || [];
    
    let existingUser = users.find(user => user.name === registerName);
    
    if(existingUser) {
        document.getElementById('registerMessage').innerText = 'El nombre de usuario ya existe';
        document.getElementById('registerMessage').style.color = 'red';
    } else {
        users.push({ name: registerName, password: registerPassword });
        localStorage.setItem('loginUsers', JSON.stringify(users));
        
        document.getElementById('registerMessage').innerText = 'Usuario registrado con éxito';
        document.getElementById('registerMessage').style.color = 'green';
        document.getElementById('registerLoginForm').reset();
    }
});

// Volver al formulario de inicio de sesión
document.getElementById('backToLoginButton').addEventListener('click', function() {
    document.getElementById('registerLoginContainer').classList.remove('active');
    document.getElementById('loginContainer').classList.add('active');
});

// Manejador del formulario de registro de usuario
document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de la manera tradicional
    
    let name = document.getElementById('name').value;
    let curp = document.getElementById('curp').value;
    let dob = document.getElementById('dob').value;
    
    if(name && curp && dob) {
        // Almacenar los datos en localStorage
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users.push({ name: name, curp: curp, dob: dob });
        localStorage.setItem('users', JSON.stringify(users));
        
        document.getElementById('message').innerText = 'Usuario registrado con éxito';
        document.getElementById('message').style.color = 'green';
        
        // Mostrar la tabla con los datos registrados
        showUserTable();
        
        // Limpiar el formulario
        document.getElementById('userForm').reset();
    } else {
        document.getElementById('message').innerText = 'Por favor, completa todos los campos';
        document.getElementById('message').style.color = 'red';
    }
});

// Función para mostrar la tabla de usuarios registrados
function showUserTable() {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let tableBody = document.querySelector('#userTable tbody');
    tableBody.innerHTML = '';
    
    users.forEach(user => {
        let row = document.createElement('tr');
        let nameCell = document.createElement('td');
        let curpCell = document.createElement('td');
        let dobCell = document.createElement('td');
        
        nameCell.innerText = user.name;
        curpCell.innerText = user.curp;
        dobCell.innerText = user.dob;
        
        row.appendChild(nameCell);
        row.appendChild(curpCell);
        row.appendChild(dobCell);
        
        tableBody.appendChild(row);
    });
    
    document.querySelector('.form-container').style.display = 'none';
    document.getElementById('tableContainer').style.display = 'flex';
}

// Manejador para volver al formulario desde la tabla de usuarios registrados
document.getElementById('backButton').addEventListener('click', function() {
    document.querySelector('.form-container').style.display = 'flex';
    document.getElementById('tableContainer').style.display = 'none';
    document.getElementById('message').innerText = '';
});

// Manejador para eliminar el último registro de usuarios
document.getElementById('deleteLastButton').addEventListener('click', function() {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    if(users.length > 0) {
        users.pop(); // Elimina el último registro
        localStorage.setItem('users', JSON.stringify(users));
        showUserTable(); // Actualiza la tabla
    }
});

// Manejador para descargar usuarios como TXT
document.getElementById('downloadUsersTxtButton').addEventListener('click', function() {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    
    if (users.length === 0) {
        alert('No hay usuarios registrados para descargar.');
        return;
    }

    // Crear el contenido TXT
    let txtContent = "Usuarios Registrados:\n\n";

    users.forEach(function(user, index) {
        txtContent += `Usuario ${index + 1}:\n`;
        txtContent += `Nombre: ${user.name}\n`;
        txtContent += `CURP: ${user.curp}\n`;
        txtContent += `Fecha de Nacimiento: ${user.dob}\n\n`;
    });

    // Crear un elemento de ancla <a> invisible para descargar el archivo
    let encodedUri = encodeURI("data:text/plain;charset=utf-8," + txtContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "usuarios_registrados.txt");
    document.body.appendChild(link); // necesario para Firefox
    link.click();
});

// Manejador para volver al formulario de registro desde el formulario de usuario
document.getElementById('backToLoginFromRegisterButton').addEventListener('click', function() {
    document.getElementById('userFormContainer').classList.remove('active');
    document.getElementById('loginContainer').classList.add('active');
});

// Inicializar el estado inicial
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginContainer').classList.add('active');
});
