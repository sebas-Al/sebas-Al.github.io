function i(s){if(document.getElementById("toast-container")?.children.length)return;const{type:t,title:r,message:e,duration:n=5e3}=s,o=document.getElementById("toast-container");if(!o)return;const a=document.createElement("div");a.className=`
            max-w-sm w-full bg-white dark:bg-darkgray shadow-lg rounded-xl pointer-events-auto 
            ring-1 ring-black ring-opacity-5 dark:ring-zinc-700 transform transition-all duration-300 
            translate-x-full opacity-0
        `;const h={success:"text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20",error:"text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20",warning:"text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20",info:"text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"},f={success:"✓",error:"✕",warning:"⚠",info:"ℹ"};a.innerHTML=`
            <div class="flex p-4">
                <div class="flex-shrink-0">
                    <div class="w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${h[t]}">
                        ${f[t]}
                    </div>
                </div>
                <div class="ml-3 w-0 flex-1">
                    <p class="text-sm font-medium text-secondary dark:text-white">
                        ${r}
                    </p>
                    ${e?`<p class="mt-1 text-sm text-midgray dark:text-white/80">${e}</p>`:""}
                </div>
                <div class="ml-4 flex-shrink-0 flex">
                    <button class="toast-close inline-flex text-lightgray dark:text-white/60 hover:text-secondary dark:hover:text-white focus:outline-none">
                        <span class="sr-only">Cerrar</span>
                        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
        `,o.appendChild(a),setTimeout(()=>{a.classList.remove("translate-x-full","opacity-0")},100),a.querySelector(".toast-close")?.addEventListener("click",()=>m(a)),n>0&&setTimeout(()=>m(a),n)}function m(s){s.classList.add("translate-x-full","opacity-0"),setTimeout(()=>s.remove(),300)}const p={name:{rules:{required:!0,minLength:2,maxLength:50},messages:{required:"El nombre es requerido",minLength:"El nombre debe tener al menos 2 caracteres",maxLength:"El nombre no puede tener más de 50 caracteres"}},lastname:{rules:{required:!0,minLength:2,maxLength:50},messages:{required:"El apellido es requerido",minLength:"El apellido debe tener al menos 2 caracteres",maxLength:"El apellido no puede tener más de 50 caracteres"}},phone:{rules:{required:!0,pattern:/^[+]?[\d\s\-()]{8,15}$/,minLength:8},messages:{required:"El teléfono es requerido",pattern:"Ingrese un número de teléfono válido",minLength:"El teléfono debe tener al menos 8 dígitos"}},email:{rules:{required:!0,pattern:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,maxLength:100},messages:{required:"El correo electrónico es requerido",pattern:"Ingrese un correo electrónico válido",maxLength:"El correo no puede tener más de 100 caracteres"}},message:{rules:{required:!0,minLength:10,maxLength:1e3},messages:{required:"El mensaje es requerido",minLength:"El mensaje debe tener al menos 10 caracteres",maxLength:"El mensaje no puede tener más de 1000 caracteres"}}};function l(s,t){const r=p[s];if(!r)return{isValid:!0,message:""};const{rules:e,messages:n}=r;return e.required&&(!t||t.trim().length===0)?{isValid:!1,message:n.required||"Este campo es requerido"}:!t||t.trim().length===0?{isValid:!0,message:""}:e.minLength&&t.trim().length<e.minLength?{isValid:!1,message:n.minLength||`Debe tener al menos ${e.minLength} caracteres`}:e.maxLength&&t.trim().length>e.maxLength?{isValid:!1,message:n.maxLength||`No puede tener más de ${e.maxLength} caracteres`}:e.pattern&&!e.pattern.test(t.trim())?{isValid:!1,message:n.pattern||"Formato inválido"}:e.custom&&!e.custom(t.trim())?{isValid:!1,message:n.custom||"Valor inválido"}:{isValid:!0,message:""}}function g(s,t){const r=document.getElementById(s),e=document.getElementById(`${s}-help`);r&&(r.classList.add("!border-red-500","focus:!border-red-500"),r.classList.remove("!border-green-500","focus:!border-green-500")),e&&(e.textContent=t,e.classList.remove("hidden"),e.classList.add("text-red-500"),e.classList.remove("text-green-500"))}function d(s){const t=document.getElementById(s),r=document.getElementById(`${s}-help`);t&&(t.classList.add("!border-green-500","focus:!border-green-500"),t.classList.remove("!border-red-500","focus:!border-red-500")),r&&r.classList.add("hidden")}function v(s){const t=document.getElementById(s),r=document.getElementById(`${s}-help`);t&&t.classList.remove("!border-red-500","focus:!border-red-500","!border-green-500","focus:!border-green-500"),r&&r.classList.add("hidden")}async function x(s){const t={toEmail:s.emails,asunto:s.asuntoS,mensaje:s.messageS,services:s.services};try{const r=await fetch("https://nexite.app/api/Security/Email",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t),credentials:"include"});if(!r.ok){const n=await r.text();throw new Error(`Error ${r.status}: ${n||"Error desconocido"}`)}return await r.json()}catch(r){throw console.error("Error sending email:",r),r}}function c(){const s=document.querySelectorAll('input[name="services[]"]:checked');return Array.from(s).map(t=>t.value)}function L(s){const t=[];let r=!0;return["name","lastname","phone","email","message"].forEach(n=>{const o=(s.get(n)||"").trim(),a=l(n,o);a.isValid?d(n):(t.push(a.message),g(n,a.message),r=!1)}),c().length===0&&(t.push("Debe seleccionar al menos un servicio"),r=!1),{isValid:r,errors:t}}function u(s,t){t?(s.disabled=!0,s.innerHTML=`
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity="0.25"/><path fill="currentColor" d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z">
                        <animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/>
                    </path>
                </svg>
                Enviando...
            `):(s.disabled=!1,s.innerHTML=`
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M9.19 6.35c-2.04 2.29-3.44 5.58-3.57 5.89l-2.26-.97c-.65-.28-.81-1.13-.31-1.63l3.01-3.01c.47-.47 1.15-.68 1.81-.55zm1.49 10.16c.3.3.74.38 1.12.2c1.16-.54 3.65-1.81 5.26-3.42c4.59-4.59 4.63-8.33 4.36-9.93a.98.98 0 0 0-.79-.79c-1.6-.27-5.34-.23-9.93 4.36c-1.61 1.61-2.87 4.1-3.42 5.26c-.18.38-.09.83.2 1.12zm6.97-1.7c-2.29 2.04-5.58 3.44-5.89 3.57l.97 2.26c.28.65 1.13.81 1.63.31l3.01-3.01c.47-.47.68-1.15.55-1.81zm-8.71 2.6a3 3 0 0 1-.82 2.71c-.77.77-3.16 1.34-4.71 1.64c-.69.13-1.3-.48-1.17-1.17c.3-1.55.86-3.94 1.64-4.71a3 3 0 0 1 2.71-.82c1.17.22 2.13 1.18 2.35 2.35M13 9c0-1.1.9-2 2-2s2 .9 2 2s-.9 2-2 2s-2-.9-2-2">
                    </path>
                </svg>
                Enviar Solicitud
            `)}document.addEventListener("DOMContentLoaded",()=>{const s=document.getElementById("contact-form"),t=document.getElementById("submit-btn");!s||!t||(["name","lastname","phone","email","message"].forEach(r=>{const e=document.getElementById(r);e&&(e.addEventListener("blur",()=>{const n=l(r,e.value);n.isValid?d(r):g(r,n.message)}),e.addEventListener("input",()=>{e.classList.contains("!border-red-500")&&l(r,e.value).isValid&&d(r)}))}),t.addEventListener("click",async r=>{r.preventDefault();const e=new FormData(s);if(!L(e).isValid){i({type:"error",title:"Formulario incompleto",message:"Por favor, corrija los errores marcados en el formulario",duration:6e3});return}u(t,!0);try{const o={emails:e.get("email"),asuntoS:`Solicitud de contacto de ${e.get("name")} ${e.get("lastname")}`,messageS:`
Nombre: ${e.get("name")} ${e.get("lastname")}
Teléfono: ${e.get("phone")}
Correo: ${e.get("email")}
Servicios solicitados: ${c().join(", ")}

Mensaje:
${e.get("message")}
                    `.trim(),services:c()};await x(o),i({type:"success",title:"¡Mensaje enviado exitosamente!",message:"Nos pondremos en contacto contigo pronto.",duration:7e3}),s.reset(),["name","lastname","phone","email","message"].forEach(a=>{v(a)})}catch(o){console.error("Error al enviar el formulario:",o),i({type:"error",title:"Error al enviar el mensaje",message:"Por favor, inténtelo de nuevo más tarde o contáctenos directamente.",duration:8e3})}finally{u(t,!1)}}))});
