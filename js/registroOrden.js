import { db } from "./firebaseConfig.js";
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const orderForm = document.getElementById("orderForm");

// Agregar evento para el envío del formulario
orderForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const empleado = document.getElementById("empleado").value;
    const orden = document.getElementById("orden").value;
    const numParte = document.getElementById("numParte").value;
    const planta = document.getElementById("planta").value;
    const fecha = document.getElementById("fecha").value;

    try {
        // Guardar en Firestore
        await addDoc(collection(db, "ordenes"), {
            empleado,
            orden,
            numParte,
            planta,
            fecha
        });
        alert("Orden registrada con éxito");
        orderForm.reset();
        loadOrders();
    } catch (error) {
        console.error("Error al registrar la orden:", error);
        alert("Hubo un error al registrar la orden");
    }
});

// Función para cargar las órdenes
async function loadOrders() {
    const ordersTable = document.querySelector("#orderTable tbody");
    ordersTable.innerHTML = ""; // Limpiar tabla

    try {
        const querySnapshot = await getDocs(collection(db, "ordenes"));
        querySnapshot.forEach((doc) => {
            const order = doc.data();
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${order.empleado}</td>
                <td>${order.orden}</td>
                <td>${order.numParte}</td>
                <td>${order.planta}</td>
                <td>${order.fecha}</td>
            `;
            ordersTable.appendChild(row);
        });
    } catch (error) {
        console.error("Error al cargar las órdenes:", error);
        alert("Hubo un error al cargar las órdenes");
    }
}

// Cargar las órdenes al abrir la página
loadOrders();
