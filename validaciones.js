// --- 1. CONFIGURACIÓN DE EMAILJS ---
const PUBLIC_KEY = "2SUvMS3C3ezFvL5SM"; 
const SERVICE_ID = "service_fpe7hsg";    
const TEMPLATE_ID = "template_k5qb5bi"; 

emailjs.init(PUBLIC_KEY);

let codigoGenerado = null;
let datosTemporales = {};
let modoRecuperacion = false;

// --- 2. SISTEMA DE NOTIFICACIONES ---
function notify(mensaje, tipo = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${tipo}`;
    toast.innerHTML = `<span>${tipo === 'error' ? '⚠️' : '✅'}</span> ${mensaje}`;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.animation = "fadeOut 0.5s ease forwards";
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

// --- 3. FUNCIONES VISUALES DE INTERFAZ ---
function mostrarVista(id) {
    document.querySelectorAll('.card > div, .card > form > div').forEach(v => v.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
}

function handleSchoolInput(input) {
    const extra = document.getElementById('extra-school-info');
    if (input.value === "Otra escuela...") {
        extra.classList.add('show');
    } else {
        extra.classList.remove('show');
    }
}

function togglePassword(inputId, icon) {
    const input = document.getElementById(inputId);
    const svgOpen = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
    const svgClosed = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`;

    if (input.type === 'password') {
        input.type = 'text';
        icon.innerHTML = svgClosed; 
    } else {
        input.type = 'password';
        icon.innerHTML = svgOpen; 
    }
}

// --- 4. VALIDACIONES EN TIEMPO REAL ---

// A. Validación de Correo
const emailInput = document.getElementById('reg-email');
const emailError = document.getElementById('email-error');
const dominiosPermitidos = ['gmail.com', 'outlook.com', 'hotmail.com', 'yahoo.com', 'live.com', 'itatitalaquia.edu.mx'];

if(emailInput) {
    emailInput.addEventListener('input', function() {
        const email = this.value.trim().toLowerCase();
        
        if (email.length === 0) {
            emailError.textContent = "";
            this.className = "";
            return;
        }
        if (!email.includes('@') || !email.includes('.')) {
            emailError.textContent = "Falta el '@' o un dominio válido (ej. .com)";
            this.className = "input-error";
            emailError.className = "error-text text-weak";
            return;
        }

        const partes = email.split('@');
        const dominio = partes[1];

        if (!dominiosPermitidos.includes(dominio)) {
            emailError.textContent = `Usa dominios comunes: ${dominiosPermitidos.slice(0,3).join(', ')}...`;
            this.className = "input-error";
            emailError.className = "error-text text-weak";
        } else {
            emailError.textContent = "";
            this.className = "input-success";
        }
    });
}

// B. Validación de Contraseña y Barra Dinámica
const passInput = document.getElementById('reg-pass');
const passConfInput = document.getElementById('reg-pass-conf');
const strengthBar = document.getElementById('strength-bar');
const passError = document.getElementById('pass-error');
const confError = document.getElementById('conf-error');

if(passInput) {
    passInput.addEventListener('input', function() {
        const pass = this.value;
        let porcentaje = 0;

        if(pass.length > 0) {
            porcentaje += Math.min((pass.length / 10) * 40, 40);
            if (/[A-Z]/.test(pass)) porcentaje += 15;
            if (/[a-z]/.test(pass)) porcentaje += 15;
            if (/[0-9]/.test(pass)) porcentaje += 15;
            if (/[^A-Za-z0-9]/.test(pass)) porcentaje += 15;
        }

        strengthBar.style.width = porcentaje + "%";
        passError.className = "error-text"; 
        
        if (pass.length === 0) {
            passError.textContent = "";
            this.className = "";
            strengthBar.style.backgroundColor = "transparent";
        } else if (pass.length < 6) {
            strengthBar.style.backgroundColor = "var(--error)";
            passError.textContent = `Muy corta (${pass.length}/6 mín.)`;
            passError.classList.add("text-weak");
            this.className = "input-error";
        } else if (porcentaje <= 50) {
            strengthBar.style.backgroundColor = "var(--error)";
            passError.textContent = "Débil (Usa mayúsculas o números)";
            passError.classList.add("text-weak");
            this.className = "input-error";
        } else if (porcentaje <= 80) {
            strengthBar.style.backgroundColor = "var(--alerta)";
            passError.textContent = "Moderada (Añade un símbolo como @ o #)";
            passError.classList.add("text-medium");
            this.className = "input-success";
        } else {
            strengthBar.style.backgroundColor = "var(--exito)";
            passError.textContent = "Contraseña segura";
            passError.classList.add("text-strong");
            this.className = "input-success";
        }
        validarCoincidencia();
    });
}

if(passConfInput) {
    passConfInput.addEventListener('input', validarCoincidencia);
}

function validarCoincidencia() {
    const pass = passInput.value;
    const conf = passConfInput.value;

    if (conf.length === 0) {
        confError.textContent = "";
        passConfInput.className = "";
        return;
    }
    if (pass !== conf) {
        confError.textContent = "Las contraseñas no coinciden";
        confError.className = "error-text text-weak";
        passConfInput.className = "input-error";
    } else {
        confError.textContent = "";
        passConfInput.className = "input-success";
    }
}

