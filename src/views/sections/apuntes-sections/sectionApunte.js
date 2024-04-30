import React from "react";

export const SectionApunte = (props) => {
    const { apunte } = props;

    return (
        <div id="section">
            <h6 key={apunte.pk}>{apunte.name}</h6>
        </div>
    );
};

export default SectionApunte;
