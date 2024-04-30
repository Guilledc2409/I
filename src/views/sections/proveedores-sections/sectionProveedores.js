import React, { useEffect, useState } from "react";
import axios from "axios";

import SectionProveedor from "views/sections/proveedores-sections/sectionProveedor"



export const SectionProveedores = () => {
    const [proveedores, setProveedores] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        description: ""
    });

    useEffect(() => {
        axios({
            method: "get",
            url: 'http://127.0.0.1:8000/proveedor/',
        })
            .then((response) => {
                setProveedores([...response.data]);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios({
            method: "post",
            url: "http://localhost:8000/proveedor/",
            data: formData
        })
        .then((response) => {
            console.log("Proveedor creado:", response.data);
            setFormData({
                name: "",
                description: ""
            });
            // Vuelve a cargar la lista de Proveedores después de crear un producto
            axios({
                method: "get",
                url: 'http://127.0.0.1:8000/proveedor/',
            })
            .then((response) => {
                setProveedores([...response.data]);
            })
            .catch((error) => {
                console.error(error);
            });
        })
        .catch((error) => {
            console.error("Error al crear el producto:", error);
        });
    };


    return (

        <div id="section">

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Nombre:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="description">Descripción:</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Crear Proveedor</button>
            </form>

            <h2>Lista de Proveedores</h2>
            {proveedores.map((proveedor) => (
                <SectionProveedor
                    key={proveedor.pk}
                    proveedor={proveedor}
                    proveedorName={proveedor.name}
                />
            ))}
        </div>
    );
};

export default SectionProveedores;
