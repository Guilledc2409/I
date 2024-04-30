import React, { useEffect, useState } from "react";
import axios from "axios";

import SectionApunte from "views/sections/apuntes-sections/sectionApunte"

export const SectionApuntes = () => {
    const [apuntes, setApuntes] = useState([]);

    const [formData, setFormData] = useState({
        idUser: 1,
        name: "",
        texto: "",
        idAsig: 0
    });

    useEffect(() => {
        axios({
            method: "get",
            url: 'http://127.0.0.1:8000/apunte/',
        })
            .then((response) => {
                setApuntes([...response.data]);
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
            url: "http://localhost:8000/apunte/",
            data: formData
        })
        .then((response) => {
            console.log("apunte creado:", response.data);
            setFormData({
                idUser: 1,
                name: "",
                description: "",
                price: 0
            });
            // Vuelve a cargar la lista de Apuntes después de crear un apunte
            axios({
                method: "get",
                url: 'http://127.0.0.1:8000/apunte/',
            })
            .then((response) => {
                setApuntes([...response.data]);
            })
            .catch((error) => {
                console.error(error);
            });
        })
        .catch((error) => {
            console.error("Error al crear el apunte:", error);
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
                <div>
                    <label htmlFor="price">Precio:</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Crear apunte</button>
            </form>

            <h2>Lista de Apuntes</h2>
            {apuntes.map((apunte) => (
                <SectionApunte
                    key={apunte.pk}
                    apunte={apunte}
                />
            ))}
        </div>
    );
};

export default SectionApuntes;