// --- 5. LÓGICA DE BASE DE DATOS Y ENVÍOS ---

function login() {
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-pass').value;

    fetch("login.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `correo=${encodeURIComponent(email)}&clave=${encodeURIComponent(pass)}`
    })
    .then(res => res.text())
    .then(data => {
        if (data.trim() === "ok") {
            notify("Ingreso exitoso", "success");
            const datosUsuario = { nombre: email.split('@')[0], email: email };
            localStorage.setItem('usuarioActivo', JSON.stringify(datosUsuario));
            setTimeout(() => window.location.href = "preguntas.html", 1000);
        } else {
            notify("Credenciales incorrectas", "error");
        }
    })
    .catch(() => notify("Error de conexión", "error"));
}

function procesoRegistro() {
    const email = document.getElementById('reg-email').value;
    const pass = document.getElementById('reg-pass').value;
    const conf = document.getElementById('reg-pass-conf').value;
    const escuelaSel = document.getElementById('reg-escuela').value;
    const otraEscuela = document.getElementById('reg-otra-escuela').value;
    let telefono = document.getElementById('reg-tel').value.trim();
    
    let escuelaFinal = (escuelaSel === "Otra escuela...") ? otraEscuela : escuelaSel;
    
    if (document.querySelectorAll('.input-error').length > 0 || !email || !escuelaFinal || pass !== conf || pass.length < 6) {
        notify("Por favor corrige los datos en rojo", "error");
        return;
    }

    if (telefono) {
        telefono = telefono.replace(/[\s-]/g, '');
        if (!telefono.startsWith('+52') && !telefono.startsWith('52')) {
            telefono = '+52' + telefono;
        } else if (telefono.startsWith('52')) {
            telefono = '+' + telefono;
        }
    }

    mostrarVista('view-verify');

    const form = document.getElementById("form-registro");
    const formData = new FormData(form);

    fetch("crear_cuenta.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        if (data.trim() !== "ok") console.error("Error BD:", data);
    });

    codigoGenerado = Math.floor(100000 + Math.random() * 900000);
    datosTemporales = { 
        nombre: document.getElementById('reg-nombre').value, 
        email, telefono, escuela: escuelaFinal, pass 
    };
    
    notify("Enviando códigos de acceso...");

    emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        to_email: email,
        nombre_usuario: datosTemporales.nombre,
        codigo_random: codigoGenerado
    }).then(() => {
        notify("Código enviado al correo 📧", "success");
    });

    if (telefono) {
        const params = new URLSearchParams();
        params.append('telefono', telefono);
        params.append('codigo', codigoGenerado);

        fetch("enviar_whatsapp.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: params.toString()
        })
        .then(res => res.text())
        .then(resData => {
            if (resData.trim() === "ok") notify("El mensaje fue enviado por WhatsApp 📱", "success");
        })
        .catch(err => console.error("Error WhatsApp:", err));
    }
}

function confirmarCodigo() {
    const val = document.getElementById('input-codigo').value;
    if (val == codigoGenerado) {
        if(modoRecuperacion) {
            mostrarVista('view-new-pass');
        } else {
            localStorage.setItem('usuarioActivo', JSON.stringify(datosTemporales));
            notify("Cuenta creada con éxito", "success");
            setTimeout(() => window.location.href = "preguntas.html", 1500);
        }
    } else {
        notify("Código incorrecto", "error");
    }
}

function recuperarPass() {
    const email = document.getElementById('forgot-email').value;

    fetch("verificar_correo.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `correo=${encodeURIComponent(email)}`
    })
    .then(res => res.text())
    .then(data => {
        if (data.trim() === "ok") {
            modoRecuperacion = true;
            codigoGenerado = Math.floor(100000 + Math.random() * 900000);
            datosTemporales.email = email;

            notify("Enviando código...");

            emailjs.send(SERVICE_ID, TEMPLATE_ID, {
                to_email: email,
                nombre_usuario: "Usuario",
                codigo_random: codigoGenerado
            }).then(() => {
                notify("Código enviado", "success");
                mostrarVista('view-verify');
            });
        } else {
            notify("El correo no existe en la base de datos", "error");
        }
    })
    .catch(() => notify("Error de conexión", "error"));
}

function guardarNuevaPass() {
    const p1 = document.getElementById('new-pass').value;
    const p2 = document.getElementById('new-pass-conf').value;

    if (p1 === p2 && p1.length >= 6) {
        fetch("actualizar_password.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `correo=${encodeURIComponent(datosTemporales.email)}&clave=${encodeURIComponent(p1)}`
        })
        .then(res => res.text())
        .then(data => {
            if (data.trim() === "ok") {
                notify("Contraseña actualizada", "success");
                setTimeout(() => window.location.href = "inicio.html", 1000);
            } else {
                notify("Error al actualizar", "error");
            }
        })
        .catch(() => notify("Error de conexión", "error"));
    } else {
        notify("Error en contraseñas", "error");
    }
}